"use client"

import { useSelector } from "react-redux"
import { RootState } from "./store"
import { Sidebar } from "../components/Sidebar";
import { Providers } from "./providers";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);


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