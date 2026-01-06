-- Create Business Impact Stories Table
-- 
-- This migration creates the business_impact_stories table for storing
-- quantifiable client success stories and business impact metrics.
-- 
-- IMPORTANT: This is an additive-only migration that preserves all existing data

-- Create business_impact_stories table
CREATE TABLE IF NOT EXISTS business_impact_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Client and project information
    client_name TEXT NOT NULL,
    project_title TEXT NOT NULL,
    business_challenge TEXT NOT NULL,
    solution_approach TEXT NOT NULL,
    
    -- Business metrics (stored as JSONB for flexibility)
    quantifiable_results JSONB NOT NULL DEFAULT '{}',
    
    -- Project details
    project_duration TEXT NOT NULL,
    technology_stack TEXT[] DEFAULT '{}',
    testimonial_quote TEXT,
    
    -- Display and categorization
    display_priority INTEGER DEFAULT 0 CHECK (display_priority >= 0 AND display_priority <= 100),
    industry_sector TEXT,
    project_scale TEXT CHECK (project_scale IN ('small', 'medium', 'large', 'enterprise')),
    
    -- Publication and content management
    published BOOLEAN DEFAULT false,
    content_language TEXT DEFAULT 'both' CHECK (content_language IN ('no', 'en', 'both')),
    slug TEXT UNIQUE,
    featured_image_url TEXT,
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_business_impact_stories_client_name 
    ON business_impact_stories(client_name);

CREATE INDEX IF NOT EXISTS idx_business_impact_stories_display_priority 
    ON business_impact_stories(display_priority DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_business_impact_stories_published 
    ON business_impact_stories(published, display_priority DESC);

CREATE INDEX IF NOT EXISTS idx_business_impact_stories_industry 
    ON business_impact_stories(industry_sector) 
    WHERE industry_sector IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_business_impact_stories_project_scale 
    ON business_impact_stories(project_scale) 
    WHERE project_scale IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_business_impact_stories_content_language 
    ON business_impact_stories(content_language);

CREATE INDEX IF NOT EXISTS idx_business_impact_stories_slug 
    ON business_impact_stories(slug) 
    WHERE slug IS NOT NULL;

-- Create GIN index for JSONB quantifiable_results for efficient queries
CREATE INDEX IF NOT EXISTS idx_business_impact_stories_quantifiable_results_gin 
    ON business_impact_stories USING GIN (quantifiable_results);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_business_impact_stories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic updated_at updates
CREATE TRIGGER trigger_business_impact_stories_updated_at
    BEFORE UPDATE ON business_impact_stories
    FOR EACH ROW
    EXECUTE FUNCTION update_business_impact_stories_updated_at();

-- Row Level Security (RLS) policies
ALTER TABLE business_impact_stories ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published stories
CREATE POLICY "Public can view published business impact stories" 
    ON business_impact_stories FOR SELECT 
    USING (published = true);

-- Policy: Allow authenticated users to view all stories (for admin)
CREATE POLICY "Authenticated users can view all business impact stories" 
    ON business_impact_stories FOR SELECT 
    TO authenticated 
    USING (true);

-- Policy: Allow authenticated users to insert stories
CREATE POLICY "Authenticated users can insert business impact stories" 
    ON business_impact_stories FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- Policy: Allow authenticated users to update stories
CREATE POLICY "Authenticated users can update business impact stories" 
    ON business_impact_stories FOR UPDATE 
    TO authenticated 
    USING (true);

-- Policy: Allow authenticated users to delete stories
CREATE POLICY "Authenticated users can delete business impact stories" 
    ON business_impact_stories FOR DELETE 
    TO authenticated 
    USING (true);

-- Add helpful comments for documentation
COMMENT ON TABLE business_impact_stories IS 'Stores quantifiable client success stories and business impact metrics for showcase on website';
COMMENT ON COLUMN business_impact_stories.quantifiable_results IS 'JSONB field storing business metrics like cost savings, efficiency gains, etc.';
COMMENT ON COLUMN business_impact_stories.display_priority IS 'Higher values appear more prominently (0-100 scale)';
COMMENT ON COLUMN business_impact_stories.content_language IS 'Language support: no (Norwegian), en (English), both (bilingual)';
COMMENT ON COLUMN business_impact_stories.slug IS 'SEO-friendly URL slug for individual case study pages';

-- Insert sample data for testing (can be removed in production)
INSERT INTO business_impact_stories (
    client_name,
    project_title,
    business_challenge,
    solution_approach,
    quantifiable_results,
    project_duration,
    technology_stack,
    testimonial_quote,
    display_priority,
    industry_sector,
    project_scale,
    published,
    content_language,
    slug
) VALUES (
    'Altinn',
    'Digital Transformation Platform Enhancement',
    'Need for improved citizen services platform with enhanced user experience and performance',
    'Implemented modern React-based frontend with improved UX/UI design and performance optimization',
    '{"percentage_improvements": {"user_satisfaction": 40, "processing_speed": 60}, "cost_savings": {"amount": 500000, "currency": "NOK", "period": "annually"}}',
    '6 months',
    ARRAY['React', 'TypeScript', 'Azure', 'API Integration'],
    'The new platform significantly improved our citizen service delivery and reduced processing times.',
    95,
    'Public Sector',
    'enterprise',
    true,
    'both',
    'altinn-digital-transformation'
),
(
    'NHN',
    'Healthcare Integration Modernization',
    'Legacy healthcare systems needed modernization for better interoperability and security',
    'Developed secure integration platform with modern API architecture and enhanced data protection',
    '{"percentage_improvements": {"system_reliability": 50, "security_compliance": 80}, "time_savings": {"amount": 2, "unit": "hours", "period": "per transaction"}}',
    '8 months',
    ARRAY['Node.js', 'PostgreSQL', 'Azure', 'Security Protocols'],
    'Xala delivered a robust solution that transformed our healthcare data integration capabilities.',
    90,
    'Healthcare',
    'enterprise',
    true,
    'both',
    'nhn-healthcare-integration'
) ON CONFLICT (slug) DO NOTHING;
