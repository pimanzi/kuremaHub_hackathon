const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function generateDescription(prompt) {
  if (!API_KEY) {
    console.error("API key is missing. Check your environment variables.");
    return "API key not configured. Please check your setup.";
  }
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin, 
        "X-Title": "Art Description Generator" 
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free", 
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 200
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error (${response.status}): ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("API Error:", error);
    return "Error: " + error.message;
  }
}