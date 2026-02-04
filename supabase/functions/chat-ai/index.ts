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
    const body = await req.json()
    const { message: singleMessage, messages: messagesArray, language = 'en' } = body

    // Support both single message (current client) and messages array (conversation history)
    const messages: Message[] = Array.isArray(messagesArray) && messagesArray.length > 0
      ? messagesArray
      : typeof singleMessage === 'string' && singleMessage.trim()
        ? [{ role: 'user', content: singleMessage.trim() }]
        : []

    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'message or messages is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const lastUserMessage = messages[messages.length - 1].content

    // Initialize document vectorizer
    const vectorizer = new DocumentVectorizer(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
      Deno.env.get('OPENAI_API_KEY') || ''
    )

    // Get relevant context from vectorized documents (5–7 chunks for better coverage)
    const relevantDocs = await vectorizer.semanticSearch(lastUserMessage, 6)
    
    const context = relevantDocs
      .map(doc => `${doc.content}\n`)
      .join('\n')

    const isNorwegian = language === 'no' || language === 'nb' || language === 'nn'
    const contactRule = isNorwegian
      ? 'Hvis du ikke har nok informasjon i konteksten over til å svare godt, eller spørsmålet gjelder priser, tilbud eller avtaler, sier du at brukeren bør kontakte info@xala.no for å få svar.'
      : 'If you do not have enough information in the context above to answer well, or the question is about pricing, offers or contracts, tell the user they should contact info@xala.no for a response.'

    const systemContent = `You are the Xala AI assistant for Xala Technologies. Answer questions about Xala, the website, services, products and the project using the following context when relevant:\n\n${context}\n\nWhen responding:
1. Be professional and knowledgeable.
2. Use the context above when it is relevant; be clear when your answer comes from this documentation.
3. ${contactRule}`

    const augmentedMessages: Message[] = [
      { role: 'system', content: systemContent },
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

    const result = await response.json()
    const choices = result.choices
    if (!choices?.[0]?.message?.content) {
      throw new Error(result.error?.message || 'No content in OpenAI response')
    }

    return new Response(
      JSON.stringify({ message: choices[0].message.content }),
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
