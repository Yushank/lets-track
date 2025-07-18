"use client"

import { AlignJustify, LucideIcon, User, CalendarDays, Home, Power, Sun, Moon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toggleCollapse } from "../features/sidebar/sidebarSlice"
import { RootState } from "../app/store"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { toggleDarkmMode } from "../features/darkmode/darkmodeSlice"

export const Sidebar = () => {

    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);
    const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);
    const dispatch = useDispatch();
    const router = useRouter();

    async function signoutFunction() {
        await signOut({ redirect: false });

        router.push('/signin')
    }

    const sidebarClassname = `fixed top-0 left-0 flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-sidebar overflow-y-auto bg-white overflow-hidden ${isCollapsed ? "w-16 md:w-20" : "w-64 lg:w-64"}`

    return (
        <div className={sidebarClassname}>
            <div className='flex h-full w-full flex-col justify-between'>
                <div>
                    <div className='z-50 flex min-h-[56px] items-center justify-between px-6 pt-3 bg-white dark:bg-sidebar'>
                        <button onClick={() => { dispatch(toggleCollapse()) }}>
                            <AlignJustify className='h-6 w-6 hover:text-gray-400 text-gray-900 dark:text-white' />
                        </button>
                    </div>
                    <nav className="z-10 w-full">
                        <SidebarLink icon={User} label="Profile" href="/profile" />
                        <SidebarLink icon={CalendarDays} label="Calendar" href="/calendar" />
                        <SidebarLink icon={Home} label="Home" href="/home" />
                    </nav>
                </div>

                <div className="p-4 ml-2">
                    <div className="py-4">
                        <button onClick={() => {dispatch(toggleDarkmMode())}}>
                            {isDarkMode ? <Sun className="text-white h-6 w-6"/> : <Moon className="h-6 w-6"/>}
                        </button>
                    </div>
                    <div className="py-4">
                        <button onClick={() => { signoutFunction() }}>
                            <Power className="h-6 w-6 hover:text-red-500 text-red-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


interface sidebarLinkProps {
    href: string,
    icon: LucideIcon,
    label: string
}

const SidebarLink = ({ href, icon: Icon, label }: sidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);

    return (
        <Link href={href} className="w-full">
            <div className={
                `relative flex cursor-pointer items-center transition-colors
                hover:bg-blue-200 dark:bg-sidebar dark:hover:bg-sidebarHover ${isActive ? "bg-blue-300 text-white dark:bg-gray-600" : ""}
                px-4 py-6 ${isCollapsed ? "justify-center" : "gap-3 justify-start"}`
            }>
                {isActive && (
                    <div className="absolute left-0 top-0 h-{100%} bg-blue-200"></div>
                )}

                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                {!useSelector((state: RootState) => state.sidebar.isCollapsed) && (
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                        {label}
                    </span>
                )}
            </div>
        </Link>
    )
}