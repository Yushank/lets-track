import { prisma } from "@/src/db";
import { authOptions } from "@/src/lib/auth";
import { userInfoInput } from "@/src/schemas/userInfoSchema";
import { userTotalInfoPatchInput } from "@/src/schemas/userTotalInfoSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({
            msg: "Unauthorised - no valid user session"
        }, { status: 401 })
    }

    const userId = session.user.id;

    const body = await req.json()
    try {
        const parsePayload = userTotalInfoPatchInput.safeParse(body)

        if (!parsePayload.success) {
            return NextResponse.json({
                message: "Invalid Inputs",
                errors: parsePayload.error.flatten() // Provides detailed validation errors
            },
                { status: 400 })
        };

        const data = parsePayload.data;

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                weight: data.weight,
                height: data.height,
                age: data.age,
                gender: data.gender
            }
        });

        return NextResponse.json({
            msg: "Information updated successfully"
        }, { status: 200 });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}