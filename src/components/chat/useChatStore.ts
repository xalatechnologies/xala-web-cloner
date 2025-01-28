import { create } from 'zustand';
import { Message } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import { AI_CONSULTANT_CONFIG } from '@/config/ai-consultant';

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  thinking: boolean;
  context: string;
  addMessage: (content: string, type: Message['type']) => string;
  updateMessageStatus: (id: string, status: Message['status']) => void;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
  setThinking: (thinking: boolean) => void;
  setContext: (context: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [
    {
      id: uuidv4(),
      type: 'assistant',
      content: AI_CONSULTANT_CONFIG.quickResponses.greeting,
      status: 'sent',
      language: 'en',
      created_at: new Date().toISOString(),
    },
  ],
  isLoading: false,
  isOpen: false,
  thinking: false,
  context: AI_CONSULTANT_CONFIG.defaultContext,
  addMessage: (content, type) => {
    const id = uuidv4();
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id,
          type,
          content,
          status: type === 'user' ? 'sending' : 'sent',
          language: 'en',
          created_at: new Date().toISOString(),
        },
      ],
    }));
    return id;
  },
  updateMessageStatus: (id, status) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, status } : msg
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setOpen: (open) => set({ isOpen: open }),
  setThinking: (thinking) => set({ thinking }),
  setContext: (context) => set({ context }),
}));