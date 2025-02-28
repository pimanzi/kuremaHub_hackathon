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
  export const generateAIResponse = async (message, conversationHistory) => {
    // Check if the message matches any FAQ first
    const lowerMessage = message.toLowerCase();
    
    // Check for platform-related questions
    for (const [question, answer] of Object.entries(FAQ_DATA.platform)) {
      if (lowerMessage.includes(question.toLowerCase())) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        return answer;
      }
    }
    
    // Check for art knowledge questions
    for (const [question, answer] of Object.entries(FAQ_DATA.art_knowledge)) {
      if (lowerMessage.includes(question.toLowerCase())) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        return answer;
      }
    }
    
    // Generic responses for unmatched queries
    const genericResponses = [
      `That's an interesting question about ${message.split(' ').slice(0, 3).join(' ')}. In the art world, there are many perspectives on this. Could you tell me more specifically what you'd like to know?`,
      
      "I appreciate your curiosity! While I don't have all the details on that specific topic, I can help you explore related areas of art. Would you like to know about different art movements, techniques, or our platform features?",
      
      "Great question! Art is such a vast field with endless exploration. To give you the most helpful information, could you clarify what aspect of this topic interests you most?",
      
      "Thanks for your question. The beauty of art is in its diversity and subjective nature. I'd love to discuss this more - could you share what sparked your interest in this particular topic?"
    ];
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return a random generic response
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };