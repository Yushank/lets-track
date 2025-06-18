import CalendarComponent from "@/src/components/Calendar";
import { authOptions } from "@/src/lib/auth";
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