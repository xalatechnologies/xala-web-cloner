import { useState, useCallback } from 'react';
import { generateResponse } from '@/api/llm/chat';
import { useChatStore } from '@/components/chat/useChatStore';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  status: 'sending' | 'sent' | 'error';
  timestamp: Date;
}

export function useSessionChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setThinking } = useChatStore();
  const { i18n } = useTranslation();

  const updateMessageStatus = useCallback((messageId: string, status: Message['status']) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    ));
  }, []);

  const sendMessage = useCallback(async (message: Omit<Message, 'status' | 'timestamp'>) => {
    const timestamp = new Date();
    const messageId = `${timestamp.getTime()}-${Math.random()}`;

    // Add user message
    setMessages(prev => [...prev, { 
      ...message, 
      id: messageId,
      status: 'sending',
      timestamp 
    }]);

    setThinking(true);
    setIsLoading(true);

    try {
      const response = await generateResponse(message.content, i18n.language);
      
      // Add assistant response
      setMessages(prev => [...prev, {
        id: `${messageId}-response`,
        content: response.message,
        type: 'assistant',
        status: 'sent',
        timestamp: new Date()
      }]);

      // Update original message status
      updateMessageStatus(messageId, 'sent');
    } catch (error) {
      console.error('Failed to send message:', error);
      updateMessageStatus(messageId, 'error');
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
