import { prisma } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({
                msg: "Unauthorised - No valid user sesion"
            }, { status: 401 })
        }

        const userId = session.user.id;

        const body = await req.json();
        const { input, output } = body;

        const inputText = await input.trim();
        const outputText = await output.trim();
        console.log("output recieved on route: ", outputText);
        console.log("input received on route: ", inputText)

        const chatOutput = await prisma.chat.create({
            data: {
                input: inputText,
                output: outputText,
                userId: userId
            }
        })
        console.log("chat-output:", chatOutput);

        return NextResponse.json({
            msg: "output sent successfuly to db"
        })
    }
    catch (error) {
        return NextResponse.json({
            msg: `Error while sending output: ${error}`
        }, { status: 500 })
    }
}


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({
            msg: 'Unauthorised - No valid session user'
        }, { status: 401 })
    }

    const userId = session.user.id;

    try{
        const searchParams = req.nextUrl.searchParams;
        const date = searchParams.get('date');
        console.log("date in get chat api:", date)
        const start = new Date(date + "T00:00:00.000Z");
        const end = new Date(date + "T23:59:59.999Z");

        const chat = await prisma.chat.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: start,
                    lte: end
                }
            }
        });

        return NextResponse.json({
            chat
        })
    }
    catch(error){
        return NextResponse.json({

            msg: `Error fetching chats: ${error}`
        })
    }
}