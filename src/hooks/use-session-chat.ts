import { useState, useCallback } from 'react';
import { generateResponse } from '@/api/llm/chat';
import { useChatStore } from '@/components/chat/useChatStore';
import { useTranslation } from 'react-i18next';
import type { Message, MessageStatus } from '@/types/chat';

export function useSessionChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setThinking } = useChatStore();
  const { i18n } = useTranslation();

  const updateMessageStatus = useCallback(({ id, status }: { id: string; status: MessageStatus }) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status } : msg
    ));
  }, []);

  const sendMessage = useCallback(async (message: Message) => {
    setMessages(prev => [...prev, message]);
    setThinking(true);
    setIsLoading(true);

    try {
      const response = await generateResponse(message.content, i18n.language);
      
      // Add assistant response
      const assistantMessage: Message = {
        id: `${message.id}-response`,
        content: response.message,
        type: 'assistant',
        status: 'sent',
        language: message.language,
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      updateMessageStatus({ id: message.id, status: 'sent' });
    } catch (error) {
      console.error('Failed to send message:', error);
      updateMessageStatus({ id: message.id, status: 'error' });

      // The chat-ai Edge Function is served from the currently-unreachable
      // Supabase project (see src/integrations/supabase/client.ts) — show a
      // visible "unavailable" message instead of leaving the thinking
      // indicator spinning or failing silently.
      const unavailableMessage: Message = {
        id: `${message.id}-error`,
        content: error instanceof Error ? error.message : String(error),
        type: 'assistant',
        status: 'error',
        language: message.language,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, unavailableMessage]);
    } finally {
      setThinking(false);
      setIsLoading(false);
    }
  }, [i18n.language, setThinking, updateMessageStatus]);

  return {
    messages,
    isLoading,
    sendMessage,
    updateMessageStatus
  };
}
