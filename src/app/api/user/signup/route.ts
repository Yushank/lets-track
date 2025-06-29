import { signupInput } from "@/src/schemas/userSchema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/src/db'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const parsePayload = signupInput.safeParse(body);

        if (!parsePayload.success) {
            return NextResponse.json({
                message: "Invalid Inputs"
            })
        };

        const data = parsePayload.data;

        const isUserExists = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        });

        if (isUserExists) {
            return NextResponse.json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashedPassword,
            }
        });

        console.log("user created: ", user);

        return NextResponse.json({
            message: "Signup successfull",
            username: body.email
        })
    }
    catch (error) {
        return NextResponse.json({
            message: `Error while Signing up: ${error}`
        })
    }
}


