import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, type, language } = await req.json()

    // Validate input
    if (!text || !type || !language) {
      console.error('Missing required parameters:', { text, type, language })
      throw new Error('Missing required parameters')
    }

    const languageContext = language === 'no' ? 
      "Respond in Norwegian (Bokmål). Use a professional and modern tone suitable for a technology company website." :
      "Respond in English. Use a professional and modern tone suitable for a technology company website."

    const prompt = `${languageContext}
    
    You are helping enhance website content for a technology consulting company. 
    The text is a ${type}. Please improve it while maintaining its core meaning and intent.
    Make it more engaging and professional, optimizing for clarity and impact.
    
    Original text: "${text}"
    
    Enhanced version:`

    console.log('Sending request to OpenAI with prompt:', prompt)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${error}`)
    }

    const data = await response.json()
    const enhancedText = data.choices[0].message.content.trim()

    console.log('Received enhanced text:', enhancedText)

    return new Response(
      JSON.stringify({ enhancedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in enhance-text function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})