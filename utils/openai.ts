import OpenAI from "openai";



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

type openRouterChatCompletion = OpenAI.ChatCompletion & {
    choices: {
        message: {
            reasoning?: string;
            role: 'assistant' | 'user' | 'system';
            content: string | null;
        };
    }[];
};
// this is for to add type in open router as it also returns reasoning but openAI doesn't have it so we are adding this, so we can get content and reasoning both in return

export async function getChatResponse(foodItems: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: 'google/gemma-3-4b-it:free',
            messages: [
                {
                    role: 'user',
                    content: `Calculate nutrition for: ${foodItems}. Only return numbers for total calories, protein, carbs and fats. No reasoning or text.`
                }
            ],
            temperature: 0.3,
            max_tokens: 200,
        }) as unknown as openRouterChatCompletion;
        //as unknown first reset the type, then as openRouterChatCompletion applies our custom type

        const message = response.choices[0]?.message;
        const responseText = message?.content || message?.reasoning || "Cannot Calculate";
        //check both content and reasoning , fallbacks to empty string if both are empty


        return responseText;
    }
    catch (error) {
        console.log("OpenAI API error: ", error);
        return "Error calculating calories. Please try again"
    }
}