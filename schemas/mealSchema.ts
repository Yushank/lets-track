import { z } from "zod";

export const mealInput = z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fats: z.number(),
    userId: z.string()
});

export type mealInput = z.infer<typeof mealInput>

