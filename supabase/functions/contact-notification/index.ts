import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'info@xala.no'

serve(async (req) => {
  console.log('🚀 Contact notification function triggered')
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    console.log('✅ Supabase client initialized')

    // Get the payload from the request
    const payload = await req.json()
    const { record, type } = payload
    console.log('📝 Received payload:', { type, recordId: record?.id })

    // Only process insert events
    if (type !== 'INSERT') {
      console.log('⏭️ Skipping non-insert event')
      return new Response(JSON.stringify({ message: 'Not an insert event' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Send email using Resend
    console.log('📧 Sending email to:', adminEmail)
    const emailResponse = await resend.emails.send({
      from: adminEmail,
      to: adminEmail,
      subject: `New Contact Form Submission: ${record.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${record.name} (${record.email})</p>
          <p><strong>Subject:</strong> ${record.subject}</p>
          <p><strong>Language:</strong> ${record.language}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="white-space: pre-wrap;">${record.message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Submitted at: ${new Date(record.created_at).toLocaleString()}
          </p>
        </div>
      `,
    })
    console.log('✅ Email sent successfully:', emailResponse)

    return new Response(
      JSON.stringify({ message: 'Email sent successfully', id: emailResponse.id }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('❌ Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process webhook', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}) 