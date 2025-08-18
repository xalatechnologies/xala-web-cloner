/**
 * Business Content Type Definitions
 * 
 * This file contains TypeScript interfaces for business-focused content models
 * including client success stories, service categories, and business metrics.
 * 
 * Source: Technical Architecture - Data Models section
 */

// Business metrics structure for quantifiable results
export interface BusinessMetrics {
  /** Percentage improvements (e.g., efficiency gains) */
  percentage_improvements?: Record<string, number>;
  /** Cost savings in specified currency */
  cost_savings?: {
    amount: number;
    currency: string;
    period: string; // e.g., "annually", "monthly"
  };
  /** Time savings metrics */
  time_savings?: {
    amount: number;
    unit: string; // e.g., "hours", "days", "weeks"
    period: string;
  };
  /** Performance improvements */
  performance_gains?: Record<string, number>;
  /** User adoption metrics */
  adoption_metrics?: {
    user_increase: number;
    engagement_improvement: number;
    satisfaction_score?: number;
  };
  /** Custom business-specific metrics */
  custom_metrics?: Record<string, string | number>;
}

// Validation schema for business metrics
export interface BusinessMetricsValidation {
  /** Ensures all percentage values are between 0-100 */
  validatePercentages: (metrics: BusinessMetrics) => boolean;
  /** Validates cost savings have positive amounts */
  validateCostSavings: (metrics: BusinessMetrics) => boolean;
  /** Ensures time savings are realistic */
  validateTimeSavings: (metrics: BusinessMetrics) => boolean;
}

/**
 * Business Impact Story Data Model
 * 
 * Stores quantifiable client success stories and business impact metrics.
 * Extends existing client/project data without modifying current structures.
 */
export interface BusinessImpactStory {
  /** Unique identifier */
  id: string;
  
  /** References existing client data - must exist in clients table */
  client_name: string;
  
  /** Business-focused project name for marketing presentation */
  project_title: string;
  
  /** Problem solved description - customer challenge */
  business_challenge: string;
  
  /** How Xala addressed the challenge - solution approach */
  solution_approach: string;
  
  /** Quantifiable business results and metrics */
  quantifiable_results: BusinessMetrics;
  
  /** Timeline information for project completion */
  project_duration: string;
  
  /** Technical implementation details as array of technologies */
  technology_stack: string[];
  
  /** Client testimonial quote for social proof */
  testimonial_quote: string;
  
  /** Display ordering for showcase (higher = more prominent) */
  display_priority: number;
  
  /** Industry or business sector for categorization */
  industry_sector?: string;
  
  /** Project size indicator (small, medium, large, enterprise) */
  project_scale?: 'small' | 'medium' | 'large' | 'enterprise';
  
  /** Publication status for content management */
  published: boolean;
  
  /** Norwegian and English content support */
  content_language: 'no' | 'en' | 'both';
  
  /** SEO-friendly slug for case study URLs */
  slug?: string;
  
  /** Featured image or visual identifier */
  featured_image_url?: string;
  
  /** Record creation timestamp */
  created_at: string;
  
  /** Last modification timestamp */
  updated_at: string;
  
  /** Created by user ID for audit trail */
  created_by?: string;
  
  /** Last updated by user ID for audit trail */
  updated_by?: string;
}

/**
 * Business Service Category Data Model
 * 
 * Business-focused service presentation inspired by Proventus approach.
 * Maps to existing technical services while adding business positioning.
 */
export interface BusinessServiceCategory {
  /** Unique identifier */
  id: string;
  
  /** Business-focused service name (not technical jargon) */
  service_name: string;
  
  /** Problem this service solves for customers */
  customer_challenge: string;
  
  /** Expected business results and outcomes */
  business_outcome: string;
  
  /** Technical implementation approach (secondary to business focus) */
  technical_solution: string;
  
  /** How success is measured for this service */
  success_metrics: BusinessMetrics;
  
  /** Typical project duration expectations */
  typical_timeline: string;
  
  /** Budget guidance for business planning */
  investment_range: string;
  
  /** Array of related BusinessImpactStory IDs */
  related_case_studies: string[];
  
  /** Navigation ordering (lower = higher in menu) */
  display_order: number;
  
  /** Service category icon or visual identifier */
  icon_name?: string;
  
  /** Short description for navigation/cards */
  short_description: string;
  
  /** Detailed service description */
  long_description: string;
  
  /** Target industries for this service */
  target_industries?: string[];
  
  /** Service availability status */
  active: boolean;
  
  /** Featured service for homepage display */
  featured: boolean;
  
  /** Norwegian and English content support */
  content_language: 'no' | 'en' | 'both';
  
  /** SEO-friendly slug for service URLs */
  slug?: string;
  
  /** Record creation timestamp */
  created_at: string;
  
  /** Last modification timestamp */
  updated_at: string;
  
  /** Created by user ID for audit trail */
  created_by?: string;
  
  /** Last updated by user ID for audit trail */
  updated_by?: string;
}

/**
 * Enhanced Client Testimonial Data Model
 * 
 * Extends basic testimonials with business impact focus
 */
export interface EnhancedClientTestimonial {
  /** Unique identifier */
  id: string;
  
  /** Reference to BusinessImpactStory */
  story_id: string;
  
  /** Client contact information */
  client_name: string;
  client_title: string;
  client_company: string;
  
  /** Testimonial content */
  testimonial_text: string;
  
  /** Business impact focus of testimonial */
  impact_focus: 'cost_savings' | 'efficiency' | 'innovation' | 'growth' | 'transformation';
  
  /** Testimonial rating (1-5 stars) */
  rating?: number;
  
  /** Video testimonial URL if available */
  video_url?: string;
  
  /** Client photo/avatar URL */
  client_photo_url?: string;
  
  /** Publication approval from client */
  approved_for_publication: boolean;
  
  /** Content language */
  content_language: 'no' | 'en' | 'both';
  
  /** Record timestamps */
  created_at: string;
  updated_at: string;
}

/**
 * Data validation utilities for business content
 */
export class BusinessDataValidator {
  /**
   * Validates BusinessImpactStory data structure
   */
  static validateBusinessImpactStory(story: Partial<BusinessImpactStory>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Required fields validation
    if (!story.client_name?.trim()) errors.push('Client name is required');
    if (!story.project_title?.trim()) errors.push('Project title is required');
    if (!story.business_challenge?.trim()) errors.push('Business challenge is required');
    if (!story.solution_approach?.trim()) errors.push('Solution approach is required');
    
    // Business metrics validation
    if (!story.quantifiable_results) {
      errors.push('Quantifiable results are required');
    } else {
      const metricsValidation = this.validateBusinessMetrics(story.quantifiable_results);
      if (!metricsValidation.valid) {
        errors.push(...metricsValidation.errors);
      }
    }
    
    // Display priority validation
    if (story.display_priority !== undefined && (story.display_priority < 0 || story.display_priority > 100)) {
      errors.push('Display priority must be between 0 and 100');
    }
    
    // Technology stack validation
    if (story.technology_stack && !Array.isArray(story.technology_stack)) {
      errors.push('Technology stack must be an array');
    }
    
    return { valid: errors.length === 0, errors };
  }
  
  /**
   * Validates BusinessServiceCategory data structure
   */
  static validateBusinessServiceCategory(category: Partial<BusinessServiceCategory>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Required fields validation
    if (!category.service_name?.trim()) errors.push('Service name is required');
    if (!category.customer_challenge?.trim()) errors.push('Customer challenge is required');
    if (!category.business_outcome?.trim()) errors.push('Business outcome is required');
    if (!category.short_description?.trim()) errors.push('Short description is required');
    
    // Display order validation
    if (category.display_order !== undefined && category.display_order < 0) {
      errors.push('Display order must be non-negative');
    }
    
    // Related case studies validation
    if (category.related_case_studies && !Array.isArray(category.related_case_studies)) {
      errors.push('Related case studies must be an array');
    }
    
    return { valid: errors.length === 0, errors };
  }
  
  /**
   * Validates business metrics structure and values
   */
  static validateBusinessMetrics(metrics: BusinessMetrics): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Percentage improvements validation
    if (metrics.percentage_improvements) {
      Object.entries(metrics.percentage_improvements).forEach(([key, value]) => {
        if (typeof value !== 'number' || value < 0 || value > 1000) {
          errors.push(`Invalid percentage improvement for ${key}: must be between 0 and 1000`);
        }
      });
    }
    
    // Cost savings validation
    if (metrics.cost_savings) {
      if (typeof metrics.cost_savings.amount !== 'number' || metrics.cost_savings.amount < 0) {
        errors.push('Cost savings amount must be a positive number');
      }
      if (!metrics.cost_savings.currency?.trim()) {
        errors.push('Cost savings currency is required');
      }
    }
    
    // Time savings validation
    if (metrics.time_savings) {
      if (typeof metrics.time_savings.amount !== 'number' || metrics.time_savings.amount < 0) {
        errors.push('Time savings amount must be a positive number');
      }
    }
    
    return { valid: errors.length === 0, errors };
  }
}

/**
 * Business content utility functions
 */
export class BusinessContentUtils {
  /**
   * Generates SEO-friendly slug from title
   */
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }
  
  /**
   * Formats business metrics for display
   */
  static formatMetricsForDisplay(metrics: BusinessMetrics): Record<string, string> {
    const formatted: Record<string, string> = {};
    
    if (metrics.percentage_improvements) {
      Object.entries(metrics.percentage_improvements).forEach(([key, value]) => {
        formatted[key] = `${value}% improvement`;
      });
    }
    
    if (metrics.cost_savings) {
      formatted['cost_savings'] = `${metrics.cost_savings.currency} ${metrics.cost_savings.amount.toLocaleString()} ${metrics.cost_savings.period}`;
    }
    
    if (metrics.time_savings) {
      formatted['time_savings'] = `${metrics.time_savings.amount} ${metrics.time_savings.unit} ${metrics.time_savings.period}`;
    }
    
    return formatted;
  }
}

// Export all types and utilities
export default {
  BusinessDataValidator,
  BusinessContentUtils,
};
