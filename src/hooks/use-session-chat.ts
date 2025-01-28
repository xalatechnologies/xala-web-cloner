import { useState, useCallback } from 'react';
import { generateResponse } from '@/api/llm/chat';
import { useChatStore } from '@/components/chat/useChatStore';
import type { Message } from '@/types/chat';

export function useSessionChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setThinking } = useChatStore();

  const updateMessageStatus = useCallback((messageId: string, status: Message['status']) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    ));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const messageId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Add user message
    const userMessage: Message = {
      id: messageId,
      content,
      type: 'user',
      status: 'sending',
      language: 'en',
      created_at: timestamp
    };

    setMessages(prev => [...prev, userMessage]);
    setThinking(true);
    setIsLoading(true);

    try {
      const response = await generateResponse(content);
      
      // Add assistant response
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: response.message,
        type: 'assistant',
        status: 'sent',
        language: 'en',
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      updateMessageStatus(messageId, 'sent');
    } catch (error) {
      console.error('Failed to send message:', error);
      updateMessageStatus(messageId, 'error');
    } finally {
      setThinking(false);
      setIsLoading(false);
    }
  }, [setThinking, updateMessageStatus]);

  return {
    messages,
    isLoading,
    sendMessage
  };
}