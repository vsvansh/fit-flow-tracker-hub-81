
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Send, Smile } from "lucide-react";

interface ChatBoxProps {
  friendName: string;
  friendAvatar: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatBox = ({ friendName, friendAvatar, isOpen, onClose }: ChatBoxProps) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hey there! How are you?", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setNewMessage("");
      
      // Simulate response after a short delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            text: "That's great! I'm doing well too. Looking forward to our next workout!", 
            isUser: false 
          }
        ]);
      }, 1000);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg z-50 flex flex-col animate-fade-in">
      <CardHeader className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={friendAvatar} alt={friendName} />
              <AvatarFallback>{friendName[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-sm font-medium">{friendName}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 h-60 overflow-y-auto flex flex-col space-y-2">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <Avatar className="h-6 w-6 mr-2 flex-shrink-0 mt-1">
                <AvatarImage src={friendAvatar} alt={friendName} />
                <AvatarFallback>{friendName[0]}</AvatarFallback>
              </Avatar>
            )}
            <div 
              className={`px-3 py-2 rounded-lg max-w-[80%] ${
                message.isUser 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-2 border-t">
        <div className="flex w-full items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="h-8 text-sm"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 flex-shrink-0 text-blue-500"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
