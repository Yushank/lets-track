"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export const Signout = () => {
    const router = useRouter();

    async function signoutFunction(){
        await signOut({redirect: false});

        router.push("/signin");
    }

    return(
        <div className="rounded-lg border border-gray-500 p-2">
            <button onClick={()=> signoutFunction()}>Signout</button>
        </div>
    )
}