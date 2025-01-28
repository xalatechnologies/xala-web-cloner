import React, { useState } from 'react';
import { Message } from '@/types/chat';
import { Chat } from '@/components/chat/Chat';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content,
      timestamp: new Date(),
      status: 'sending',
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user message status to sent
      setMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );

      // Simulate bot response
      const botMessage: Message = {
        id: uuidv4(),
        type: 'bot',
        content: `I received your message: "${content}"`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Update user message status to error
      setMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-[80vh] items-center justify-center py-8">
      <div className="h-full w-full max-w-2xl rounded-lg border bg-background shadow-sm">
        <Chat
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
