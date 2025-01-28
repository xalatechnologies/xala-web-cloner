import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Message, Language, Source } from '@/types/chat';
import { Json } from '@/integrations/supabase/types';

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

      return (data || []).map(msg => ({
        ...msg,
        sources: msg.sources as Source[] || undefined
      })) as Message[];
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: Message) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          id: message.id,
          content: message.content,
          type: message.type,
          status: message.status,
          language: currentLanguage,
          sources: message.sources as unknown as Json,
          created_at: message.created_at
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