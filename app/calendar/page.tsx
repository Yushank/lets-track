import CalendarComponent from "@/components/Calendar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function Calendar(){
    const session = await getServerSession(authOptions);

    if(!session?.user?.id){
        redirect('/signin')
    }

    return (
        <div>
            <CalendarComponent></CalendarComponent>
        </div>
    )
}