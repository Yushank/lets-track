import { prisma } from "@/src/db";
import { authOptions } from "@/src/lib/auth";
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
        const {input, output} = body;

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

        return NextResponse.json({
            msg: "output sent successfuly to db"
        })
    }
    catch (error) {
        return NextResponse.json({
            error: "Error while seding output"
        }, { status: 500 })
    }
}