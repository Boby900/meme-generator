'use server';

export async function generateMeme(base64Image: string) {
    const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const YOUR_SITE_URL = "http://localhost:3000"; // Replace with your actual site URL
    const YOUR_SITE_NAME = "MemeAI"; // Replace with your actual site namess
    if (!OPENROUTER_API_KEY) {
        throw new Error("OPENROUTER_API_KEY is not set in server action.");
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
                            "text": "Analyze this image and generate a funny meme caption for it. Be creative and humorous."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": base64Image // Use the Base64 string here
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