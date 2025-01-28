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
      // First save the user message
      const { error: saveError } = await supabase
        .from('chat_messages')
        .insert([{
          id: message.id,
          content: message.content,
          type: message.type,
          status: message.status,
          language: message.language,
          created_at: message.created_at
        }]);

      if (saveError) throw saveError;

      // Then get AI response
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('chat-ai', {
        body: {
          message: message.content,
          language: message.language,
          context: 'Xala Technologies is a technology consulting company specializing in custom software development, AI solutions, and digital transformation.'
        }
      });

      if (aiError) throw aiError;

      console.log('AI Response:', aiResponse);

      // Save AI response
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: aiResponse.message,
        type: 'assistant',
        status: 'sent',
        language: message.language,
        created_at: new Date().toISOString()
      };

      const { error: saveAiError } = await supabase
        .from('chat_messages')
        .insert([{
          id: aiMessage.id,
          content: aiMessage.content,
          type: aiMessage.type,
          status: aiMessage.status,
          language: aiMessage.language,
          created_at: aiMessage.created_at
        }]);

      if (saveAiError) throw saveAiError;

      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    },
  });

  return {
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error as Error,
    sendMessage: sendMessageMutation.mutate,
  };
}