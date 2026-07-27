# Email Integration Process

## Superseded

Supabase has been removed from the project. The contact form no longer uses an Edge Function, database trigger, or Resend — it opens a `mailto:info@xala.no` link and lets the visitor's mail client send it. The process below is kept for history only.

## Overview
Implement email sending functionality for contact form submissions using Supabase Edge Functions and database triggers.

## Components

### 1. Edge Function
- Located in `supabase/functions/contact-notification/index.ts`
- Handles email sending via Resend API
- Triggered by database inserts
- Includes error handling and logging

### 2. Database Trigger
- Located in `supabase/migrations/20240219_contact_notification_trigger.sql`
- Triggers on contact form submissions
- Uses HTTP extension to call Edge Function
- Secure implementation with proper error handling

### 3. Configuration Table
- Located in `supabase/migrations/20240219_config_table.sql`
- Stores Edge Function configuration
- Includes URL and authentication key
- Automatic timestamp management

## Implementation Steps

1. Create Edge Function
```typescript
// supabase/functions/contact-notification/index.ts
serve(async (req) => {
  // Handle webhook request
  // Send email via Resend
  // Return response
})
```

2. Set Up Database Trigger
```sql
-- Create webhook function
create function public.handle_contact_notification()
returns trigger as $$
  -- Make HTTP request to Edge Function
$$ language plpgsql;

-- Create trigger
create trigger contact_notification_trigger
  after insert on public.contact_submissions
  for each row
  execute function public.handle_contact_notification();
```

3. Configure Environment Variables
- Set in Supabase Dashboard:
  - `RESEND_API_KEY`: Resend API key
  - `ADMIN_EMAIL`: Notification recipient email
  - `SUPABASE_URL`: Project URL
  - `SUPABASE_SERVICE_ROLE_KEY`: Service role key

4. Deploy Components
```bash
# Deploy Edge Function
supabase functions deploy contact-notification

# Apply database migrations
supabase db push
```

## Security Considerations
- Edge Function uses service role key
- Database trigger runs with security definer
- Configuration stored securely
- Proper error handling and logging
- Rate limiting on Edge Function

## Testing
1. Submit contact form
2. Verify database insert
3. Check Edge Function logs
4. Confirm email delivery
5. Test error scenarios

## Monitoring
- Monitor Edge Function execution
- Track email delivery rates
- Check for errors in logs
- Monitor database trigger performance

## Troubleshooting
1. Check Edge Function logs
2. Verify database trigger execution
3. Confirm configuration values
4. Test email delivery manually
5. Check rate limits and quotas 