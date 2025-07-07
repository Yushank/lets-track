import { prisma } from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({
            msg: "Uauthorised - invalid user session"
        });
    }

    const userId = session.user.id

    try {
        const profile = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        return NextResponse.json({
            profile
        })
    }
    catch(error){
        return NextResponse.json({
            msg: `Unable to fetch user profile: ${error}`
        })
    }
}