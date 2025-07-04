import axios from "axios";
import { NextResponse } from "next/server";
import { useCallback, useEffect, useState } from "react"
import socket from "../lib/socket";


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

interface Profile {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    weight: number,
    height: number,
    age: number,
    gender: string
}

export const useMeals = ({ date }: { date: string }) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totals, setTotals] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
    });

    console.log("date in hook: ", date)

    // Calculate totals helper
    const calculateTotals = (meals: Meal[]) => ({
        calories: meals.reduce((sum, m) => sum + m.calories, 0),
        protein: meals.reduce((sum, m) => sum + m.protein, 0),
        carbs: meals.reduce((sum, m) => sum + m.carbs, 0),
        fats: meals.reduce((sum, m) => sum + m.fats, 0)
    });

    // Fetch meals
    const fetchMeals = useCallback(async () => {
        try {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                throw new Error("Invalid date format");
            }

            const response = await axios.get(`/api/chat/${date}`);
            const fetchedMeals = response.data.meals || [];

            setMeals(fetchedMeals);
            setTotals(calculateTotals(fetchedMeals));
        } catch (error) {
            console.error("Error fetching meals:", error);
        } finally {
            setIsLoading(false);
        }
    }, [date]);

    // Socket and initial fetch setup
    useEffect(() => {
        fetchMeals(); //calls fetch when inital mount or date change (as on date change fetchMeal run)

        const handleNewMeal = (newMeal: Meal) => {
            setMeals(prev => {
                const updatedMeals = [...prev, newMeal];
                setTotals(calculateTotals(updatedMeals));
                return updatedMeals;
            });
        };

        socket.on("newMeal", handleNewMeal);

        return () => {
            socket.off("newMeal", handleNewMeal);
        };
    }, [fetchMeals]);

    return {
        meals,
        isLoading,
        ...totals, //sending data as spread form (in component we fetch normally like const{calories, protein, carbs} = useMeals(date))
        refetchMeals: fetchMeals
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


export const useProfile = () => {
    const [profile, setProfile] = useState<Profile | undefined>();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/api/user")

                console.log("Response from useProfile hook:", response);

                setProfile(response.data.profile);
            }
            catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchProfile();
    }, [])


    return {
        profile
    };
}