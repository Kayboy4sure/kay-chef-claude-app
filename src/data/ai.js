import apiChef from './api-chef'
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.


// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN

const hf = new HfInference(apiChef)

export async function GetRecipeFromHf(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}




export async function GetRecipeFromOpenrouter(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
            "Authorization": `Bearer ${apiChef}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.3-70b-instruct:free",
                "messages": [
                    { 
                        role: "user", 
                        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` 
                    }
                ]
            })
        })
        const data = await response.json();
        return data.choices[0].message.content
    } catch (err) {
    console.error(err.message)
    }
}
