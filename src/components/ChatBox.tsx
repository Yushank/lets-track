"use client"

import axios from "axios";
import { useState } from "react"



export const ChatBox = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");

    async function sendInput() {
        try {
            const response = await axios.post("/api/chat",
                input
            );

            console.log("out response", response)
            const reply = response.data.reply;
            setOutput(reply);
            setCalories(response.data.meal.calories);
            setProtein(response.data.meal.protein);
            setCarbs(response.data.meal.carbs);
            setFats(response.data.meal.fats);
            setInput("");

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="w-full max-w-xl p-6 rounded-lg shadow-md">
                    <div>
                        <p>{output}</p>
                    </div>
                    <div className="pt-6">
                        <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Write about your meal"></input>
                        <button onClick={sendInput}>Send</button>
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