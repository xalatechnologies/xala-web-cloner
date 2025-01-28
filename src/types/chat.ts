export type MessageType = 'user' | 'assistant';
export type MessageStatus = 'sending' | 'sent' | 'error';
export type Language = 'en' | 'no';

export interface Source {
  title: string;
  url: string;
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  language: Language;
  sources?: Source[];
  created_at: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  context: string;
  thinking: boolean;
}