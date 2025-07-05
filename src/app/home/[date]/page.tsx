import { ChatBox } from "@/src/components/ChatBox";
import { TotalBar } from "@/src/components/TotalBar";
import { authOptions } from "@/src/lib/auth";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Home({
    params,
    searchParams,
}: {
    params: { date: string };
    searchParams?: { source?: string };
}) {

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect("/signin");
    }

    const today = format(new Date(), "yyyy-MM-dd");

    if (!searchParams?.source && params.date !== today) {
        redirect(`/home/${today}`);
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <header className="shrink-0">
                <TotalBar />
            </header>
            <main className="flex-1 overflow-hidden">
                <ChatBox />
            </main>
        </div>
    );
}