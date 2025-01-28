import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Message, Language } from '@/types/chat';

export function useChatMessages() {
  const queryClient = useQueryClient();
  const currentLanguage: Language = 'en';

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
          id: message.id,
          content: message.content,
          type: message.type,
          status: message.status,
          language: currentLanguage,
          sources: message.sources,
          created_at: message.created_at
        }]);

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
  };
}