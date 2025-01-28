import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { OpenAI } from 'https://esm.sh/openai@4.26.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    const { message, language, context } = await req.json()

    console.log('Processing request:', { language, messageLength: message?.length })

    // Set language-specific system message
    const systemMessage = language === 'no'
      ? `Du er en AI-assistent for Xala Technologies. Svar alltid på norsk. Bruk denne konteksten for å svare på spørsmål:\n\n${context}`
      : `You are an AI assistant for Xala Technologies. Use this context to answer questions:\n\n${context}`

    console.log('Sending request to OpenAI')

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the recommended model instead of gpt-4-turbo-preview
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    console.log('Received response from OpenAI')

    const responseMessage = completion.choices[0].message.content || (
      language === 'no'
        ? 'Beklager, jeg kunne ikke generere et svar.'
        : 'I apologize, but I was unable to generate a response.'
    )

    return new Response(
      JSON.stringify({ message: responseMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred processing your request.' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})