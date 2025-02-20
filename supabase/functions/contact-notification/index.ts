import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createTransport, type TransportOptions } from "npm:nodemailer";

interface ContactRecord {
  name: string;
  email: string;
  subject: string;
  message: string;
  language: 'en' | 'no';
}

interface WebhookPayload {
  type: string;
  record: ContactRecord;
}

interface EmailError extends Error {
  code?: string;
  command?: string;
  response?: string;
}

serve(async (req: Request) => {
  try {
    // Parse the incoming JSON body
    const { type, record } = await req.json() as WebhookPayload;
    const { name, email, subject, message, language } = record;

    console.log('📧 Processing contact form submission:', {
      type,
      name,
      email,
      subject,
      language,
    });

    // Initialize SMTP transport
    const transportConfig: TransportOptions = {
      host: 'send.one.com',
      port: 587,
      secure: false,
      auth: {
        user: 'website@xala.no',
        pass: Deno.env.get('SMTP_PASSWORD') || '',
      },
      debug: true,
      logger: true,
    };

    console.log('📧 Initializing SMTP transport with config:', {
      ...transportConfig,
      auth: {
        user: transportConfig.auth.user,
        pass: '***' + (transportConfig.auth.pass?.slice(-4) ?? 'none'),
      },
    });

    const transport = createTransport(transportConfig);

    // Verify SMTP connection
    console.log('📧 Verifying SMTP connection...');
    try {
      await transport.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError) {
      console.error('❌ SMTP connection verification failed:', verifyError);
      throw verifyError;
    }

    // Send admin notification email
    console.log('📧 Sending admin notification email...');
    await transport.sendMail({
      from: 'website@xala.no',
      to: 'info@xala.no',
      replyTo: email,
      subject: `New Contact Form Submission - Website: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission from Xala Website</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Language:</strong> ${language}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    console.log('✅ Admin notification email sent');

    // Send confirmation email to sender
    console.log('📧 Sending confirmation email to sender...');
    const confirmationSubject = language === 'no' 
      ? 'Bekreftelse på mottatt henvendelse - Xala'
      : 'Confirmation of Received Inquiry - Xala';

    const confirmationMessage = language === 'no'
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Takk for din henvendelse</h2>
          <p>Hei ${name},</p>
          <p>Vi bekrefter at vi har mottatt din henvendelse med følgende detaljer:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Emne:</strong> ${subject}</p>
            <p><strong>Din melding:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>Vi vil behandle din henvendelse og komme tilbake til deg så snart som mulig.</p>
          <p>Med vennlig hilsen,<br>Xala-teamet</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Your Inquiry</h2>
          <p>Hello ${name},</p>
          <p>We confirm that we have received your inquiry with the following details:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>We will process your inquiry and get back to you as soon as possible.</p>
          <p>Best regards,<br>The Xala Team</p>
        </div>
      `;

    await transport.sendMail({
      from: 'website@xala.no',
      to: email,
      subject: confirmationSubject,
      html: confirmationMessage,
    });

    console.log('✅ Sender confirmation email sent');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Emails sent successfully'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: unknown) {
    console.error('❌ Error processing contact notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : String(error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        details: errorStack
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
}); 