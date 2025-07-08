"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useChat } from "../hooks";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Bot, CircleUser } from "lucide-react";



export const ChatBox = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const lastInputRef = useRef(""); //store the last input that was sent
    const params = useParams();
    const date = params.date as string;
    const { chats, isChatLoading, refetchChat } = useChat({ date });
    console.log("chats from useChat:", chats)

    const [isLoadingReply, setIsLoadingReply] = useState(false);


    async function sendInput() {
        if (!input.trim()) return; //don't send empty messages

        try {
            //store the current input before clearing
            lastInputRef.current = input;
            setIsLoadingReply(true); //start reply loading, as reponse will now will be fetched

            const response = await axios.post("/api/chat",
                input,
            );

            console.log("out response", response)
            const reply = response.data.reply;
            setOutput(reply);
            setInput("");
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoadingReply(false) //Done reply loading, after setOutput(reply) is done
        }
    }

    useEffect(() => {
        if (output === "") return;

        const sendChat = async () => {
            try {
                const res = await axios.post("/api/chat/input-output", {
                    output,
                    input: lastInputRef.current
                });
                console.log("res from sendChat function:", res);

                refetchChat();

                //clear the stored input after successful save
                lastInputRef.current = "";
            } catch (error) {
                console.log(error);
            }
        };

        sendChat();
    }, [output, refetchChat]);
    //now this useEffect will only run after output is changed not after every change when typing
    // and will send only lastInputRef data not the current empty input data

    return (
        <div className="h-full flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="w-full max-w-xl p-6 rounded-lg shadow-md border border-gray-400">

                    {/* CHAT HISTORY */}
                    <div className="border border-gray rounded-lg p-20 h-64 overflow-y-auto">
                        {isChatLoading ? (
                            <p className="text-center dark:text-white">Loading chats...</p>
                        ) : chats.length > 0 ? (
                            chats.map((chat) => (
                                <div key={chat.id} className="mb-4">
                                    <Chats chat={chat} />
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-white">No chats for this date</p>
                        )}
                    </div>

                    {/* CURRENT OUTPUT */}
                    <div className="border border-gray-500 rounded-lg p-8 dark:border-gray-200">
                        <Bot className="h-5 w-5 mt-0.5 text-green-500" />
                        <p className="text-gray-700 dark:text-white whitespace-pre-line">
                            {isLoadingReply ? (
                                <span className="animate-pulse text-gray-500">Typing...</span> //typing animation if response is not loaded and isLoadingReply is true
                            ) : (
                                output
                            )}
                        </p>
                    </div>

                    {/* INPUT AREA */}
                    <div className="flex max-w-xl mx-auto pt-6 pb-4 gap-2">
                        <input className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && input.trim()) {  //sends input on Enter key press and checks if input is not empty before
                                    sendInput()
                                }
                            }}
                            placeholder="Write about your meal">
                        </input>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
                            onClick={sendInput}
                        >Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface chatsType {
    id: string,
    createdAt: string,
    input: string,
    output: string,
    userId: string
}

interface chat {
    chat: chatsType
}
function Chats({ chat }: chat) {
    return (
        <div key={chat.id} className="mb-4">
            <div className="flex items-start gap-2 mb-1">
                <CircleUser className="mt-0.5 h-5 w-5 text-blue-500" />
                <p className="font-semibold text-gray-900 dark:text-white">{chat.input}</p>
            </div>

            <div className="flex items-start gap-2 mb-1 dark:text-white">
                <Bot className="mt-0.5 h-5 w-5 text-green-500" />
                <p className="text-gray-600 flex gap-3">{chat.output}</p>
            </div>

            <p className="text-xs text-gray-500 font-light dark:text-white">
                {format(chat.createdAt, "yyyy-MM-dd hh:mm a")}
            </p>
        </div>
    )
}