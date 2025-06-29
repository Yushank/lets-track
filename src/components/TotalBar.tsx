"use client"

import { useParams } from "next/navigation";
import { useMeals } from "../hooks";
import { Banana, Beef, IceCream, Utensils } from "lucide-react";



export const TotalBar = () => {
    const params = useParams();
    const date = params.date as string;

    const { meals, calories, protein, carbs, fats } = useMeals({ date });
    console.log("meals from hook: ", meals);
    console.log("calories extracted from meals array: ", calories);
    console.log("protein extracted from meals array: ", protein);
    console.log("carbs extracted from meals array: ", carbs);
    console.log("fats extracted from meals array: ", fats);

    return (
        <div className="pt-8 flex justify-around rounded-lg shadow-md pb-8">
            <div className="flex gap-2">
                <Utensils className="text-gray-500 dark:text-white" />
                <p className="dark:text-white">Total calories: {calories}</p>
            </div>
            <div className="flex gap-2">
                <Beef className="text-gray-500 dark:text-white" />
                <p className="dark:text-white">Total protein: {protein}</p>
            </div>
            <div className="flex gap-2">
                <Banana className="text-gray-500 dark:text-white" />
                <p className="dark:text-white">Total carbs: {carbs}</p>
            </div>
            <div className="flex gap-2">
                <IceCream className="text-gray-500 dark:text-white" />
                <p className="dark:text-white">Total fats: {fats}</p>
            </div>
        </div>
    )
}