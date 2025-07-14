"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { signupInput } from "../schemas/userSchema";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, EyeOff } from "lucide-react";



export function Auth({ type }: { type: "signin" | "signup" }) {
    const router = useRouter();

    const [postInputs, setPostInputs] = useState<signupInput>({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const [currentDate, setCurrentDate] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const now = new Date();
        setCurrentDate(now.toLocaleString());
    }, []);

    async function sendSignupRequest() {
        try {
            const response = await axios.post("/api/user/signup",
                postInputs
            );

            if (response) {
                await signIn("credentials", {
                    username: postInputs.email,
                    password: postInputs.password,
                    redirect: false
                });
                router.push("/user-info");
            } else {
                console.error("Signup failed")
                //can also return to client side user already exist when it does
            }
        }
        catch (error) {
            alert("Error while signing up");
            console.log(error)
        }
    }

    async function sendSigninRequest() {
        try {
            const res = await signIn("credentials", {
                username: postInputs.email,
                password: postInputs.password,
                redirect: false,
            });
            console.log("Signin response: ", res);

            if (res?.error) {
                alert("Not registered or invalid input");
                return
            }

            router.push(`/home/${format(currentDate, "yyyy-MM-dd")}`);
        }
        catch (error) {
            alert("Error while signing in");
            console.log(error)
        }
    }

    return (
        <div>
            <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                        <div className="px-10">
                            <div className="text-3xl font-bold text-center">
                                {type === "signup" ? "Create an account" : "Sign in"}
                            </div>
                            <div className="text-center text-slate-500">
                                {type === "signup" ? "Already have an account" : "Don't have an account"}
                                <Link className="pl-2 underline" href={type === "signup" ? "/signin" : "/signup"}>
                                    {type === "signup" ? "signin" : "signup"}
                                </Link>
                            </div>
                        </div>

                        <div className="pt-4">
                            <LabelledInput
                                label="Email"
                                type="text"
                                placeholder="peter@gmail.com"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const lowercase = value.toLowerCase();
                                    //this will make the input for email always lowercase
                                    setPostInputs({
                                        ...postInputs,
                                        email: lowercase
                                    })
                                }}
                            ></LabelledInput>

                            {type === "signup" ? (<LabelledInput
                                label="First Name"
                                type="text"
                                placeholder="Peter"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                                    //this make first letter of sentence upper case
                                    setPostInputs({
                                        ...postInputs,
                                        firstName: capitalized
                                    })
                                }}
                            ></LabelledInput>) : null}

                            {type === "signup" ? (<LabelledInput
                                label="Last Name"
                                type="text"
                                placeholder="Parker"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                                    //this make first letter of sentence upper case
                                    setPostInputs({
                                        ...postInputs,
                                        lastName: capitalized
                                    })
                                }}
                            ></LabelledInput>) : null}

                            <div className="relative">
                                <LabelledInput
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="******"
                                    onChange={(e) => setPostInputs({
                                        ...postInputs,
                                        password: e.target.value
                                    })}
                                ></LabelledInput>

                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-10 right-0 pr-3 flex items-center hover:text-blue-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={type === "signup" ? sendSignupRequest : sendSigninRequest}
                                type="button"
                                className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-2"
                            >{type === "signup" ? "Lets start" : "signin"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface labelledInputType {
    label: string,
    type: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, type, placeholder, onChange }: labelledInputType) {
    return (
        <div>
            <label>{label}</label>
            <input type={type} placeholder={placeholder} onChange={onChange}
                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    )
}