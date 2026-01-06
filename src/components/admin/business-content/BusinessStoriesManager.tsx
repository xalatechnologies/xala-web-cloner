/**
 * Business Stories Manager Component
 * 
 * Admin interface for managing business impact stories.
 * Integrates with existing admin portal authentication and design patterns.
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { BusinessImpactStoriesService } from '@/integrations/supabase/business-content';
import type { BusinessImpactStory, BusinessMetrics } from '@/types/business';
import { BusinessDataValidator, BusinessContentUtils } from '@/types/business';

interface BusinessStoriesManagerProps {
  className?: string;
}

export function BusinessStoriesManager({ className }: BusinessStoriesManagerProps) {
  const { t } = useTranslation();
  const [stories, setStories] = useState<BusinessImpactStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingStory, setEditingStory] = useState<BusinessImpactStory | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state for creating/editing stories
  const [formData, setFormData] = useState<Partial<BusinessImpactStory>>({
    client_name: '',
    project_title: '',
    business_challenge: '',
    solution_approach: '',
    quantifiable_results: {},
    project_duration: '',
    technology_stack: [],
    testimonial_quote: '',
    display_priority: 50,
    industry_sector: '',
    project_scale: 'medium',
    published: false,
    content_language: 'both'
  });

  const [metricsData, setMetricsData] = useState<BusinessMetrics>({});

  // Load stories on component mount
  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await BusinessImpactStoriesService.getAllStories();
      setStories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = async () => {
    try {
      const storyData = {
        ...formData,
        quantifiable_results: metricsData,
        slug: BusinessContentUtils.generateSlug(formData.project_title || '')
      } as Omit<BusinessImpactStory, 'id' | 'created_at' | 'updated_at'>;

      await BusinessImpactStoriesService.createStory(storyData);
      await loadStories();
      resetForm();
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create story');
    }
  };

  const handleUpdateStory = async () => {
    if (!editingStory) return;

    try {
      const updates = {
        ...formData,
        quantifiable_results: metricsData,
        slug: BusinessContentUtils.generateSlug(formData.project_title || '')
      };

      await BusinessImpactStoriesService.updateStory(editingStory.id, updates);
      await loadStories();
      resetForm();
      setEditingStory(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update story');
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      await BusinessImpactStoriesService.deleteStory(id);
      await loadStories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete story');
    }
  };

  const startEditing = (story: BusinessImpactStory) => {
    setFormData(story);
    setMetricsData(story.quantifiable_results || {});
    setEditingStory(story);
    setShowCreateForm(false);
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      project_title: '',
      business_challenge: '',
      solution_approach: '',
      quantifiable_results: {},
      project_duration: '',
      technology_stack: [],
      testimonial_quote: '',
      display_priority: 50,
      industry_sector: '',
      project_scale: 'medium',
      published: false,
      content_language: 'both'
    });
    setMetricsData({});
    setEditingStory(null);
    setError(null);
  };

  const updateMetrics = (field: string, value: unknown) => {
    setMetricsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Business Impact Stories</h2>
          <p className="text-muted-foreground">
            Manage client success stories and business impact metrics
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowCreateForm(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          Create New Story
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Create/Edit Form */}
      {(showCreateForm || editingStory) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingStory ? 'Edit Story' : 'Create New Story'}
            </CardTitle>
            <CardDescription>
              {editingStory ? 'Update the business impact story details' : 'Add a new client success story'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_name">Client Name</Label>
                <Input
                  id="client_name"
                  value={formData.client_name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <Label htmlFor="project_title">Project Title</Label>
                <Input
                  id="project_title"
                  value={formData.project_title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_title: e.target.value }))}
                  placeholder="Enter project title"
                />
              </div>
            </div>

            {/* Business Challenge and Solution */}
            <div>
              <Label htmlFor="business_challenge">Business Challenge</Label>
              <Textarea
                id="business_challenge"
                value={formData.business_challenge || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, business_challenge: e.target.value }))}
                placeholder="Describe the business challenge"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="solution_approach">Solution Approach</Label>
              <Textarea
                id="solution_approach"
                value={formData.solution_approach || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, solution_approach: e.target.value }))}
                placeholder="Describe how Xala addressed the challenge"
                rows={3}
              />
            </div>

            {/* Business Metrics */}
            <div>
              <Label>Business Metrics</Label>
              <div className="space-y-2 mt-2 p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cost_savings">Cost Savings (Amount)</Label>
                    <Input
                      id="cost_savings"
                      type="number"
                      value={metricsData.cost_savings?.amount || ''}
                      onChange={(e) => updateMetrics('cost_savings', {
                        ...metricsData.cost_savings,
                        amount: parseInt(e.target.value) || 0
                      })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost_currency">Currency</Label>
                    <Select 
                      value={metricsData.cost_savings?.currency || 'NOK'}
                      onValueChange={(value) => updateMetrics('cost_savings', {
                        ...metricsData.cost_savings,
                        currency: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NOK">NOK</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="project_duration">Project Duration</Label>
                <Input
                  id="project_duration"
                  value={formData.project_duration || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_duration: e.target.value }))}
                  placeholder="e.g., 6 months"
                />
              </div>
              <div>
                <Label htmlFor="industry_sector">Industry Sector</Label>
                <Input
                  id="industry_sector"
                  value={formData.industry_sector || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry_sector: e.target.value }))}
                  placeholder="e.g., Healthcare"
                />
              </div>
              <div>
                <Label htmlFor="project_scale">Project Scale</Label>
                <Select 
                  value={formData.project_scale || 'medium'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, project_scale: value as BusinessImpactStory['project_scale'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Display Settings */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="display_priority">Display Priority (0-100)</Label>
                <Input
                  id="display_priority"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.display_priority || 50}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_priority: parseInt(e.target.value) }))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <div>
                <Label htmlFor="content_language">Content Language</Label>
                <Select 
                  value={formData.content_language || 'both'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, content_language: value as BusinessImpactStory['content_language'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Norwegian</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button
                onClick={editingStory ? handleUpdateStory : handleCreateStory}
                className="bg-primary hover:bg-primary/90"
              >
                {editingStory ? 'Update Story' : 'Create Story'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setShowCreateForm(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stories List */}
      <div className="grid gap-4">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{story.project_title}</CardTitle>
                  <CardDescription>{story.client_name}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={story.published ? "default" : "secondary"}>
                    {story.published ? 'Published' : 'Draft'}
                  </Badge>
                  <Badge variant="outline">
                    Priority: {story.display_priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {story.business_challenge.substring(0, 200)}...
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {story.industry_sector} • {story.project_duration} • {story.project_scale}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(story)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteStory(story.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stories.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No business impact stories found. Create your first story to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BusinessStoriesManager;
