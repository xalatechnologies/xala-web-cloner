import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Message, Source } from '@/types/chat';

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

      return data.map(msg => ({
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
          language: message.language,
          sources: message.sources ? JSON.stringify(message.sources) : null,
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