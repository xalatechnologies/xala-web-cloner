import { serve } from 'std/http/server.ts'
import { OpenAI } from 'openai'
import { DocumentVectorizer } from './utils/vectorize';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, language = 'en' } = await req.json()

    // Initialize document vectorizer
    const vectorizer = new DocumentVectorizer(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
      Deno.env.get('OPENAI_API_KEY') || ''
    )

    // Get relevant context from vectorized documents
    const lastUserMessage = messages[messages.length - 1].content
    const relevantDocs = await vectorizer.semanticSearch(lastUserMessage, 3)
    
    // Create context from relevant documents
    const context = relevantDocs
      .map(doc => `${doc.content}\n`)
      .join('\n')

    const augmentedMessages: Message[] = [
      {
        role: 'system',
        content: `You are an expert AI consultant for Xala Technologies. Use the following relevant context from our company documents to inform your responses:\n\n${context}\n\nWhen responding:\n1. Be professional and knowledgeable\n2. Reference specific examples from the context when relevant\n3. Always provide clear next steps\n4. Include appropriate contact information`
      },
      ...messages
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: augmentedMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    const { choices } = await response.json()

    return new Response(
      JSON.stringify({ response: choices[0].message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
