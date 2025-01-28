import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Message, Language } from '@/types/chat';

export function useChatMessages() {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const currentLanguage = (i18n.language.toLowerCase().startsWith('en') ? 'en' : 'no') as Language;

  const messagesQuery = useQuery({
    queryKey: ['chat-messages', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('language', currentLanguage)
        .order('created_at', { ascending: true });

      if (error) {
        throw new Error('Failed to fetch chat messages');
      }

      return (data || []) as Message[];
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: Message) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          ...message,
          language: currentLanguage
        }]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    },
  });

  const updateMessageMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Message['status'] }) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    },
  });

  return {
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage: sendMessageMutation.mutate,
    updateMessageStatus: updateMessageMutation.mutate,
  };
}