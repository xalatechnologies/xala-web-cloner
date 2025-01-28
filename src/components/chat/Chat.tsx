import { useEffect, useRef, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import type { Message, ChatTranslations } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  thinking?: boolean;
  translations: ChatTranslations;
  className?: string;
}

export const Chat: FC<ChatProps> = ({
  messages,
  onSendMessage,
  disabled,
  thinking,
  translations,
  className
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ChatMessage
                message={message}
                isLastMessage={index === messages.length - 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-100/50 bg-white/50 backdrop-blur-sm p-4 flex-shrink-0">
        <ChatInput
          onSendMessage={onSendMessage}
          disabled={disabled}
          thinking={thinking}
          placeholder={translations['chat.input.placeholder']}
        />
      </div>
    </div>
  );
};