'use server';

export async function generateMeme(imageUrl: string) {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // This will be accessed on the server
    const YOUR_SITE_URL = "http://localhost:3000"; // Replace with your actual site URL
    const YOUR_SITE_NAME = "MemeAI"; // Replace with your actual site name
    if (!OPENROUTER_API_KEY) {
        console.error("OPENROUTER_API_KEY is not set in server action.");
        throw new Error("API Key is not configured. Please check your environment variables.");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": YOUR_SITE_URL,
            "X-Title": YOUR_SITE_NAME,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "mistralai/mistral-small-3.2-24b-instruct:free",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "What is in this image?"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": imageUrl
                            }
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    return response.json();
}