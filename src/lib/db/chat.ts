import { Message } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';

export async function saveMessage(message: Message) {
  const { error } = await supabase
    .from('chat_messages')
    .insert([{
      id: message.id,
      content: message.content,
      type: message.type,
      status: message.status,
      language: message.language,
      sources: message.sources,
      created_at: message.created_at
    }]);

  if (error) throw error;
}

export async function loadMessages(limit = 50) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) throw error;

  return data.map((msg): Message => ({
    id: msg.id,
    content: msg.content,
    type: msg.type,
    status: msg.status,
    language: msg.language === 'en' ? 'en' : 'no',
    sources: msg.sources as Source[],
    created_at: msg.created_at,
    updated_at: msg.updated_at
  }));
}

export async function updateMessageStatus(id: string, status: Message['status']) {
  const { error } = await supabase
    .from('chat_messages')
    .update({ status })
    .match({ id });

  if (error) throw error;
}