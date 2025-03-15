const apikey = import.meta.env.VITE_APP_API_KEY;

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

export async function GetRecipeFromOpenrouter(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
            "Authorization": `Bearer ${apikey}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.3-70b-instruct:free",
                "messages": [
                    {role: "system", content: SYSTEM_PROMPT },
                    {role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
                ]
            })
        })
        const data = await response.json();
        return data.choices[0].message.content
    } catch (err) {
    console.error(err.message)
    }
}
