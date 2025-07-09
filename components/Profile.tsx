"use client"

import { CircleUserRound, FileUser, Hourglass, LucideIcon, Ruler, VenusAndMars, Weight } from "lucide-react";
import { useProfile } from "../hooks"
import { ChangeEvent, useState } from "react";
import { userTotalInfoPatchInput } from "../schemas/userTotalInfoSchema";
import axios from "axios";

type userInfoFormInput = {
    firstName: string;
    lastName: string;
    weight: string | number;
    height: string | number;
    age: string | number;
    gender: string;
}

export const ProfileComp = () => {
    const { profile } = useProfile();
    console.log("Profile received from useProfile in profile component:", profile);
    const [isEditing, setIsEditing] = useState(false);

    const [infoInputs, setInfoInputs] = useState<userInfoFormInput>({
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        height: "",
        weight: ""
    });

    // FUNCTION TO MOVE PROFILE HOOK'S DATA TO LOCAL STATE, SO THAT IT CAN BE SHOWN AND EDITED IN FORM
    function handleEdit() {
        setInfoInputs({
            firstName: profile?.firstName ?? "",
            lastName: profile?.lastName ?? "",
            gender: profile?.gender ?? "",
            age: profile?.age ?? "",
            height: profile?.height ?? "",
            weight: profile?.weight ?? ""
        });

        setIsEditing(true); //this enables edit mode
    }

    // FUNCTION TO SUBMIT DATA IN PATCH ROUTE
    async function handleSubmit() {
        const parsed = userTotalInfoPatchInput.safeParse({
            firstName: infoInputs.firstName,
            lastName: infoInputs.lastName,
            weight: Number(infoInputs.weight),
            height: Number(infoInputs.height),
            age: Number(infoInputs.age),
            gender: infoInputs.gender
        });

        if (!parsed.success) {
            console.error("Validation failed", parsed.error.format());
            return;
        }
        console.log("parsed data in Profile:", parsed);

        try {
            const res = await axios.patch("/api/user/user-profile",
                parsed.data
            );

            if (res) {
                window.location.reload(); //makes whole page reload after update click
            }
        }
        catch (error) {
            alert("Error while filling information");
            console.log(error)
        }
    }

    return (
        <div className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">

            {/* WHEN NOT EDITING SHOW USER INFORMATION COMPONENT */}
            {!isEditing ? (<div className="max-w-md mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
                    <div className="p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                <CircleUserRound className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {profile?.firstName} {profile?.lastName}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Gender</span>
                                <span className="text-gray-800 dark:text-gray-200">{profile?.gender || 'Not specified'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Age</span>
                                <span className="text-gray-800 dark:text-gray-200">{profile?.age || 'Not specified'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Height</span>
                                <span className="text-gray-800 dark:text-gray-200">{profile?.height || 'Not specified'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Weight</span>
                                <span className="text-gray-800 dark:text-gray-200">{profile?.weight || 'Not specified'}</span>
                            </div>
                        </div>
                        {/* RUN HANDLEEDIT FUNCTION AND ENALE EDIT MODE */}
                        <div className="mt-6 flex justify-center">
                            <button
                                className="text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                                onClick={() => handleEdit()}
                            >
                                Edit
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                // WHEN EDITING SHOW USER INFO INPUT FORM
                <form className="h-screen flex justify-center flex-col">
                    <div className="flex justify-center">
                        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">

                            <LabelledInput
                                label="First Name"
                                type="text"
                                placeholder="eg: Peter"
                                icon={FileUser}
                                value={infoInputs.firstName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                                    //this make first letter of sentence upper case
                                    setInfoInputs({
                                        ...infoInputs,
                                        firstName: capitalized
                                    })
                                }}
                            />
                            <LabelledInput
                                label="Last Name"
                                type="text"
                                placeholder="eg: Parker"
                                icon={FileUser}
                                value={infoInputs.lastName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                                    //this make first letter of sentence upper case
                                    setInfoInputs({
                                        ...infoInputs,
                                        lastName: capitalized
                                    })
                                }}
                            />
                            <LabelledInput
                                label="Gender"
                                type="text"
                                placeholder="Male or Female"
                                icon={VenusAndMars}
                                value={infoInputs.gender}
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
                            <LabelledInput
                                label="Age"
                                type="text"
                                placeholder="eg: 24"
                                icon={Hourglass}
                                value={infoInputs.age}
                                onChange={(e) => {
                                    setInfoInputs({
                                        ...infoInputs,
                                        age: e.target.value
                                    })
                                }}
                            />
                            <LabelledInput
                                label="Height"
                                type="text"
                                placeholder="eg: 160"
                                icon={Ruler}
                                value={infoInputs.height}
                                onChange={(e) => {
                                    setInfoInputs({
                                        ...infoInputs,
                                        height: e.target.value
                                    })
                                }}
                            />
                            <LabelledInput
                                label="Weight"
                                type="text"
                                placeholder="eg: 50"
                                icon={Weight}
                                value={infoInputs.weight}
                                onChange={(e) => {
                                    setInfoInputs({
                                        ...infoInputs,
                                        weight: e.target.value
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
            )}

        </div>
    );
};


interface labelledInputType {
    label: string,
    type: string,
    placeholder: string,
    icon: LucideIcon,
    value: string | number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, type, placeholder, value, onChange, icon: Icon }: labelledInputType) {
    return (
        <div className="pb-6">
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
            />
        </div>
    )
}