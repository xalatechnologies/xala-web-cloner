import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '@/components/chat/Chat';
import type { Message } from '@/types/chat';
import { useTranslation } from 'react-i18next';

export default function ChatPage() {
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Chat
          messages={messages}
          onSendMessage={handleSendMessage}
          thinking={isLoading}
          translations={{
            'chat.title': t('chat.title'),
            'chat.status.thinking': t('chat.status.thinking'),
            'chat.status.online': t('chat.status.online'),
            'chat.input.placeholder': t('chat.input.placeholder'),
            'chat.input.button': t('chat.input.button'),
            'chat.errors.failed_to_send': t('chat.errors.failed_to_send'),
          }}
        />
      </div>
    </div>
  );
}