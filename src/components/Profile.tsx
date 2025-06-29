"use client"

import { CircleUserRound } from "lucide-react";
import { useProfile } from "../hooks"


export const ProfileComp = () => {
    const { profile } = useProfile();
    console.log("Profile received from useProfile in profile component:", profile);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-md mx-auto p-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
};