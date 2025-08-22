import React, { useRef, useEffect, useState } from 'react';
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
import type { Message } from '@/types/chat';

export const ChatWidget: FC = () => {
  const { isOpen, thinking, setOpen } = useChatStore();
  const { messages, isLoading, sendMessage, updateMessageStatus } = useSessionChat();
  const { translations } = useChatTranslations();
  const { sidebarWidth } = useChatSidebar();
  const chatRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const [showChatWidget, setShowChatWidget] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  // Scroll detection to show chat widget only after hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        // Show chat widget when user scrolls past 80% of hero section
        setShowChatWidget(scrollPosition > heroHeight * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.marginRight = `${sidebarWidth}px`;
    } else {
      document.body.style.marginRight = '0';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.marginRight = '0';
    };
  }, [isOpen, sidebarWidth, setOpen]);

  const handleSendMessage = async (content: string): Promise<void> => {
    try {
      const message: Message = {
        id: crypto.randomUUID(),
        content,
        type: 'user',
        status: 'sending',
        language: i18n.language === 'nb' ? 'no' : 'en',
        created_at: new Date().toISOString()
      };

      await sendMessage(message);
      await updateMessageStatus({ id: message.id, status: 'sent' });
    } catch (error) {
      console.error(translations['chat.errors.failed_to_send'], error);
    }
  };

  // Don't render chat widget if user hasn't scrolled past hero section
  if (!showChatWidget) {
    return null;
  }

  return (
    <div className="hidden sm:block fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Gradient Border (dark only) */}
            <div className="fixed top-0 right-[480px] z-50 h-screen w-1 bg-border dark:bg-gradient-to-b dark:from-xala-primary dark:via-xala-secondary dark:to-xala-primary lg:block hidden" />
            
            <motion.div
              ref={chatRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                mass: 0.8 
              }}
              className="fixed top-0 right-0 z-50 h-screen flex flex-col bg-card text-card-foreground border-l border-border dark:bg-white/80 dark:text-black backdrop-blur-md shadow-2xl overflow-hidden lg:w-[480px] w-full"
            >
              <ChatHeader thinking={thinking} translations={translations} />

              <div className="flex-1 overflow-y-auto">
                <Chat
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  disabled={isLoading}
                  thinking={thinking}
                  translations={translations}
                  autoFocus={isOpen}
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
        className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg hover:shadow-xl backdrop-blur-sm bg-primary text-primary-foreground dark:bg-gradient-to-b dark:from-xala-primary dark:via-xala-secondary dark:to-xala-primary"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">{translations['chat.input.button']}</span>
      </motion.button>
    </div>
  );
};
