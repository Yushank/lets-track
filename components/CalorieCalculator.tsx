"use client"

import { useProfile } from "@/hooks";
import { useState } from "react";



export function CalorieCalculator() {
    const { profile } = useProfile();
    const [activity, setActivity] = useState<number>(0);
    const [calories, setCalories] = useState<number>(0);

    function handleCalorie() {
        if (!profile || profile.weight === undefined || profile.height === undefined || profile.age === undefined) {
            alert("Profile information is incomplete. Please add in profile");
            return;
        }

        let bmr: number;

        if (profile?.gender === "Male") {
            bmr = (10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5);  //if male then this calculation
        }
        else {
            bmr = (10 * profile?.weight + 6.25 * profile?.height - 5 * profile?.age - 161) //if female then this
        }

        setCalories(bmr * activity);
    }

    return (
        <div className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 max-w-xl mx-auto mt-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Select Your Activity Level
                </h2>
                <div className="flex flex-wrap gap-3 mb-4">
                    <button
                        onClick={() => setActivity(1.4)}
                        className={`px-4 py-2 rounded-lg transition
                        ${activity === 1.4 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"} `}
                    //if activity 1.4 then make the style bg-blue-600, means if this activity reached 1.4 then this button change, making it look selected when clicked
                    >
                        Light (1–2x/week)
                    </button>
                    <button
                        onClick={() => setActivity(1.55)}
                        className={`px-4 py-2 rounded-lg transition
                        ${activity === 1.55 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"} `}
                    //if activity 1.55 then make the style bg-blue-600, means if this activity reached 1.4 then this button change, making it look selected when clicked
                    >
                        Moderate (3–4x/week)
                    </button>
                    <button
                        onClick={() => setActivity(1.725)}
                        className={`px-4 py-2 rounded-lg transition
                        ${activity === 1.725 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"} `}
                    //if activity 1.725 then make the style bg-blue-600, means if this activity reached 1.4 then this button change, making it look selected when clicked
                    >
                        Hard (5–6x/week)
                    </button>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <button
                        onClick={handleCalorie}
                        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Calculate
                    </button>

                    <h1 className="text-gray-800 dark:text-white font-medium mt-2">
                        Your maintenance calories are:&nbsp;
                        <span className="font-bold">
                            {calories > 0 ? calories.toFixed(0) : "N/A"}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}