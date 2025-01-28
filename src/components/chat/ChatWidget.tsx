import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from './useChatStore';
import { useSessionChat } from '@/hooks/use-session-chat';
import { useChatTranslations } from '@/hooks/use-chat-translations';
import { useChatSidebar } from '@/hooks/use-chat-sidebar';
import { Chat } from './Chat';
import { ChatHeader } from './ChatHeader';
import type { FC } from 'react';

export const ChatWidget: FC = () => {
  const { isOpen, thinking, setOpen } = useChatStore();
  const { messages, isLoading, sendMessage, updateMessageStatus } = useSessionChat();
  const { translations } = useChatTranslations();
  const { sidebarWidth } = useChatSidebar();

  const handleSendMessage = async (content: string): Promise<void> => {
    try {
      const message = {
        id: crypto.randomUUID(),
        content,
        type: 'user' as const,
        status: 'sending' as const,
      };

      await sendMessage(message);
      await updateMessageStatus({ id: message.id, status: 'sent' });
    } catch (error) {
      console.error(translations['chat.errors.failed_to_send'], error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.marginRight = sidebarWidth;
    } else {
      document.body.style.marginRight = '0';
    }

    return () => {
      document.body.style.marginRight = '0';
    };
  }, [isOpen, sidebarWidth]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Gradient Border */}
            <div className="fixed top-0 right-[480px] z-50 h-screen w-1 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary lg:block hidden" />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                mass: 0.8 
              }}
              className="fixed top-0 right-0 z-50 h-screen flex flex-col bg-white/80 backdrop-blur-md shadow-2xl overflow-hidden lg:w-[480px] w-full"
            >
              <ChatHeader thinking={thinking} translations={translations} />

              <div className="flex-1 overflow-y-auto">
                <Chat
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  disabled={isLoading}
                  thinking={thinking}
                  translations={translations}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-6 py-3 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary text-white rounded-full shadow-lg hover:shadow-xl backdrop-blur-sm"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">{translations['chat.input.button']}</span>
      </motion.button>
    </>
  );
};
