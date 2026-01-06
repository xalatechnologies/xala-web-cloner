/**
 * Admin Business Content Page
 * 
 * Main admin page for managing business content including stories and service categories.
 * Integrates with existing admin portal layout and authentication.
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BusinessStoriesManager from '@/components/admin/business-content/BusinessStoriesManager';
import BusinessServicesManager from '@/components/admin/business-content/BusinessServicesManager';

export default function AdminBusinessContent() {
  const [activeTab, setActiveTab] = useState('stories');

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Business Content Management</h1>
        <p className="text-muted-foreground">
          Manage business impact stories and service categories for the website
        </p>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stories">Impact Stories</TabsTrigger>
          <TabsTrigger value="services">Service Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Impact Stories</CardTitle>
              <CardDescription>
                Manage client success stories with quantifiable business metrics and outcomes.
                These stories showcase Xala's ability to deliver business transformation.
              </CardDescription>
            </CardHeader>
          </Card>
          <BusinessStoriesManager />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Service Categories</CardTitle>
              <CardDescription>
                Manage business-focused service presentation inspired by customer-centric approach.
                Present services as solutions to business challenges rather than technical offerings.
              </CardDescription>
            </CardHeader>
          </Card>
          <BusinessServicesManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
