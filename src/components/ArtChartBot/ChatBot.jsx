import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestionChip from './SuggestionChip';
import { INITIAL_MESSAGE, SUGGESTIONS, generateAIResponse } from '../../lib/chatbot-data';
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Scroll to the bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = async (text) => {
    // Add user message
    const userMessage = { id: Date.now(), text, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    const typingMessage = { id: 'typing', text: '', isUser: false, typing: true };
    setMessages(prev => [...prev, typingMessage]);
    
    try {
      // Generate AI response
      const response = await generateAIResponse(text, messages);
      
      setMessages(prev => 
        prev.filter(msg => msg.id !== 'typing').concat({
          id: Date.now() + 1,
          text: response,
          isUser: false
        })
      );
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Remove typing indicator and add error message
      setMessages(prev => 
        prev.filter(msg => msg.id !== 'typing').concat({
          id: Date.now() + 1,
          text: "I'm having trouble connecting right now. Please try again later.",
          isUser: false
        })
      );
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleSuggestionClick = (text) => {
    handleSendMessage(text);
  };
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      <div 
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 overflow-hidden 
        ${isOpen ? 'w-80 sm:w-96 h-[500px]' : 'w-14 h-14'}`}
      >
        {isOpen ? (
          <div className="flex flex-col h-full">
            {/* Chat header */}
            <div className="p-4 border-b flex justify-between items-center bg-card">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary-foreground"
                  >
                    <path d="M12 8c4.97 0 9-1.79 9-4s-4.03-4-9-4-9 1.79-9 4 4.03 4 9 4Z"></path>
                    <path d="M10.17 4.66a2 2 0 0 1 3.66 0"></path>
                    <path d="M12 12c4.97 0 9-1.79 9-4"></path>
                    <path d="M12 16c4.97 0 9-1.79 9-4"></path>
                    <path d="M12 20c4.97 0 9-1.79 9-4"></path>
                    <path d="M3 8v8c0 1.86 3.28 3.43 7.5 3.91"></path>
                    <path d="M21 14v3"></path>
                    <path d="M21 17h-6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Art Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m18 6-12 12"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Chat messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 py-3"
            >
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isUser={message.isUser} 
                />
              ))}
              <div ref={messagesEndRef} />
              
              {/* Suggestions shown only when there are few messages */}
              {messages.length < 3 && (
                <div className="mt-4 mb-2">
                  <p className="text-xs text-muted-foreground mb-2">Try asking about:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((text, index) => (
                      <SuggestionChip 
                        key={index}
                        text={text}
                        onClick={handleSuggestionClick}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat input */}
            <div className="p-4 border-t">
              <ChatInput 
                onSendMessage={handleSendMessage} 
                disabled={isTyping}
              />
            </div>
          </div>
        ) : (
          <button 
            onClick={toggleChat}
            className="w-full h-full rounded-full bg-primary flex items-center justify-center text-primary-foreground"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
export default ChatBot;