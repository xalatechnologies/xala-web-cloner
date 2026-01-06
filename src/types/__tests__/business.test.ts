/**
 * Business Types Unit Tests
 * 
 * Tests for business content type definitions, validation, and utility functions.
 */

import { describe, it, expect } from 'vitest';
import { 
  BusinessDataValidator, 
  BusinessContentUtils,
  type BusinessImpactStory,
  type BusinessServiceCategory,
  type BusinessMetrics 
} from '../business';

describe('BusinessDataValidator', () => {
  describe('validateBusinessImpactStory', () => {
    it('should validate a complete business impact story', () => {
      const story: Partial<BusinessImpactStory> = {
        client_name: 'Test Client',
        project_title: 'Test Project',
        business_challenge: 'Test challenge description',
        solution_approach: 'Test solution approach',
        quantifiable_results: {
          percentage_improvements: { efficiency: 40 },
          cost_savings: { amount: 100000, currency: 'NOK', period: 'annually' }
        },
        display_priority: 85
      };

      const result = BusinessDataValidator.validateBusinessImpactStory(story);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', () => {
      const story: Partial<BusinessImpactStory> = {
        client_name: '',
        project_title: 'Test Project'
        // Missing business_challenge and solution_approach
      };

      const result = BusinessDataValidator.validateBusinessImpactStory(story);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Client name is required');
      expect(result.errors).toContain('Business challenge is required');
      expect(result.errors).toContain('Solution approach is required');
    });

    it('should fail validation for invalid display priority', () => {
      const story: Partial<BusinessImpactStory> = {
        client_name: 'Test Client',
        project_title: 'Test Project',
        business_challenge: 'Test challenge',
        solution_approach: 'Test solution',
        quantifiable_results: {},
        display_priority: 150 // Invalid: should be 0-100
      };

      const result = BusinessDataValidator.validateBusinessImpactStory(story);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Display priority must be between 0 and 100');
    });

    it('should fail validation for invalid technology stack', () => {
      const story: Partial<BusinessImpactStory> = {
        client_name: 'Test Client',
        project_title: 'Test Project',
        business_challenge: 'Test challenge',
        solution_approach: 'Test solution',
        quantifiable_results: {},
        technology_stack: 'invalid' as unknown as string[] // Should be array
      };

      const result = BusinessDataValidator.validateBusinessImpactStory(story);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Technology stack must be an array');
    });
  });

  describe('validateBusinessServiceCategory', () => {
    it('should validate a complete business service category', () => {
      const category: Partial<BusinessServiceCategory> = {
        service_name: 'Digital Transformation',
        customer_challenge: 'Legacy systems limiting growth',
        business_outcome: 'Modernized infrastructure',
        short_description: 'Transform legacy systems',
        display_order: 1
      };

      const result = BusinessDataValidator.validateBusinessServiceCategory(category);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', () => {
      const category: Partial<BusinessServiceCategory> = {
        service_name: '',
        customer_challenge: 'Test challenge'
        // Missing business_outcome and short_description
      };

      const result = BusinessDataValidator.validateBusinessServiceCategory(category);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Service name is required');
      expect(result.errors).toContain('Business outcome is required');
      expect(result.errors).toContain('Short description is required');
    });

    it('should fail validation for negative display order', () => {
      const category: Partial<BusinessServiceCategory> = {
        service_name: 'Test Service',
        customer_challenge: 'Test challenge',
        business_outcome: 'Test outcome',
        short_description: 'Test description',
        display_order: -1 // Invalid: should be non-negative
      };

      const result = BusinessDataValidator.validateBusinessServiceCategory(category);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Display order must be non-negative');
    });

    it('should fail validation for invalid related case studies', () => {
      const category: Partial<BusinessServiceCategory> = {
        service_name: 'Test Service',
        customer_challenge: 'Test challenge',
        business_outcome: 'Test outcome',
        short_description: 'Test description',
        related_case_studies: 'invalid' as unknown as string[] // Should be array
      };

      const result = BusinessDataValidator.validateBusinessServiceCategory(category);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Related case studies must be an array');
    });
  });

  describe('validateBusinessMetrics', () => {
    it('should validate valid business metrics', () => {
      const metrics: BusinessMetrics = {
        percentage_improvements: { efficiency: 40, accuracy: 80 },
        cost_savings: { amount: 500000, currency: 'NOK', period: 'annually' },
        time_savings: { amount: 2, unit: 'hours', period: 'per transaction' }
      };

      const result = BusinessDataValidator.validateBusinessMetrics(metrics);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for invalid percentage improvements', () => {
      const metrics: BusinessMetrics = {
        percentage_improvements: { efficiency: -10, accuracy: 1500 } // Invalid values
      };

      const result = BusinessDataValidator.validateBusinessMetrics(metrics);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid percentage improvement for efficiency: must be between 0 and 1000');
      expect(result.errors).toContain('Invalid percentage improvement for accuracy: must be between 0 and 1000');
    });

    it('should fail validation for invalid cost savings', () => {
      const metrics: BusinessMetrics = {
        cost_savings: { amount: -1000, currency: '', period: 'annually' }
      };

      const result = BusinessDataValidator.validateBusinessMetrics(metrics);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Cost savings amount must be a positive number');
      expect(result.errors).toContain('Cost savings currency is required');
    });

    it('should fail validation for invalid time savings', () => {
      const metrics: BusinessMetrics = {
        time_savings: { amount: -5, unit: 'hours', period: 'daily' }
      };

      const result = BusinessDataValidator.validateBusinessMetrics(metrics);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Time savings amount must be a positive number');
    });
  });
});

describe('BusinessContentUtils', () => {
  describe('generateSlug', () => {
    it('should generate SEO-friendly slugs', () => {
      expect(BusinessContentUtils.generateSlug('Digital Transformation Project')).toBe('digital-transformation-project');
      expect(BusinessContentUtils.generateSlug('AI & Machine Learning Solution')).toBe('ai-machine-learning-solution');
      expect(BusinessContentUtils.generateSlug('Healthcare Integration - Phase 2')).toBe('healthcare-integration-phase-2');
    });

    it('should handle edge cases', () => {
      expect(BusinessContentUtils.generateSlug('')).toBe('');
      expect(BusinessContentUtils.generateSlug('   ')).toBe('');
      expect(BusinessContentUtils.generateSlug('Multiple---Hyphens')).toBe('multiple-hyphens');
      expect(BusinessContentUtils.generateSlug('Special!@#$%Characters')).toBe('specialcharacters');
    });

    it('should handle Norwegian characters', () => {
      expect(BusinessContentUtils.generateSlug('Norsk Løsning med Æ Ø Å')).toBe('norsk-losning-med');
    });
  });

  describe('formatMetricsForDisplay', () => {
    it('should format percentage improvements', () => {
      const metrics: BusinessMetrics = {
        percentage_improvements: { efficiency: 40, accuracy: 85 }
      };

      const formatted = BusinessContentUtils.formatMetricsForDisplay(metrics);
      expect(formatted.efficiency).toBe('40% improvement');
      expect(formatted.accuracy).toBe('85% improvement');
    });

    it('should format cost savings', () => {
      const metrics: BusinessMetrics = {
        cost_savings: { amount: 500000, currency: 'NOK', period: 'annually' }
      };

      const formatted = BusinessContentUtils.formatMetricsForDisplay(metrics);
      expect(formatted.cost_savings).toBe('NOK 500,000 annually');
    });

    it('should format time savings', () => {
      const metrics: BusinessMetrics = {
        time_savings: { amount: 2, unit: 'hours', period: 'per transaction' }
      };

      const formatted = BusinessContentUtils.formatMetricsForDisplay(metrics);
      expect(formatted.time_savings).toBe('2 hours per transaction');
    });

    it('should handle empty metrics', () => {
      const metrics: BusinessMetrics = {};
      const formatted = BusinessContentUtils.formatMetricsForDisplay(metrics);
      expect(Object.keys(formatted)).toHaveLength(0);
    });

    it('should handle mixed metrics', () => {
      const metrics: BusinessMetrics = {
        percentage_improvements: { efficiency: 30 },
        cost_savings: { amount: 100000, currency: 'EUR', period: 'monthly' },
        time_savings: { amount: 4, unit: 'days', period: 'per project' }
      };

      const formatted = BusinessContentUtils.formatMetricsForDisplay(metrics);
      expect(formatted.efficiency).toBe('30% improvement');
      expect(formatted.cost_savings).toBe('EUR 100,000 monthly');
      expect(formatted.time_savings).toBe('4 days per project');
    });
  });
});

// Test data factories for reuse in other tests
export const createMockBusinessImpactStory = (overrides: Partial<BusinessImpactStory> = {}): BusinessImpactStory => ({
  id: 'test-story-id',
  client_name: 'Test Client',
  project_title: 'Test Project',
  business_challenge: 'Test business challenge description',
  solution_approach: 'Test solution approach description',
  quantifiable_results: {
    percentage_improvements: { efficiency: 40 },
    cost_savings: { amount: 100000, currency: 'NOK', period: 'annually' }
  },
  project_duration: '6 months',
  technology_stack: ['React', 'TypeScript', 'Supabase'],
  testimonial_quote: 'Excellent work by Xala team',
  display_priority: 80,
  industry_sector: 'Technology',
  project_scale: 'medium',
  published: true,
  content_language: 'both',
  slug: 'test-project',
  created_at: '2025-01-30T00:00:00Z',
  updated_at: '2025-01-30T00:00:00Z',
  ...overrides
});

export const createMockBusinessServiceCategory = (overrides: Partial<BusinessServiceCategory> = {}): BusinessServiceCategory => ({
  id: 'test-service-id',
  service_name: 'Test Service',
  customer_challenge: 'Test customer challenge',
  business_outcome: 'Test business outcome',
  technical_solution: 'Test technical solution',
  success_metrics: {
    percentage_improvements: { efficiency: 50 }
  },
  typical_timeline: '3-6 months',
  investment_range: '100,000 - 500,000 NOK',
  related_case_studies: [],
  display_order: 1,
  short_description: 'Test short description',
  long_description: 'Test long description',
  target_industries: ['Technology', 'Healthcare'],
  active: true,
  featured: false,
  content_language: 'both',
  slug: 'test-service',
  created_at: '2025-01-30T00:00:00Z',
  updated_at: '2025-01-30T00:00:00Z',
  ...overrides
});
