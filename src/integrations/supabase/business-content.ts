/**
 * Business Content Database Access Layer
 * 
 * This file provides CRUD operations for business content tables:
 * - business_impact_stories
 * - business_service_categories  
 * - enhanced_client_testimonials
 * 
 * Follows existing Supabase client patterns and maintains API compatibility.
 */

import { supabase } from './client';
import type { 
  BusinessImpactStory, 
  BusinessServiceCategory, 
  EnhancedClientTestimonial,
  BusinessDataValidator 
} from '@/types/business';

/**
 * Business Impact Stories CRUD Operations
 */
export class BusinessImpactStoriesService {
  /**
   * Get all published business impact stories, ordered by display priority
   */
  static async getPublishedStories(options?: {
    limit?: number;
    offset?: number;
    industry?: string;
    contentLanguage?: 'no' | 'en' | 'both';
  }) {
    let query = supabase
      .from('business_impact_stories')
      .select('*')
      .eq('published', true)
      .order('display_priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (options?.industry) {
      query = query.eq('industry_sector', options.industry);
    }

    if (options?.contentLanguage && options.contentLanguage !== 'both') {
      query = query.in('content_language', [options.contentLanguage, 'both']);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch published stories: ${error.message}`);
    }

    return data as BusinessImpactStory[];
  }

  /**
   * Get all business impact stories (admin access)
   */
  static async getAllStories(options?: {
    limit?: number;
    offset?: number;
    publishedOnly?: boolean;
  }) {
    let query = supabase
      .from('business_impact_stories')
      .select('*')
      .order('display_priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (options?.publishedOnly) {
      query = query.eq('published', true);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch stories: ${error.message}`);
    }

    return data as BusinessImpactStory[];
  }

  /**
   * Get a single business impact story by ID
   */
  static async getStoryById(id: string) {
    const { data, error } = await supabase
      .from('business_impact_stories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch story: ${error.message}`);
    }

    return data as BusinessImpactStory;
  }

  /**
   * Get a business impact story by slug
   */
  static async getStoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('business_impact_stories')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      throw new Error(`Failed to fetch story by slug: ${error.message}`);
    }

    return data as BusinessImpactStory;
  }

  /**
   * Create a new business impact story
   */
  static async createStory(story: Omit<BusinessImpactStory, 'id' | 'created_at' | 'updated_at'>) {
    // Validate data before insertion
    const validation = BusinessDataValidator.validateBusinessImpactStory(story);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const { data, error } = await supabase
      .from('business_impact_stories')
      .insert(story)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create story: ${error.message}`);
    }

    return data as BusinessImpactStory;
  }

  /**
   * Update an existing business impact story
   */
  static async updateStory(id: string, updates: Partial<BusinessImpactStory>) {
    // Validate updates if they include key fields
    if (updates.quantifiable_results || updates.client_name || updates.project_title) {
      const validation = BusinessDataValidator.validateBusinessImpactStory(updates);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
    }

    const { data, error } = await supabase
      .from('business_impact_stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update story: ${error.message}`);
    }

    return data as BusinessImpactStory;
  }

  /**
   * Delete a business impact story
   */
  static async deleteStory(id: string) {
    const { error } = await supabase
      .from('business_impact_stories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete story: ${error.message}`);
    }

    return true;
  }

  /**
   * Get featured stories for homepage display
   */
  static async getFeaturedStories(limit: number = 3) {
    const { data, error } = await supabase
      .from('business_impact_stories')
      .select('*')
      .eq('published', true)
      .gte('display_priority', 80) // High priority stories
      .order('display_priority', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch featured stories: ${error.message}`);
    }

    return data as BusinessImpactStory[];
  }
}

/**
 * Business Service Categories CRUD Operations
 */
export class BusinessServiceCategoriesService {
  /**
   * Get all active business service categories, ordered by display order
   */
  static async getActiveCategories(options?: {
    featured?: boolean;
    contentLanguage?: 'no' | 'en' | 'both';
  }) {
    let query = supabase
      .from('business_service_categories')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (options?.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }

    if (options?.contentLanguage && options.contentLanguage !== 'both') {
      query = query.in('content_language', [options.contentLanguage, 'both']);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch service categories: ${error.message}`);
    }

    return data as BusinessServiceCategory[];
  }

  /**
   * Get all business service categories (admin access)
   */
  static async getAllCategories() {
    const { data, error } = await supabase
      .from('business_service_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch all service categories: ${error.message}`);
    }

    return data as BusinessServiceCategory[];
  }

  /**
   * Get a single business service category by ID
   */
  static async getCategoryById(id: string) {
    const { data, error } = await supabase
      .from('business_service_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch service category: ${error.message}`);
    }

    return data as BusinessServiceCategory;
  }

  /**
   * Get a business service category by slug
   */
  static async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('business_service_categories')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (error) {
      throw new Error(`Failed to fetch service category by slug: ${error.message}`);
    }

    return data as BusinessServiceCategory;
  }

  /**
   * Create a new business service category
   */
  static async createCategory(category: Omit<BusinessServiceCategory, 'id' | 'created_at' | 'updated_at'>) {
    // Validate data before insertion
    const validation = BusinessDataValidator.validateBusinessServiceCategory(category);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const { data, error } = await supabase
      .from('business_service_categories')
      .insert(category)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create service category: ${error.message}`);
    }

    return data as BusinessServiceCategory;
  }

  /**
   * Update an existing business service category
   */
  static async updateCategory(id: string, updates: Partial<BusinessServiceCategory>) {
    // Validate updates if they include key fields
    if (updates.service_name || updates.customer_challenge || updates.business_outcome) {
      const validation = BusinessDataValidator.validateBusinessServiceCategory(updates);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
    }

    const { data, error } = await supabase
      .from('business_service_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update service category: ${error.message}`);
    }

    return data as BusinessServiceCategory;
  }

  /**
   * Delete a business service category
   */
  static async deleteCategory(id: string) {
    const { error } = await supabase
      .from('business_service_categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete service category: ${error.message}`);
    }

    return true;
  }

  /**
   * Get featured service categories for homepage
   */
  static async getFeaturedCategories() {
    const { data, error } = await supabase
      .from('business_service_categories')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .order('display_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch featured service categories: ${error.message}`);
    }

    return data as BusinessServiceCategory[];
  }

  /**
   * Get related case studies for a service category
   */
  static async getRelatedCaseStudies(categoryId: string) {
    // First get the category to access related_case_studies array
    const category = await this.getCategoryById(categoryId);
    
    if (!category.related_case_studies || category.related_case_studies.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from('business_impact_stories')
      .select('*')
      .in('id', category.related_case_studies)
      .eq('published', true)
      .order('display_priority', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch related case studies: ${error.message}`);
    }

    return data as BusinessImpactStory[];
  }
}

/**
 * Enhanced Client Testimonials CRUD Operations
 */
export class EnhancedTestimonialsService {
  /**
   * Get approved testimonials for public display
   */
  static async getApprovedTestimonials(options?: {
    storyId?: string;
    impactFocus?: string;
    limit?: number;
  }) {
    let query = supabase
      .from('enhanced_client_testimonials')
      .select('*')
      .eq('approved_for_publication', true)
      .order('rating', { ascending: false })
      .order('created_at', { ascending: false });

    if (options?.storyId) {
      query = query.eq('story_id', options.storyId);
    }

    if (options?.impactFocus) {
      query = query.eq('impact_focus', options.impactFocus);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch testimonials: ${error.message}`);
    }

    return data as EnhancedClientTestimonial[];
  }

  /**
   * Create a new testimonial
   */
  static async createTestimonial(testimonial: Omit<EnhancedClientTestimonial, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('enhanced_client_testimonials')
      .insert(testimonial)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create testimonial: ${error.message}`);
    }

    return data as EnhancedClientTestimonial;
  }

  /**
   * Update testimonial approval status
   */
  static async updateApprovalStatus(id: string, approved: boolean) {
    const { data, error } = await supabase
      .from('enhanced_client_testimonials')
      .update({ approved_for_publication: approved })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update testimonial approval: ${error.message}`);
    }

    return data as EnhancedClientTestimonial;
  }
}

/**
 * Combined business content operations
 */
export class BusinessContentService {
  /**
   * Get homepage content bundle (featured stories + services)
   */
  static async getHomepageContent(contentLanguage: 'no' | 'en' | 'both' = 'both') {
    const [featuredStories, featuredServices] = await Promise.all([
      BusinessImpactStoriesService.getFeaturedStories(3),
      BusinessServiceCategoriesService.getFeaturedCategories()
    ]);

    return {
      featuredStories: featuredStories.filter(story => 
        story.content_language === contentLanguage || story.content_language === 'both'
      ),
      featuredServices: featuredServices.filter(service => 
        service.content_language === contentLanguage || service.content_language === 'both'
      )
    };
  }

  /**
   * Search across stories and services
   */
  static async searchContent(searchTerm: string, options?: {
    contentType?: 'stories' | 'services' | 'both';
    contentLanguage?: 'no' | 'en' | 'both';
  }) {
    const results = {
      stories: [] as BusinessImpactStory[],
      services: [] as BusinessServiceCategory[]
    };

    if (options?.contentType === 'services') {
      // Search only services
      const { data } = await supabase
        .from('business_service_categories')
        .select('*')
        .eq('active', true)
        .or(`service_name.ilike.%${searchTerm}%,customer_challenge.ilike.%${searchTerm}%,business_outcome.ilike.%${searchTerm}%`);
      
      results.services = data as BusinessServiceCategory[] || [];
    } else if (options?.contentType === 'stories') {
      // Search only stories
      const { data } = await supabase
        .from('business_impact_stories')
        .select('*')
        .eq('published', true)
        .or(`project_title.ilike.%${searchTerm}%,business_challenge.ilike.%${searchTerm}%,solution_approach.ilike.%${searchTerm}%`);
      
      results.stories = data as BusinessImpactStory[] || [];
    } else {
      // Search both
      const [storiesData, servicesData] = await Promise.all([
        supabase
          .from('business_impact_stories')
          .select('*')
          .eq('published', true)
          .or(`project_title.ilike.%${searchTerm}%,business_challenge.ilike.%${searchTerm}%,solution_approach.ilike.%${searchTerm}%`),
        supabase
          .from('business_service_categories')
          .select('*')
          .eq('active', true)
          .or(`service_name.ilike.%${searchTerm}%,customer_challenge.ilike.%${searchTerm}%,business_outcome.ilike.%${searchTerm}%`)
      ]);

      results.stories = storiesData.data as BusinessImpactStory[] || [];
      results.services = servicesData.data as BusinessServiceCategory[] || [];
    }

    return results;
  }
}

// Export all services
export {
  BusinessImpactStoriesService,
  BusinessServiceCategoriesService,
  EnhancedTestimonialsService,
  BusinessContentService
};
