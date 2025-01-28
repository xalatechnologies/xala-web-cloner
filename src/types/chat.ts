export type MessageType = 'user' | 'assistant';
export type MessageStatus = 'sending' | 'sent' | 'error';
export type Language = 'en' | 'no';

export interface Source {
  title: string;
  url: string;
  content?: string; // Made optional to support existing code
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  language: Language;
  sources?: Source[];
  created_at: string;
  updated_at?: string;
  thinking?: boolean; // Added to support existing functionality
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  context: string;
  thinking: boolean;
}