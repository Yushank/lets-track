import axios from "axios";
import { useCallback, useEffect, useState } from "react"


interface meal {
    id: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number
}


export const useMeals = ({ date }: { date: string }) => {
    const [meals, setMeals] = useState<meal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [calories, setCalories] = useState([])
    const [protein, setProtein] = useState([])
    const [carbs, setCarbs] = useState([])
    const [fats, setFats] = useState([])

    console.log("date in hook: ", date)

    const fetchMeal = useCallback(async () => {
        try {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                throw new Error("Invalid date format");
            }

            const response = await axios.get(`/api/chat/${date}`);
            console.log("response: ", response)
            setMeals(response.data);

            // setCalories(response.data.meals.reduce((item : meal) => item.calories))   
            // this can be the method to extract calories from the response.data.meals. There calories will be there for each meal, so we extract all that from there like [340, 340]. But it will not return the total
            setCalories(response.data.meals.reduce((sum: number, meal: meal) => sum + meal.calories, 0));
            //this method not only extracts but give the total of that day meals also
            setProtein(response.data.meals.reduce((sum: number, meal: meal) => sum + meal.protein, 0));
            setCarbs(response.data.meals.reduce((sum: number, meal: meal) => sum + meal.carbs, 0));
            setFats(response.data.meals.reduce((sum: number, meal: meal) => sum + meal.fats, 0));

            setIsLoading(false)
        }
        catch (error) {
            console.error("Error fetching meals: ", error)
        }
    }, [date])


    useEffect(() => {
        fetchMeal();
    }, [fetchMeal])


    return {
        meals,
        isLoading,
        calories,
        protein,
        carbs,
        fats,
        refetchMeal: fetchMeal
    };
}