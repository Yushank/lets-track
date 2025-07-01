import { z } from "zod"

export const userTotalInfoInput = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    gender: z.string(),
    weight: z.number(),
    height: z.number(),
});

//  All fields optional for PATCH use
export const userTotalInfoPatchInput = userTotalInfoInput.partial();

export type userTotalInfoPatchInput = z.infer<typeof userTotalInfoPatchInput>;