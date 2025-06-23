"use client"

import { useSelector } from "react-redux"
import { RootState } from "./store"
import { Sidebar } from "../components/Sidebar";
import { Providers } from "./providers";
import { useEffect } from "react";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);
    const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);

    useEffect(() => {
        if(isDarkMode){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);
    //this to change the overall css of app from dark to not dark, on the basis of if the redux state isDarkMode or not 
    // so when darkmode is initialstate then it will add 'dark' in css class , if not (meaning if it is toggled and changed) then it will remove dark class

    return (
        <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <main className={`flex w-full flex-col bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${isCollapsed ? "" : "md:pl-64"}`}>
                <Providers>
                    {children}
                </Providers>
            </main>
        </div>
    )
}

export const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-600">
                {children}
            </div>
        </DashboardLayout>
    )
}