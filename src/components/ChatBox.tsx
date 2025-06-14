"use client"

import axios from "axios";
import { useState } from "react"
import { useMeals } from "../hooks";



export const ChatBox = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const date = "2025-06-14"
    const { meals, isLoading, calories, protein, carbs, fats, refetchMeal } = useMeals({ date });
    console.log("meals from hook: ", meals);
    console.log("calories extracted from meals array: ", calories);
    console.log("protein extracted from meals array: ", protein);
    console.log("carbs extracted from meals array: ", carbs);
    console.log("fats extracted from meals array: ", fats);


    async function sendInput() {
        try {
            const response = await axios.post("/api/chat",
                input
            );

            console.log("out response", response)
            const reply = response.data.reply;
            setOutput(reply);
            setInput("");

            refetchMeal(); //callback to run fetchMeal function in hook
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="w-full max-w-xl p-6 rounded-lg shadow-md">
                    <div className="border border-gray-500 rounded-lg p-8">
                        <p>{output}</p>
                    </div>
                    <div className="pt-6">
                        <input className="m-2 p-2 border border-gray-500 rounded-lg"
                            type="text"
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write about your meal">
                        </input>
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
                            onClick={sendInput}
                        >Send</button>
                    </div>
                    <div className="pt-8">
                        <p>Total calories: {calories}</p>
                        <p>Total protein: {protein}</p>
                        <p>Total carbs: {carbs}</p>
                        <p>Total fats: {fats}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}