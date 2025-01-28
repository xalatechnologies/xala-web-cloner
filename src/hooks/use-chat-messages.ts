import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Message, Source } from '@/types/chat';

export function useChatMessages() {
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['chat-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map(msg => ({
        ...msg,
        sources: msg.sources as Source[] || []
      })) as Message[];
    }
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: Omit<Message, 'id'>) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([message])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    }
  });

  return { messages, sendMessage };
}