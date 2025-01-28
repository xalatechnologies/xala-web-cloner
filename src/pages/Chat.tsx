import React, { useState } from 'react';
import { Message } from '@/types/chat';
import { Chat } from '@/components/chat/Chat';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! How can I help you today?',
      status: 'sent',
      language: 'en',
      created_at: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content,
      status: 'sending',
      language: 'en',
      created_at: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );

      const botMessage: Message = {
        id: uuidv4(),
        type: 'assistant',
        content: `I received your message: "${content}"`,
        status: 'sent',
        language: 'en',
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
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
          thinking={isLoading}
        />
      </div>
    </div>
  );
}