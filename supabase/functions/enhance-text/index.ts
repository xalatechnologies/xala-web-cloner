import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text, type } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }

    let prompt = ''
    switch (type) {
      case 'name':
        prompt = 'Format this name professionally:'
      case 'subject':
        prompt = 'Enhance this subject line to be more professional and engaging:'
      case 'message':
        prompt = 'Enhance this message to be more professional, engaging, and well-structured while maintaining the original intent:'
      default:
        prompt = 'Enhance this text to be more professional:'
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional writing assistant. Enhance the given text while maintaining its original meaning and intent. Keep the response concise and direct.'
          },
          { 
            role: 'user', 
            content: `${prompt}\n\n${text}` 
          }
        ],
      }),
    })

    const data = await response.json()
    const enhancedText = data.choices[0].message.content

    return new Response(
      JSON.stringify({ enhancedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in enhance-text function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})