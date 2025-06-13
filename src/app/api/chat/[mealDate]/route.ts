import { prisma } from "@/src/db";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({
            msg: "Unauthorised - No valid session user"
        }, { status: 401 })
    };

    const userId = session.user.id;

    try {
        const url = new URL(req.url);
        const date = url.pathname.split('/').pop() || '';
        const start = new Date(date + "T00:00:00.000Z");
        const end = new Date(date + "T23:59:59.999Z");
        console.log("extracted date from url: ", date);

        const meals = await prisma.meal.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: start,
                    lte: end,
                }
            }
        });

        return NextResponse.json({
            meals
        });
    }
    catch (error) {
        return NextResponse.json({
            msg: `error fetching meals: ${error}`
        })
    }
}