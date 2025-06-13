import { ChatBox } from "@/src/components/ChatBox";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function Home(){
    const session = await getServerSession(authOptions);
    if(!session?.user?.id){
        redirect("/signin");
    }

    return (
        <div>
            <ChatBox />
        </div>
    )
}