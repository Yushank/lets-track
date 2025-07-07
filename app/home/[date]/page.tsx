import { ChatBox } from "@/components/ChatBox";
import { TotalBar } from "@/components/TotalBar";
import { authOptions } from "@/lib/auth";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Use this exact type definition
type PageParams = {
    date: string;
};

type PageSearchParams = {
    source?: string;
};

export default async function Home({
    params,
    searchParams,
}: {
    params: Promise<PageParams>;
    searchParams?: Promise<PageSearchParams>;
}) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect("/signin");
    }

    // Await the params and searchParams
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const today = format(new Date(), "yyyy-MM-dd");

    //redirect if source doesn't have calendar or it is not today date
    if (resolvedSearchParams?.source !== 'calendar' && resolvedParams.date !== today) {
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