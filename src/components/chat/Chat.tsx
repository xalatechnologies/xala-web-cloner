import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useTranslation } from 'react-i18next';
import type { ChatTranslations } from '@/hooks/use-chat-translations';
import { cn } from '@/lib/utils';

interface ChatProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  className?: string;
  translations: ChatTranslations;
}

export function Chat({ messages, onSendMessage, isLoading, className, translations }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 bg-gray-50/50">
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLastMessage={index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-100 bg-white p-4">
        <ChatInput
          onSendMessage={onSendMessage}
          disabled={isLoading}
          thinking={isLoading}
          placeholder={translations['chat.input.placeholder']}
        />
      </div>
    </div>
  );
}
