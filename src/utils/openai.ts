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
                    role: 'system',
                    content: `you are a nutrition tracker, give me only the total nutrition of food i am asking for, which will include total calories, protein, carbs and fats. Don't provide me with reasoning i only want numbers in total.`
                }, {
                    role: 'user',
                    content: foodItems
                }
            ],
            temperature: 0.3,
            max_completion_tokens: 200,
        }) as unknown as openRouterChatCompletion;
        //as unknown first reset the type, then as openRouterChatCompletion applies our custom type

        // console.log("Full OpenRouter response:", JSON.stringify(response, null, 2));

        const message = response.choices[0]?.message;
        const responseText = message?.content || message?.reasoning || "Cannot Calculate";
        //check both content and reasoning , fallbacks to empty string if both are empty

        // const calorieMatch = responseText?.match(/\d+\s*calories/i) || responseText?.match(/\d+/);
        // //use regex to find calorie number in either "350 calories" or "350" format

        // return calorieMatch ? `${calorieMatch[0]} calories` : "Cannot calculate the calories"


        return responseText;
    }
    catch (error) {
        console.log("OpenAI API error: ", error);
        return "Error calculating calories. Please try again"
    }
}