/**
 * Business Services Manager Component
 * 
 * Admin interface for managing business service categories.
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
import { BusinessServiceCategoriesService } from '@/integrations/supabase/business-content';
import type { BusinessServiceCategory } from '@/types/business';
import { BusinessContentUtils } from '@/types/business';

interface BusinessServicesManagerProps {
  className?: string;
}

export function BusinessServicesManager({ className }: BusinessServicesManagerProps) {
  const { t } = useTranslation();
  const [services, setServices] = useState<BusinessServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<BusinessServiceCategory | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state for creating/editing services
  const [formData, setFormData] = useState<Partial<BusinessServiceCategory>>({
    service_name: '',
    customer_challenge: '',
    business_outcome: '',
    technical_solution: '',
    typical_timeline: '',
    investment_range: '',
    short_description: '',
    long_description: '',
    display_order: 0,
    active: true,
    featured: false,
    content_language: 'both',
    target_industries: [],
    related_case_studies: []
  });

  // Load services on component mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await BusinessServiceCategoriesService.getAllCategories();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async () => {
    try {
      const serviceData = {
        ...formData,
        slug: BusinessContentUtils.generateSlug(formData.service_name || '')
      } as Omit<BusinessServiceCategory, 'id' | 'created_at' | 'updated_at'>;

      await BusinessServiceCategoriesService.createCategory(serviceData);
      await loadServices();
      resetForm();
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create service');
    }
  };

  const handleUpdateService = async () => {
    if (!editingService) return;

    try {
      const updates = {
        ...formData,
        slug: BusinessContentUtils.generateSlug(formData.service_name || '')
      };

      await BusinessServiceCategoriesService.updateCategory(editingService.id, updates);
      await loadServices();
      resetForm();
      setEditingService(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service category?')) return;

    try {
      await BusinessServiceCategoriesService.deleteCategory(id);
      await loadServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service');
    }
  };

  const startEditing = (service: BusinessServiceCategory) => {
    setFormData(service);
    setEditingService(service);
    setShowCreateForm(false);
  };

  const resetForm = () => {
    setFormData({
      service_name: '',
      customer_challenge: '',
      business_outcome: '',
      technical_solution: '',
      typical_timeline: '',
      investment_range: '',
      short_description: '',
      long_description: '',
      display_order: 0,
      active: true,
      featured: false,
      content_language: 'both',
      target_industries: [],
      related_case_studies: []
    });
    setEditingService(null);
    setError(null);
  };

  const updateTargetIndustries = (industriesString: string) => {
    const industries = industriesString.split(',').map(i => i.trim()).filter(i => i.length > 0);
    setFormData(prev => ({ ...prev, target_industries: industries }));
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
          <h2 className="text-2xl font-bold">Business Service Categories</h2>
          <p className="text-muted-foreground">
            Manage business-focused service presentation and categories
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowCreateForm(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          Create New Service
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Create/Edit Form */}
      {(showCreateForm || editingService) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingService ? 'Edit Service Category' : 'Create New Service Category'}
            </CardTitle>
            <CardDescription>
              {editingService ? 'Update the service category details' : 'Add a new business service category'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service_name">Service Name</Label>
                <Input
                  id="service_name"
                  value={formData.service_name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, service_name: e.target.value }))}
                  placeholder="e.g., Digital Transformation"
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  min="0"
                  value={formData.display_order || 0}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                value={formData.short_description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                placeholder="Brief description for cards and navigation"
              />
            </div>

            <div>
              <Label htmlFor="long_description">Long Description</Label>
              <Textarea
                id="long_description"
                value={formData.long_description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, long_description: e.target.value }))}
                placeholder="Detailed service description"
                rows={3}
              />
            </div>

            {/* Customer Challenge and Business Outcome */}
            <div>
              <Label htmlFor="customer_challenge">Customer Challenge</Label>
              <Textarea
                id="customer_challenge"
                value={formData.customer_challenge || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_challenge: e.target.value }))}
                placeholder="What problem does this service solve?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="business_outcome">Business Outcome</Label>
              <Textarea
                id="business_outcome"
                value={formData.business_outcome || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, business_outcome: e.target.value }))}
                placeholder="What business results can clients expect?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="technical_solution">Technical Solution</Label>
              <Textarea
                id="technical_solution"
                value={formData.technical_solution || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, technical_solution: e.target.value }))}
                placeholder="Technical implementation approach"
                rows={3}
              />
            </div>

            {/* Business Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="typical_timeline">Typical Timeline</Label>
                <Input
                  id="typical_timeline"
                  value={formData.typical_timeline || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, typical_timeline: e.target.value }))}
                  placeholder="e.g., 3-8 months"
                />
              </div>
              <div>
                <Label htmlFor="investment_range">Investment Range</Label>
                <Input
                  id="investment_range"
                  value={formData.investment_range || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, investment_range: e.target.value }))}
                  placeholder="e.g., 500,000 - 2,000,000 NOK"
                />
              </div>
            </div>

            {/* Target Industries */}
            <div>
              <Label htmlFor="target_industries">Target Industries (comma-separated)</Label>
              <Input
                id="target_industries"
                value={formData.target_industries?.join(', ') || ''}
                onChange={(e) => updateTargetIndustries(e.target.value)}
                placeholder="e.g., Healthcare, Finance, Public Sector"
              />
            </div>

            {/* Settings */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div>
                <Label htmlFor="content_language">Content Language</Label>
                <Select 
                  value={formData.content_language || 'both'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, content_language: value as BusinessServiceCategory['content_language'] }))}
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
                onClick={editingService ? handleUpdateService : handleCreateService}
                className="bg-primary hover:bg-primary/90"
              >
                {editingService ? 'Update Service' : 'Create Service'}
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

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.service_name}</CardTitle>
                  <CardDescription>{service.short_description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={service.active ? "default" : "secondary"}>
                    {service.active ? 'Active' : 'Inactive'}
                  </Badge>
                  {service.featured && (
                    <Badge variant="outline">Featured</Badge>
                  )}
                  <Badge variant="outline">
                    Order: {service.display_order}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Challenge:</strong> {service.customer_challenge.substring(0, 150)}...
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Outcome:</strong> {service.business_outcome.substring(0, 150)}...
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {service.typical_timeline} • {service.investment_range}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
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

      {services.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No business service categories found. Create your first service to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BusinessServicesManager;
