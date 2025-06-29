import { z } from "zod"

export const userInfoInput = z.object({
    weight: z.number(),
    height: z.number(),
    age: z.number(),
    gender: z.string()
});

export type userInfoInput = z.infer<typeof userInfoInput>;