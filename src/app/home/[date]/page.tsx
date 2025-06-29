import { ChatBox } from "@/src/components/ChatBox";
import { TotalBar } from "@/src/components/TotalBar";
import { authOptions } from "@/src/lib/auth";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


interface Props {
    params: { date: string };
    searchParams: { source?: string };
}


export default async function Home({ params, searchParams }: Props) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect("/signin");
    }

    const now = new Date();
    const date = now.toLocaleString();
    const today = format(date, "yyyy-MM-dd");

    if (!searchParams.source && params.date !== today) {
        redirect(`/home/${today}`)
    }

    //this above logic makes the page redirect to current date i.e today's date page, unless it has a source, which we add to url when redirecting to home page from calendar ("router.push(`/home/${format(newDate, 'yyyy-MM-dd')}?source=calendar`);")
    //that means unless we visit anyother date from calendar, the default page will always be today's date page


    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <header className="shrink-0">
                <TotalBar />
            </header>
            <main className="flex-1 overflow-hidden">
                <ChatBox />
            </main>
        </div>
    )
}