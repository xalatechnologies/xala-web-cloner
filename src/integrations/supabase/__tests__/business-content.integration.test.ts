/**
 * Business Content Integration Tests
 * 
 * Integration tests for Supabase operations with business content.
 * Tests CRUD operations and data validation.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  BusinessImpactStoriesService,
  BusinessServiceCategoriesService,
  BusinessContentService
} from '../business-content';
import { createMockBusinessImpactStory, createMockBusinessServiceCategory } from '@/types/__tests__/business.test';
import type { BusinessImpactStory, BusinessServiceCategory } from '@/types/business';

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(),
  select: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  eq: vi.fn(),
  in: vi.fn(),
  order: vi.fn(),
  limit: vi.fn(),
  range: vi.fn(),
  single: vi.fn(),
  gte: vi.fn(),
  or: vi.fn()
};

// Chain mock methods
Object.values(mockSupabase).forEach(method => {
  method.mockReturnValue(mockSupabase);
});

// Mock the Supabase client import
vi.mock('../client', () => ({
  supabase: mockSupabase
}));

describe('BusinessImpactStoriesService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getPublishedStories', () => {
    it('should fetch published stories with default ordering', async () => {
      const mockStories = [createMockBusinessImpactStory(), createMockBusinessImpactStory({ id: 'story-2' })];
      mockSupabase.single.mockResolvedValueOnce({ data: mockStories, error: null });

      const result = await BusinessImpactStoriesService.getPublishedStories();

      expect(mockSupabase.from).toHaveBeenCalledWith('business_impact_stories');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('published', true);
      expect(mockSupabase.order).toHaveBeenCalledWith('display_priority', { ascending: false });
    });

    it('should filter by industry when provided', async () => {
      const mockStories = [createMockBusinessImpactStory({ industry_sector: 'Healthcare' })];
      mockSupabase.single.mockResolvedValueOnce({ data: mockStories, error: null });

      await BusinessImpactStoriesService.getPublishedStories({ industry: 'Healthcare' });

      expect(mockSupabase.eq).toHaveBeenCalledWith('industry_sector', 'Healthcare');
    });

    it('should filter by content language when provided', async () => {
      const mockStories = [createMockBusinessImpactStory({ content_language: 'no' })];
      mockSupabase.single.mockResolvedValueOnce({ data: mockStories, error: null });

      await BusinessImpactStoriesService.getPublishedStories({ contentLanguage: 'no' });

      expect(mockSupabase.in).toHaveBeenCalledWith('content_language', ['no', 'both']);
    });

    it('should apply limit and offset when provided', async () => {
      const mockStories = [createMockBusinessImpactStory()];
      mockSupabase.single.mockResolvedValueOnce({ data: mockStories, error: null });

      await BusinessImpactStoriesService.getPublishedStories({ limit: 5, offset: 10 });

      expect(mockSupabase.limit).toHaveBeenCalledWith(5);
      expect(mockSupabase.range).toHaveBeenCalledWith(10, 14);
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValueOnce({ data: null, error: { message: 'Database error' } });

      await expect(BusinessImpactStoriesService.getPublishedStories()).rejects.toThrow('Failed to fetch published stories: Database error');
    });
  });

  describe('getStoryById', () => {
    it('should fetch a single story by ID', async () => {
      const mockStory = createMockBusinessImpactStory();
      mockSupabase.single.mockResolvedValueOnce({ data: mockStory, error: null });

      const result = await BusinessImpactStoriesService.getStoryById('test-id');

      expect(mockSupabase.from).toHaveBeenCalledWith('business_impact_stories');
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'test-id');
      expect(mockSupabase.single).toHaveBeenCalled();
      expect(result).toEqual(mockStory);
    });

    it('should handle not found errors', async () => {
      mockSupabase.single.mockResolvedValueOnce({ data: null, error: { message: 'No rows found' } });

      await expect(BusinessImpactStoriesService.getStoryById('nonexistent')).rejects.toThrow('Failed to fetch story: No rows found');
    });
  });

  describe('createStory', () => {
    it('should create a new story with validation', async () => {
      const newStory = createMockBusinessImpactStory();
      const { id, created_at, updated_at, ...storyData } = newStory;

      mockSupabase.single.mockResolvedValueOnce({ data: newStory, error: null });

      const result = await BusinessImpactStoriesService.createStory(storyData);

      expect(mockSupabase.from).toHaveBeenCalledWith('business_impact_stories');
      expect(mockSupabase.insert).toHaveBeenCalledWith(storyData);
      expect(mockSupabase.select).toHaveBeenCalled();
      expect(result).toEqual(newStory);
    });

    it('should fail validation for invalid data', async () => {
      const invalidStory = {
        client_name: '', // Invalid: empty required field
        project_title: 'Test',
        business_challenge: 'Test',
        solution_approach: 'Test'
      };

      await expect(BusinessImpactStoriesService.createStory(invalidStory as Omit<BusinessImpactStory, 'id' | 'created_at' | 'updated_at'>)).rejects.toThrow('Validation failed: Client name is required');
    });

    it('should handle database insertion errors', async () => {
      const newStory = createMockBusinessImpactStory();
      const { id, created_at, updated_at, ...storyData } = newStory;

      mockSupabase.single.mockResolvedValueOnce({ data: null, error: { message: 'Insert failed' } });

      await expect(BusinessImpactStoriesService.createStory(storyData)).rejects.toThrow('Failed to create story: Insert failed');
    });
  });

  describe('updateStory', () => {
    it('should update an existing story', async () => {
      const updatedStory = createMockBusinessImpactStory({ project_title: 'Updated Title' });
      const updates = { project_title: 'Updated Title' };

      mockSupabase.single.mockResolvedValueOnce({ data: updatedStory, error: null });

      const result = await BusinessImpactStoriesService.updateStory('test-id', updates);

      expect(mockSupabase.update).toHaveBeenCalledWith(updates);
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'test-id');
      expect(result).toEqual(updatedStory);
    });

    it('should validate updates when key fields are included', async () => {
      const invalidUpdates = { client_name: '' }; // Invalid: empty required field

      await expect(BusinessImpactStoriesService.updateStory('test-id', invalidUpdates)).rejects.toThrow('Validation failed: Client name is required');
    });
  });

  describe('deleteStory', () => {
    it('should delete a story', async () => {
      mockSupabase.delete.mockResolvedValueOnce({ error: null });

      const result = await BusinessImpactStoriesService.deleteStory('test-id');

      expect(mockSupabase.from).toHaveBeenCalledWith('business_impact_stories');
      expect(mockSupabase.delete).toHaveBeenCalled();
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'test-id');
      expect(result).toBe(true);
    });

    it('should handle deletion errors', async () => {
      mockSupabase.delete.mockResolvedValueOnce({ error: { message: 'Delete failed' } });

      await expect(BusinessImpactStoriesService.deleteStory('test-id')).rejects.toThrow('Failed to delete story: Delete failed');
    });
  });

  describe('getFeaturedStories', () => {
    it('should fetch high-priority published stories', async () => {
      const mockStories = [createMockBusinessImpactStory({ display_priority: 90 })];
      mockSupabase.single.mockResolvedValueOnce({ data: mockStories, error: null });

      const result = await BusinessImpactStoriesService.getFeaturedStories(3);

      expect(mockSupabase.eq).toHaveBeenCalledWith('published', true);
      expect(mockSupabase.gte).toHaveBeenCalledWith('display_priority', 80);
      expect(mockSupabase.limit).toHaveBeenCalledWith(3);
    });
  });
});

describe('BusinessServiceCategoriesService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getActiveCategories', () => {
    it('should fetch active categories ordered by display order', async () => {
      const mockCategories = [createMockBusinessServiceCategory()];
      mockSupabase.single.mockResolvedValueOnce({ data: mockCategories, error: null });

      const result = await BusinessServiceCategoriesService.getActiveCategories();

      expect(mockSupabase.from).toHaveBeenCalledWith('business_service_categories');
      expect(mockSupabase.eq).toHaveBeenCalledWith('active', true);
      expect(mockSupabase.order).toHaveBeenCalledWith('display_order', { ascending: true });
    });

    it('should filter by featured when provided', async () => {
      const mockCategories = [createMockBusinessServiceCategory({ featured: true })];
      mockSupabase.single.mockResolvedValueOnce({ data: mockCategories, error: null });

      await BusinessServiceCategoriesService.getActiveCategories({ featured: true });

      expect(mockSupabase.eq).toHaveBeenCalledWith('featured', true);
    });
  });

  describe('createCategory', () => {
    it('should create a new service category with validation', async () => {
      const newCategory = createMockBusinessServiceCategory();
      const { id, created_at, updated_at, ...categoryData } = newCategory;

      mockSupabase.single.mockResolvedValueOnce({ data: newCategory, error: null });

      const result = await BusinessServiceCategoriesService.createCategory(categoryData);

      expect(mockSupabase.insert).toHaveBeenCalledWith(categoryData);
      expect(result).toEqual(newCategory);
    });

    it('should fail validation for invalid category data', async () => {
      const invalidCategory = {
        service_name: '', // Invalid: empty required field
        customer_challenge: 'Test',
        business_outcome: 'Test',
        short_description: 'Test'
      };

      await expect(BusinessServiceCategoriesService.createCategory(invalidCategory as Omit<BusinessServiceCategory, 'id' | 'created_at' | 'updated_at'>)).rejects.toThrow('Validation failed: Service name is required');
    });
  });

  describe('getRelatedCaseStudies', () => {
    it('should fetch related case studies for a category', async () => {
      const category = createMockBusinessServiceCategory({ 
        related_case_studies: ['story-1', 'story-2'] 
      });
      const mockStories = [
        createMockBusinessImpactStory({ id: 'story-1' }),
        createMockBusinessImpactStory({ id: 'story-2' })
      ];

      // Mock getting the category first
      mockSupabase.single
        .mockResolvedValueOnce({ data: category, error: null })
        .mockResolvedValueOnce({ data: mockStories, error: null });

      const result = await BusinessServiceCategoriesService.getRelatedCaseStudies('test-category-id');

      expect(mockSupabase.in).toHaveBeenCalledWith('id', ['story-1', 'story-2']);
      expect(mockSupabase.eq).toHaveBeenCalledWith('published', true);
      expect(result).toEqual(mockStories);
    });

    it('should return empty array when no related case studies exist', async () => {
      const category = createMockBusinessServiceCategory({ related_case_studies: [] });
      
      mockSupabase.single.mockResolvedValueOnce({ data: category, error: null });

      const result = await BusinessServiceCategoriesService.getRelatedCaseStudies('test-category-id');

      expect(result).toEqual([]);
    });
  });
});

describe('BusinessContentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getHomepageContent', () => {
    it('should fetch featured stories and services for homepage', async () => {
      const mockStories = [createMockBusinessImpactStory()];
      const mockServices = [createMockBusinessServiceCategory()];

      mockSupabase.single
        .mockResolvedValueOnce({ data: mockStories, error: null })
        .mockResolvedValueOnce({ data: mockServices, error: null });

      const result = await BusinessContentService.getHomepageContent('both');

      expect(result).toEqual({
        featuredStories: mockStories,
        featuredServices: mockServices
      });
    });

    it('should filter content by language', async () => {
      const mockStories = [
        createMockBusinessImpactStory({ content_language: 'no' }),
        createMockBusinessImpactStory({ id: 'story-2', content_language: 'en' })
      ];
      const mockServices = [createMockBusinessServiceCategory({ content_language: 'no' })];

      mockSupabase.single
        .mockResolvedValueOnce({ data: mockStories, error: null })
        .mockResolvedValueOnce({ data: mockServices, error: null });

      const result = await BusinessContentService.getHomepageContent('no');

      expect(result.featuredStories).toHaveLength(1);
      expect(result.featuredStories[0].content_language).toBe('no');
      expect(result.featuredServices).toHaveLength(1);
      expect(result.featuredServices[0].content_language).toBe('no');
    });
  });

  describe('searchContent', () => {
    it('should search both stories and services by default', async () => {
      const mockStories = [createMockBusinessImpactStory()];
      const mockServices = [createMockBusinessServiceCategory()];

      mockSupabase.single
        .mockResolvedValueOnce({ data: mockStories, error: null })
        .mockResolvedValueOnce({ data: mockServices, error: null });

      const result = await BusinessContentService.searchContent('digital transformation');

      expect(mockSupabase.or).toHaveBeenCalledWith(
        'project_title.ilike.%digital transformation%,business_challenge.ilike.%digital transformation%,solution_approach.ilike.%digital transformation%'
      );
      expect(result).toEqual({
        stories: mockStories,
        services: mockServices
      });
    });

    it('should search only stories when specified', async () => {
      const mockStories = [createMockBusinessImpactStory()];
      mockSupabase.single.mockResolvedValueOnce({ data: mockStories, error: null });

      const result = await BusinessContentService.searchContent('AI', { contentType: 'stories' });

      expect(result.stories).toEqual(mockStories);
      expect(result.services).toEqual([]);
    });

    it('should search only services when specified', async () => {
      const mockServices = [createMockBusinessServiceCategory()];
      mockSupabase.single.mockResolvedValueOnce({ data: mockServices, error: null });

      const result = await BusinessContentService.searchContent('automation', { contentType: 'services' });

      expect(result.stories).toEqual([]);
      expect(result.services).toEqual(mockServices);
    });
  });
});
