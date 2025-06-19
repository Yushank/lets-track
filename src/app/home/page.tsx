"use client"

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function DefaultHome(){
    const router = useRouter();

    useEffect(() => {
        const now = new Date();
        const date = now.toLocaleString();
        console.log("now in home page:", now)
        console.log("current date home page: ", date);
        router.push(`/home/${format(date, "yyyy-MM-dd")}`);
    }, []);
}