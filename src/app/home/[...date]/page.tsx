import { ChatBox } from "@/src/components/ChatBox";
import { Signout } from "@/src/components/Signout";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";



export default async function Home() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect("/signin");
    }

    return (
        <div>
            <div>
                <Link href={"/calendar"} legacyBehavior>
                    <a className="block">
                        <h2>Calendar</h2>
                    </a>
                </Link>
            </div>
            <div>
                <Signout />
            </div>
            <div>
                <ChatBox />
            </div>
        </div>
    )
}