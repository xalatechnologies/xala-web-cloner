import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Message, Source } from '@/types/chat';
import type { Json } from '@/integrations/supabase/types';

export function useChatMessages() {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['chat-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map(msg => ({
        ...msg,
        sources: msg.sources ? (msg.sources as unknown as Source[]) : []
      })) as Message[];
    }
  });

  const { mutateAsync: addMessage } = useMutation({
    mutationFn: async (message: Message) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          content: message.content,
          type: message.type,
          status: message.status,
          language: message.language,
          sources: message.sources as unknown as Json,
          created_at: message.created_at
        }])
        .select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    }
  });

  return {
    messages,
    isLoading,
    addMessage
  };
}