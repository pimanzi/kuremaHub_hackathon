export const INITIAL_MESSAGE = {
    id: "welcome",
    text: "Hello! I'm your Art Assistant. I can help you learn about our platform, art styles, techniques, and more. What would you like to know?",
    isUser: false
  };
  export const SUGGESTIONS = [
    "How can artists use this platform?",
    "Tell me about impressionism",
    "What art supplies do beginners need?",
    "How do I upload my artwork?",
    "Explain color theory basics"
  ];
  // Frequently asked questions with predefined answers
  export const FAQ_DATA = {
    "platform": {
      "How can artists use this platform?": 
        "Artists can use our platform to showcase their work, connect with art enthusiasts, sell their creations, and gain visibility in the art community. You can upload artwork, create a portfolio, set prices, and engage with collectors directly.",
      
      "How do I upload my artwork?": 
        "To upload your artwork, navigate to the 'Upload' section from your dashboard. You can drag and drop images, add details like title, medium, dimensions, and price, then generate an AI-powered description to enhance your listing.",
      
      "Is there a fee for selling artwork?": 
        "We charge a 10% commission on sold artworks. There's no upfront cost to list your art, making it risk-free to join our marketplace.",
      
      "How do payments work?": 
        "When a buyer purchases your art, the payment is processed securely through our platform. Once the transaction is complete and the artwork is delivered, funds are released to your account, which you can withdraw to your bank.",
      
      "Can I create a portfolio?": 
        "Yes! You can create a customized portfolio to showcase your artistic journey. Add your bio, artist statement, exhibition history, and organize your work into collections to present a professional profile to potential buyers."
    },
    
    "art_knowledge": {
      "Tell me about impressionism": 
        "Impressionism emerged in the late 19th century, pioneered by artists like Monet, Renoir, and Degas. It's characterized by small, visible brushstrokes, emphasis on light and its changing qualities, ordinary subject matter, and unusual visual angles. Impressionists sought to capture the immediate visual impression of a scene, particularly the shifting effect of light and color.",
      
      "What art supplies do beginners need?": 
        "Beginners should start with: 1) Drawing pencils (HB, 2B, 4B, 6B), 2) Sketchbook, 3) Eraser and sharpener, 4) Basic paint set (acrylic is versatile for beginners), 5) A few quality brushes in different sizes, 6) Palette for mixing colors, 7) Canvas panels or paper suitable for your medium. As you develop, you can invest in more specialized supplies based on your preferred medium and style.",
      
      "Explain color theory basics": 
        "Color theory is the practical guidance for color mixing and visual effects. The basics include: 1) Primary colors (red, yellow, blue) can't be created by mixing other colors, 2) Secondary colors (orange, green, purple) are created by mixing primary colors, 3) The color wheel shows relationships between colors, 4) Complementary colors are opposite on the wheel and create strong contrast, 5) Analogous colors are adjacent on the wheel and create harmony, 6) Warm colors (reds, yellows, oranges) evoke energy while cool colors (blues, greens, purples) are calming. Understanding these principles helps create balanced and emotionally effective artwork."
    }
  };
  // Simulated AI response generation with a delay
  export const generateAIResponse = async (userMessage, messageHistory) => {
    // Debug: Log incoming message
    console.log('Received message:', userMessage);

    // First check if this is a FAQ question
    for (const category in FAQ_DATA) {
      if (FAQ_DATA[category][userMessage]) {
        return FAQ_DATA[category][userMessage];
      }
    }

    // Debug: Log that we're attempting API call
    console.log('No FAQ match found, attempting API call');

    const API_KEY = import.meta.env.VITE_API_KEY;
    
    if (!API_KEY) {
      throw new Error('The API key is not configured');
    }

    try {
      // Debug: Log API request
      console.log('Sending API request with payload:', {
        model: 'deepseek/deepseek-r1:free',
        messageCount: messageHistory.length + 1
      });

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Art Assistant'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [
            { role: 'system', content: 'You are a helpful art assistant who provides information about artworks, artists, and art history.' },
            ...messageHistory.map(msg => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      // Debug: Log raw response
      console.log('Raw API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      // Debug: Log parsed response
      console.log('Parsed API response:', data);

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Detailed error:', error);
      throw error;
    }
  };