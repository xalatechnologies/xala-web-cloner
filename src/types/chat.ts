export interface Source {
  title: string;
  url: string;
}

export type MessageType = 'user' | 'assistant';
export type MessageStatus = 'sending' | 'sent' | 'error';
export type Language = 'en' | 'no';
export type LegalType = 'privacy' | 'terms' | 'cookies';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  language: Language;
  sources?: Source[];
  created_at: string;
  updated_at?: string;
}

export interface ChatTranslations {
  'chat.title': string;
  'chat.status.thinking': string;
  'chat.status.online': string;
  'chat.input.placeholder': string;
  'chat.input.button': string;
  'chat.errors.failed_to_send': string;
}