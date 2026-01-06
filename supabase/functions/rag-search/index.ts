import { serve } from "https://deno.land/std@0.204.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RelevantDocument {
  content: string
  type: string
  metadata: Record<string, any>
  similarity: number
}

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: corsHeaders
      })
    }

    // Get request data
    const { query, matchThreshold = 0.7, matchCount = 5 } = await req.json()

    // Validate input
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Initialize OpenAI
    const openai = new OpenAIApi(new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    }))

    // Get embedding for query
    const embeddingResponse = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: query.replace(/\n/g, ' '),
    })

    // Extract embedding from response
    const embedding = embeddingResponse.data.data[0].embedding

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false
        }
      }
    )

    // Search for similar documents
    const { data: documents, error: searchError } = await supabaseClient.rpc(
      'match_documents',
      {
        query_embedding: embedding,
        match_threshold: matchThreshold,
        match_count: matchCount,
      }
    )

    if (searchError) {
      console.error('Error finding relevant documents:', searchError)
      return new Response(
        JSON.stringify({ error: 'Failed to search documents' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Return results
    return new Response(
      JSON.stringify(documents),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
