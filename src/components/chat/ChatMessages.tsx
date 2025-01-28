import React from 'react';
import { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onLinkClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatMessages({
  messages,
  isTyping,
  onLinkClick,
  messagesEndRef
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onLinkClick={onLinkClick}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}