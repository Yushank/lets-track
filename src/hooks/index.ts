import axios from "axios";
import { useEffect, useState } from "react"


interface meal {
    id: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number
}

export const useMeals = ({date}: {date:string}) => {
    const [meals, setMeals] = useState<meal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        // axios.get("/api/chat/")
        //     .then(response => {
        //         setMeals(response.data);
        //         setIsLoading(false);
        //     })
        //     .catch(error => {
        //         console.error("Failed to fetch meals: ", error);
        //         setIsLoading(false);
        //     });
        
        const fetchMeal = async() =>{
            try{
                const response =  await axios.get(`/api/chat/${date}`);
                setMeals(response.data);
                setIsLoading(false)
            }
            catch(error){
                console.error("Error fetching meals: ", error)
            }
        }

        fetchMeal();

    }, [date]);

    return { meals, isLoading };
}