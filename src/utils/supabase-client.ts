import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
  'https://ttvpsjeucewnenjevfhh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dnBzamV1Y2V3bmVuamV2ZmhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNzEwNjcsImV4cCI6MjAyMTk0NzA2N30.Uu_nTZZvNDXXBp9zxHPXKmGRVEQjQQtTuGYYXqzrMXc'
);
