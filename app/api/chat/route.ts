import { authOptions } from "@/lib/auth";
import { getChatResponse } from "@/utils/openai";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db"



export async function POST(req: NextRequest) {
    try {
        //USER ID FETCH
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({
                msg: "Unauthorised - No valid session user"
            }, { status: 401 })
        }

        const userId = session.user.id;
        console.log("session userId: ", userId);


        //MESSAGE SENDING TO AI AND RECEIVING
        const text = (await req.text()).trim();

        if (!text.trim()) {
            return NextResponse.json({
                error: "Please enter some food items to calculate calories"
            }, { status: 400 });
        }

        const response = await getChatResponse(text);

        // CALORIES
        const calorieMatch = response?.match(/\d+\s*calories/i) || response?.match(/\d+/);
        //use regex to find calorie number in either "350 calories" or "350" format
        const calories = calorieMatch ? parseInt(calorieMatch[0]) : null;

        // PROTEIN
        const proteinMatch = response?.match(/protein\s*[:\-]?\s*(\d+(\.\d+)?)/i)
        const protein = proteinMatch ? parseFloat(proteinMatch[1]) : null;

        // CARBS
        const carbsMatch = response?.match(/carbs\s*[:\-]?\s*(\d+(\.\d+)?)/i);
        const carbs = carbsMatch ? parseFloat(carbsMatch[1]) : null;

        // FATS
        const fatsMatch = response?.match(/fats\s*[:\-]?\s*(\d+(\.\d+)?)/i);
        const fats = fatsMatch ? parseFloat(fatsMatch[1]) : null;

        if (calories === null || protein === null || carbs === null || fats === null) {
            return NextResponse.json({
                error: "Could not extract all required nutrition values from the AI response.",
                debug: { calories, protein, carbs, fats }
            }, { status: 400 })
        }

        const meal = await prisma.meal.create({
            data: {
                calories: calories,
                protein: protein,
                carbs: carbs,
                fats: fats,
                userId: userId
            }
        });
        console.log("meal in api/chat:", meal)

        // SENDING DATA TO SOCKET SERVER POST ROUTE
        console.time("emit-time");
        try {
            if (!meal || Object.keys(meal).length === 0) return;
            
            const response = await fetch(`${process.env.EMIT_SOCKET_URL!}/emit-meal`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(meal),
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            console.log("sending to socket:", meal);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Socket emit failed, continuing anyway:", error);
        }
        console.timeEnd("emit-time");
        console.log("log reached here after await fetch");


        return NextResponse.json({
            msg: "chat sent successfully",
            reply: response,
            meal
        });
    }
    catch (error) {
        return NextResponse.json({
            error: `error while sending chat: ${error instanceof Error ? error.message : String(error)}`
        }, { status: 500 });
    }
}
