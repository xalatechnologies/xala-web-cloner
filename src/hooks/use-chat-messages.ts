import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Message, Source } from '@/types/chat';

export function useChatMessages() {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: ['chat-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map((msg): Message => ({
        id: msg.id,
        content: msg.content,
        type: msg.type,
        status: msg.status,
        language: msg.language === 'en' ? 'en' : 'no',
        sources: msg.sources as Source[] | undefined,
        created_at: msg.created_at,
        updated_at: msg.updated_at
      }));
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: Omit<Message, 'id' | 'updated_at'>) => {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          content: message.content,
          type: message.type,
          status: message.status,
          language: message.language,
          sources: message.sources,
          created_at: message.created_at
        }]);

      if (error) throw error;
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