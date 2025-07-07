"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { userInfoInput } from "../schemas/userInfoSchema"
import { Hourglass, LucideIcon, Ruler, VenusAndMars, Weight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type userInfoFormInput = {
    weight: string;
    height: string;
    age: string;
    gender: string;
}


export function UserInfoComp() {
    const router = useRouter()

    const [infoInputs, setInfoInputs] = useState<userInfoFormInput>({
        height: "",
        weight: "",
        age: "",
        gender: ""
    });

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const now = new Date();
        setCurrentDate(now.toLocaleString());
    }, []);

    async function handleSubmit() {
        const parsed = userInfoInput.safeParse({
            weight: Number(infoInputs.weight),
            height: Number(infoInputs.height),
            age: Number(infoInputs.age),
            gender: infoInputs.gender
        });

        if (!parsed.success) {
            console.error("Validation failed", parsed.error.format());
            return;
        }
        console.log("parsed data in UserInfo:", parsed)

        try {
            const res = await axios.patch("/api/user/user-profile",
                parsed.data
            );

            if (res) {
                router.push(`/home/${format(currentDate, "yyyy-MM-dd")}`);
            }
        }
        catch (error) {
            alert("Error while filling information");
            console.log(error)
        }
    }


    return (
        <form className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                    <LabelledInput
                        label="Weight"
                        type="text"
                        placeholder="eg: 50"
                        icon={Weight}
                        onChange={(e) => {
                            setInfoInputs({
                                ...infoInputs,
                                weight: e.target.value
                            })
                        }}
                    />
                    <LabelledInput
                        label="Height"
                        type="text"
                        placeholder="eg: 160"
                        icon={Ruler}
                        onChange={(e) => {
                            setInfoInputs({
                                ...infoInputs,
                                height: e.target.value
                            })
                        }}
                    />
                    <LabelledInput
                        label="Age"
                        type="text"
                        placeholder="eg: 24"
                        icon={Hourglass}
                        onChange={(e) => {
                            setInfoInputs({
                                ...infoInputs,
                                age: e.target.value
                            })
                        }}
                    />
                    <LabelledInput
                        label="Gender"
                        type="text"
                        placeholder="Male or Female"
                        icon={VenusAndMars}
                        onChange={(e) => {
                            const value = e.target.value;
                            const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                            //this make first letter of sentence upper case
                            setInfoInputs({
                                ...infoInputs,
                                gender: capitalized
                            })
                        }}
                    />

                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="mt-8 w-full text-white dark:text-gray-800 bg-gray-800 dark:bg-gray-100 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-2"
                    >Update</button>
                </div>
            </div>
        </form>
    )
}



interface labelledInputType {
    label: string,
    type: string,
    placeholder: string,
    icon: LucideIcon,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, type, placeholder, onChange, icon: Icon }: labelledInputType) {
    return (
        <div className="pb-6">
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
            />
        </div>
    )
}