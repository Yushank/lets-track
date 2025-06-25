"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import { useChat, useMeals } from "../hooks";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Bot, CircleUser } from "lucide-react";



export const ChatBox = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const params = useParams();
    // const datePath = params.date as string[];
    // const date = datePath[0];
    // fetching url /home/date, then from there date = datePath[0] to fetch date and send to useMeals hook
    const date = params.date as string;
    //when /home/[date] use params.date as string directly to fech date, when [..date] then use before method


    const { meals, isLoading, calories, protein, carbs, fats, refetchMeal } = useMeals({ date });
    console.log("meals from hook: ", meals);
    console.log("calories extracted from meals array: ", calories);
    console.log("protein extracted from meals array: ", protein);
    console.log("carbs extracted from meals array: ", carbs);
    console.log("fats extracted from meals array: ", fats);
    const { chats, isChatLoading, refetchChat } = useChat({ date });
    console.log("chats from useChat:", chats)


    async function sendInput() {
        try {
            const response = await axios.post("/api/chat",
                input,
            );

            console.log("out response", response)
            const reply = response.data.reply;
            setOutput(reply);

            refetchMeal(); //callback to run fetchMeal function in hook
        }
        catch (error) {
            console.log(error)
        }
    }

    async function sendChat() {
        try {
            const res = await axios.post("/api/chat/input-output", {
                output,
                input
            });

            setInput("");
            refetchChat(); //callback to run fetchChat function in hook
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (output !== "") {
            sendChat();
        }
    }, [output])

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="w-full max-w-xl p-6 rounded-lg shadow-md">
                    <div className="border border-gray rounded-lg p-20">
                        {isChatLoading ? (
                            <p>Loading chats...</p>
                        ) : chats.length > 0 ? (
                            chats.map((chat) => (
                                <div key={chat.id} className="mb-4">
                                    <div className="flex items-start gap-2 mb-1">
                                        <CircleUser className="mt-0.5 h-5 w-5 text-gray-700" />
                                        <p className="font-semibold text-gray-900">{chat.input}</p>
                                    </div>

                                    <div className="flex items-start gap-2 mb-1">
                                        <Bot className="mt-0.5 h-5 w-5 text-gray-700" />
                                        <p className="text-gray-600 flex gap-3">{chat.output}</p>
                                    </div>

                                    <p className="text-xs text-gray-500 font-light">
                                        {format(chat.createdAt, "yyyy-MM-dd hh:mm a")}
                                        </p>
                                </div>
                            ))
                        ) : (
                            <p>No chats for this date</p>
                        )}
                    </div>
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
