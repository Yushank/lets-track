import axios from "axios";
import { useCallback, useEffect, useState } from "react"


interface Meal {
    id: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number
}

interface Chat {
    id: string,
    createdAt: string,
    input: string,
    output: string,
    userId: string
}


export const useMeals = ({ date }: { date: string }) => {
    const [meals, setMeals] = useState<Meal[]>([]);
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
            console.log("response from useMeals: ", response)
            setMeals(response.data);

            // setCalories(response.data.meals.reduce((item : meal) => item.calories))   
            // this can be the method to extract calories from the response.data.meals. There calories will be there for each meal, so we extract all that from there like [340, 340]. But it will not return the total
            setCalories(response.data.meals.reduce((sum: number, meal: Meal) => sum + meal.calories, 0));
            //this method not only extracts but give the total of that day meals also
            setProtein(response.data.meals.reduce((sum: number, meal: Meal) => sum + meal.protein, 0));
            setCarbs(response.data.meals.reduce((sum: number, meal: Meal) => sum + meal.carbs, 0));
            setFats(response.data.meals.reduce((sum: number, meal: Meal) => sum + meal.fats, 0));

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



// FOR FETCHING CHATS    
export const useChat = ({ date }: { date: string }) => {
    // const [inputChat, setInputChat] = useState([]);
    // const [outputChat, setOutputChat] = useState([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [isChatLoading, setIsChatLoading] = useState(true)

    const fetchChat = useCallback(async () => {
        try {
            const response = await axios.get('/api/chat/input-output', {
                params: {
                    date
                }
            });
            console.log("response from useChat:", response);

            // setInputChat(response.data.chat.reduce((item: chat) => item.input));
            // setOutputChat(response.data.chat.reduce((item: chat) => item.output))
            // console.log("input chat in hook", inputChat)

            const chatData = Array.isArray(response.data.chat)  // Check if response is an array
                ? response.data.chat                           // If yes, use it directly
                : response.data.chat                           // If not, check if it exists
                    ? [response.data.chat]                     // If it exists, wrap it in an array
                    : [];                                      // Otherwise, use empty array

            setChats(chatData);
            setIsChatLoading(false)
        }
        catch (error) {
            console.error("Error fetching chats: ", error)
        }
    }, [date]);

    useEffect(() => {
        fetchChat()
    }, [fetchChat]);

    return {
        chats,
        isChatLoading,
        refetchChat: fetchChat
    }
}