import { useCallback } from 'react';
import { useChatStore } from '@/components/chat/useChatStore';
import { getAIResponse } from '@/lib/ai';
import type { Message } from '@/types/chat';

export function useSessionChat() {
  const { messages, addMessage, updateMessageStatus, setThinking, context } = useChatStore();

  const sendMessage = useCallback(async (message: Message) => {
    const messageId = addMessage(message.content, message.type);
    setThinking(true);

    try {
      const aiResponse = await getAIResponse(messages, context);
      addMessage(aiResponse.content, 'assistant');
      updateMessageStatus(messageId, 'sent');
    } catch (error) {
      console.error('Failed to get AI response:', error);
      updateMessageStatus(messageId, 'error');
      throw error;
    } finally {
      setThinking(false);
    }
  }, [messages, addMessage, updateMessageStatus, setThinking, context]);

  return {
    messages,
    sendMessage,
    isLoading: false,
  };
}