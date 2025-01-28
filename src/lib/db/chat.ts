import { Message } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';

export async function saveMessage(message: Message) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      id: message.id,
      content: message.content,
      type: message.type,
      status: message.status,
      sources: message.sources,
      created_at: new Date().toISOString()
    }]);

  if (error) throw error;
  return data;
}

export async function loadMessages(limit = 50) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data as Message[];
}

export async function updateMessageStatus(id: string, status: Message['status']) {
  const { data, error } = await supabase
    .from('messages')
    .update({ status })
    .match({ id });

  if (error) throw error;
  return data;
}