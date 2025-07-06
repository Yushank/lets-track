import { ChatBox } from "@/src/components/ChatBox";
import { TotalBar } from "@/src/components/TotalBar";
import { authOptions } from "@/src/lib/auth";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export const dynamic = 'force-dynamic'; // Add this if you need dynamic rendering

interface PageProps {
  params: { date: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
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