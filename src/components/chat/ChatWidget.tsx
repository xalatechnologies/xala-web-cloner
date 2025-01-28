import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Brain, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatStore } from './useChatStore';
import { motion } from 'framer-motion';
import { useChatMessages } from '@/hooks/use-chat-messages';
import { useChatTranslations } from '@/hooks/use-chat-translations';
import { ChatHeader } from './ChatHeader';

export const ChatWidget = () => {
  const { t } = useTranslation();
  const { isOpen, thinking, setOpen } = useChatStore();
  const { messages, isLoading, sendMessage, updateMessageStatus } = useChatMessages();
  const { translations } = useChatTranslations();

  const widgetRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    try {
      const message = {
        id: crypto.randomUUID(),
        content,
        type: 'user' as const,
        status: 'sending' as const,
        created_at: new Date().toISOString()
      };

      await sendMessage(message);
      await updateMessageStatus({ id: message.id, status: 'sent' });

    } catch (error) {
      console.error(translations['chat.errors.failed_to_send'], error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <motion.div
          ref={widgetRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <ChatHeader thinking={thinking} translations={translations} />

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div 
            className="p-4 border-t border-gray-200 bg-white rounded-b-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              thinking={thinking}
              placeholder={translations['chat.input.placeholder']}
            />
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">{translations['chat.input.button']}</span>
        </motion.button>
      )}
    </div>
  );
};
