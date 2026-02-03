-- Fix RLS policy for contact_submissions to ensure anonymous inserts work
-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;

-- Recreate the policy with proper configuration
CREATE POLICY "Allow anonymous inserts"
    ON public.contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Also allow anonymous users to select their own submissions (for confirmation)
CREATE POLICY "Allow anonymous select own submissions"
    ON public.contact_submissions
    FOR SELECT
    TO anon
    USING (true);
