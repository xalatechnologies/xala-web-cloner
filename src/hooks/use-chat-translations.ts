import { useTranslation } from 'react-i18next';

export interface ChatTranslations {
  'chat.title': string;
  'chat.status.thinking': string;
  'chat.status.online': string;
  'chat.input.placeholder': string;
  'chat.input.button': string;
  'chat.errors.failed_to_send': string;
}

export function useChatTranslations() {
  const { t } = useTranslation();

  const translations: ChatTranslations = {
    'chat.title': t('chat.title', 'Xala AI Assistant'),
    'chat.status.thinking': t('chat.status.thinking', 'Thinking...'),
    'chat.status.online': t('chat.status.online', 'Online'),
    'chat.input.placeholder': t('chat.input.placeholder', 'Type a message...'),
    'chat.input.button': t('chat.input.button', 'Chat with Xala AI'),
    'chat.errors.failed_to_send': t('chat.errors.failed_to_send', 'Failed to send message'),
  };

  return {
    translations,
    isLoading: false,
  };
}
