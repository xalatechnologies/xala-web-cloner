export interface Source {
  title: string;
  url: string;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  status: 'sending' | 'sent' | 'error';
  language: 'en' | 'no';
  sources?: Source[];
  created_at: string;
  updated_at?: string;
}

export type MessageType = Message['type'];
export type MessageStatus = Message['status'];
export type Language = 'en' | 'no';

export interface ChatTranslations {
  'chat.title': string;
  'chat.status.thinking': string;
  'chat.status.online': string;
  'chat.input.placeholder': string;
  'chat.input.button': string;
  'chat.errors.failed_to_send': string;
}