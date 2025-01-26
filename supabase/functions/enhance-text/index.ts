import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, type, language } = await req.json()

    const openai = new OpenAIApi(new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY')
    }))

    const languageContext = language === 'no' ? 
      "Respond in Norwegian (Bokmål). Use a professional and modern tone suitable for a technology company website." :
      "Respond in English. Use a professional and modern tone suitable for a technology company website."

    const prompt = `${languageContext}
    
    You are helping enhance website content for a technology consulting company. 
    The text is a ${type}. Please improve it while maintaining its core meaning and intent.
    Make it more engaging and professional, optimizing for clarity and impact.
    
    Original text: "${text}"
    
    Enhanced version:`

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    })

    const enhancedText = completion.data.choices[0].message?.content?.trim()

    return new Response(
      JSON.stringify({ enhancedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})