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
    <div className="w-full px-4 py-3 sm:py-6 bg-white dark:bg-background shadow-sm sm:shadow-md sm:dark:shadow-gray-400 dark:shadow-gray-900">
      <div className="grid grid-cols-2 sm:flex sm:justify-around gap-4 sm:gap-6 text-sm sm:text-base text-gray-800 dark:text-white">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-gray-500 dark:text-white" />
          <p>Calories: <span className="font-semibold">{calories}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <Beef className="w-5 h-5 text-gray-500 dark:text-white" />
          <p>Protein: <span className="font-semibold">{protein}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <Banana className="w-5 h-5 text-gray-500 dark:text-white" />
          <p>Carbs: <span className="font-semibold">{carbs}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <IceCream className="w-5 h-5 text-gray-500 dark:text-white" />
          <p>Fats: <span className="font-semibold">{fats}</span></p>
        </div>
      </div>
    </div>
  );
}