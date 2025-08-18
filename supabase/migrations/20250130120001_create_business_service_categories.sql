-- Create Business Service Categories Table
-- 
-- This migration creates the business_service_categories table for storing
-- business-focused service presentation inspired by Proventus approach.
-- 
-- IMPORTANT: This is an additive-only migration that preserves all existing data

-- Create business_service_categories table
CREATE TABLE IF NOT EXISTS business_service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Service identification and presentation
    service_name TEXT NOT NULL,
    customer_challenge TEXT NOT NULL,
    business_outcome TEXT NOT NULL,
    technical_solution TEXT NOT NULL,
    
    -- Success metrics (stored as JSONB for flexibility)
    success_metrics JSONB NOT NULL DEFAULT '{}',
    
    -- Business information
    typical_timeline TEXT NOT NULL,
    investment_range TEXT NOT NULL,
    
    -- Relationships and ordering
    related_case_studies UUID[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0 CHECK (display_order >= 0),
    
    -- Presentation and categorization
    icon_name TEXT,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    target_industries TEXT[] DEFAULT '{}',
    
    -- Status and publication
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    content_language TEXT DEFAULT 'both' CHECK (content_language IN ('no', 'en', 'both')),
    slug TEXT UNIQUE,
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_business_service_categories_display_order 
    ON business_service_categories(display_order ASC, service_name);

CREATE INDEX IF NOT EXISTS idx_business_service_categories_active 
    ON business_service_categories(active, display_order ASC);

CREATE INDEX IF NOT EXISTS idx_business_service_categories_featured 
    ON business_service_categories(featured, display_order ASC) 
    WHERE featured = true;

CREATE INDEX IF NOT EXISTS idx_business_service_categories_content_language 
    ON business_service_categories(content_language);

CREATE INDEX IF NOT EXISTS idx_business_service_categories_slug 
    ON business_service_categories(slug) 
    WHERE slug IS NOT NULL;

-- Create GIN indexes for array fields
CREATE INDEX IF NOT EXISTS idx_business_service_categories_target_industries_gin 
    ON business_service_categories USING GIN (target_industries);

CREATE INDEX IF NOT EXISTS idx_business_service_categories_related_case_studies_gin 
    ON business_service_categories USING GIN (related_case_studies);

-- Create GIN index for JSONB success_metrics
CREATE INDEX IF NOT EXISTS idx_business_service_categories_success_metrics_gin 
    ON business_service_categories USING GIN (success_metrics);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_business_service_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic updated_at updates
CREATE TRIGGER trigger_business_service_categories_updated_at
    BEFORE UPDATE ON business_service_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_business_service_categories_updated_at();

-- Row Level Security (RLS) policies
ALTER TABLE business_service_categories ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to active services
CREATE POLICY "Public can view active business service categories" 
    ON business_service_categories FOR SELECT 
    USING (active = true);

-- Policy: Allow authenticated users to view all services (for admin)
CREATE POLICY "Authenticated users can view all business service categories" 
    ON business_service_categories FOR SELECT 
    TO authenticated 
    USING (true);

-- Policy: Allow authenticated users to insert services
CREATE POLICY "Authenticated users can insert business service categories" 
    ON business_service_categories FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- Policy: Allow authenticated users to update services
CREATE POLICY "Authenticated users can update business service categories" 
    ON business_service_categories FOR UPDATE 
    TO authenticated 
    USING (true);

-- Policy: Allow authenticated users to delete services
CREATE POLICY "Authenticated users can delete business service categories" 
    ON business_service_categories FOR DELETE 
    TO authenticated 
    USING (true);

-- Add helpful comments for documentation
COMMENT ON TABLE business_service_categories IS 'Business-focused service presentation mapping to existing technical services with business positioning';
COMMENT ON COLUMN business_service_categories.success_metrics IS 'JSONB field storing how success is measured for this service category';
COMMENT ON COLUMN business_service_categories.display_order IS 'Lower values appear higher in navigation (0 = top)';
COMMENT ON COLUMN business_service_categories.related_case_studies IS 'Array of business_impact_stories UUIDs demonstrating this service';
COMMENT ON COLUMN business_service_categories.content_language IS 'Language support: no (Norwegian), en (English), both (bilingual)';

-- Insert sample service categories based on Proventus-inspired approach
INSERT INTO business_service_categories (
    service_name,
    customer_challenge,
    business_outcome,
    technical_solution,
    success_metrics,
    typical_timeline,
    investment_range,
    short_description,
    long_description,
    target_industries,
    display_order,
    featured,
    active,
    content_language,
    slug,
    icon_name
) VALUES 
(
    'Digital Transformation',
    'Legacy systems limiting business growth and efficiency',
    'Modernized infrastructure enabling rapid scaling and improved customer experience',
    'Cloud migration, API modernization, and user experience enhancement using React, Azure, and modern DevOps practices',
    '{"typical_improvements": {"efficiency": 40, "cost_reduction": 30, "customer_satisfaction": 50}}',
    '3-8 months',
    '500,000 - 2,000,000 NOK',
    'Transform legacy systems into modern, scalable solutions',
    'Comprehensive digital transformation services that modernize your technology infrastructure while preserving business continuity. We specialize in migrating legacy systems to cloud-native architectures with improved user experiences.',
    ARRAY['Public Sector', 'Financial Services', 'Healthcare'],
    1,
    true,
    true,
    'both',
    'digital-transformation',
    'cloud'
),
(
    'AI & Intelligent Automation',
    'Manual processes consuming resources and creating bottlenecks',
    'Automated workflows reducing operational costs and improving accuracy',
    'Custom AI solutions, process automation, and intelligent data analysis using machine learning and advanced analytics',
    '{"typical_improvements": {"processing_speed": 60, "accuracy": 80, "cost_savings": 45}}',
    '2-6 months',
    '200,000 - 1,500,000 NOK',
    'Implement AI-driven automation for operational excellence',
    'Advanced AI and automation solutions that streamline business processes, reduce manual work, and provide intelligent insights for better decision-making.',
    ARRAY['Manufacturing', 'Logistics', 'Professional Services'],
    2,
    true,
    true,
    'both',
    'ai-automation',
    'cpu'
),
(
    'Enterprise Integration & APIs',
    'Disconnected systems creating data silos and inefficiencies',
    'Unified data ecosystem enabling seamless information flow and better insights',
    'RESTful API development, microservices architecture, and enterprise service bus implementation',
    '{"typical_improvements": {"data_accessibility": 70, "system_reliability": 50, "integration_speed": 65}}',
    '2-5 months',
    '300,000 - 1,200,000 NOK',
    'Connect and unify your business systems',
    'Enterprise-grade integration solutions that connect disparate systems, enabling seamless data flow and improved business intelligence across your organization.',
    ARRAY['Enterprise', 'Public Sector', 'Healthcare'],
    3,
    false,
    true,
    'both',
    'enterprise-integration',
    'link'
),
(
    'Modern Web Applications',
    'Outdated web presence limiting customer engagement and business growth',
    'Enhanced digital presence driving customer acquisition and retention',
    'Progressive web applications using React, TypeScript, and modern UX/UI design principles',
    '{"typical_improvements": {"user_engagement": 55, "conversion_rate": 35, "mobile_usage": 80}}',
    '1-4 months',
    '150,000 - 800,000 NOK',
    'Build engaging, high-performance web applications',
    'Modern web applications that provide exceptional user experiences across all devices, driving customer engagement and business growth through innovative design and technology.',
    ARRAY['E-commerce', 'Professional Services', 'Technology'],
    4,
    false,
    true,
    'both',
    'web-applications',
    'globe'
) ON CONFLICT (slug) DO NOTHING;

-- Create enhanced_client_testimonials table for extended testimonial functionality
CREATE TABLE IF NOT EXISTS enhanced_client_testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationship to business impact story
    story_id UUID REFERENCES business_impact_stories(id) ON DELETE CASCADE,
    
    -- Client information
    client_name TEXT NOT NULL,
    client_title TEXT NOT NULL,
    client_company TEXT NOT NULL,
    
    -- Testimonial content
    testimonial_text TEXT NOT NULL,
    impact_focus TEXT CHECK (impact_focus IN ('cost_savings', 'efficiency', 'innovation', 'growth', 'transformation')),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    
    -- Media
    video_url TEXT,
    client_photo_url TEXT,
    
    -- Publication status
    approved_for_publication BOOLEAN DEFAULT false,
    content_language TEXT DEFAULT 'both' CHECK (content_language IN ('no', 'en', 'both')),
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for testimonials
CREATE INDEX IF NOT EXISTS idx_enhanced_client_testimonials_story_id 
    ON enhanced_client_testimonials(story_id);

CREATE INDEX IF NOT EXISTS idx_enhanced_client_testimonials_approved 
    ON enhanced_client_testimonials(approved_for_publication, rating DESC);

CREATE INDEX IF NOT EXISTS idx_enhanced_client_testimonials_impact_focus 
    ON enhanced_client_testimonials(impact_focus);

-- RLS for testimonials
ALTER TABLE enhanced_client_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved testimonials" 
    ON enhanced_client_testimonials FOR SELECT 
    USING (approved_for_publication = true);

CREATE POLICY "Authenticated users can manage testimonials" 
    ON enhanced_client_testimonials FOR ALL 
    TO authenticated 
    USING (true);

COMMENT ON TABLE enhanced_client_testimonials IS 'Extended client testimonials with business impact focus and media support';
