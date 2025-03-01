import { Avatar } from "@/components/ui/avatar";
const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary">
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
        </Avatar>
      )}
      
      <div 
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-secondary text-secondary-foreground rounded-tl-none'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
        
        {message.typing && (
          <div className="flex space-x-1 mt-1 items-center h-4">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 ml-2">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary">
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
              className="text-secondary-foreground"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </Avatar>
      )}
    </div>
  );
};
export default ChatMessage;