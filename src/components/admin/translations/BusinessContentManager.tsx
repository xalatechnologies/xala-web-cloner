/**
 * Business Content Translation Manager
 * 
 * Admin interface for managing business-focused translations and content preview
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateBusinessTranslation } from '@/i18n/business-content';

interface BusinessTranslationKey {
  key: string;
  englishValue: string;
  norwegianValue: string;
  description: string;
  category: 'hero' | 'navigation' | 'services' | 'stories' | 'partnership' | 'cta';
}

interface BusinessContentManagerProps {
  className?: string;
}

export function BusinessContentManager({ className }: BusinessContentManagerProps) {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'no'>('en');
  const [previewMode, setPreviewMode] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [translationKeys, setTranslationKeys] = useState<BusinessTranslationKey[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Initialize translation keys from current i18n configuration
  useEffect(() => {
    const businessKeys: BusinessTranslationKey[] = [
      {
        key: 'business.hero.title',
        englishValue: t('business.hero.title', { lng: 'en' }),
        norwegianValue: t('business.hero.title', { lng: 'no' }),
        description: 'Main hero section title for business transformation messaging',
        category: 'hero'
      },
      {
        key: 'business.hero.subtitle',
        englishValue: t('business.hero.subtitle', { lng: 'en' }),
        norwegianValue: t('business.hero.subtitle', { lng: 'no' }),
        description: 'Hero section subtitle emphasizing partnership approach',
        category: 'hero'
      },
      {
        key: 'business.navigation.challenge',
        englishValue: t('business.navigation.challenge', { lng: 'en' }),
        norwegianValue: t('business.navigation.challenge', { lng: 'no' }),
        description: 'Customer-centric navigation challenge question (Proventus-inspired)',
        category: 'navigation'
      },
      {
        key: 'business.services.digitalTransformation.title',
        englishValue: t('business.services.digitalTransformation.title', { lng: 'en' }),
        norwegianValue: t('business.services.digitalTransformation.title', { lng: 'no' }),
        description: 'Digital transformation service title',
        category: 'services'
      },
      {
        key: 'business.stories.title',
        englishValue: t('business.stories.title', { lng: 'en' }),
        norwegianValue: t('business.stories.title', { lng: 'no' }),
        description: 'Client success stories section title',
        category: 'stories'
      },
      {
        key: 'business.partnership.title',
        englishValue: t('business.partnership.title', { lng: 'en' }),
        norwegianValue: t('business.partnership.title', { lng: 'no' }),
        description: 'Partnership approach section title',
        category: 'partnership'
      },
      {
        key: 'business.cta.consultation.title',
        englishValue: t('business.cta.consultation.title', { lng: 'en' }),
        norwegianValue: t('business.cta.consultation.title', { lng: 'no' }),
        description: 'Call-to-action consultation section title',
        category: 'cta'
      }
    ];
    
    setTranslationKeys(businessKeys);
  }, [t]);

  const handleLanguageSwitch = (language: 'en' | 'no') => {
    setActiveLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleTranslationUpdate = (key: string, value: string, language: 'en' | 'no') => {
    setTranslationKeys(prev => prev.map(item => 
      item.key === key 
        ? { 
            ...item, 
            [language === 'en' ? 'englishValue' : 'norwegianValue']: value 
          }
        : item
    ));
  };

  const validateTranslation = (key: string, value: string): boolean => {
    return validateBusinessTranslation(key, value);
  };

  const filteredKeys = translationKeys.filter(item => 
    filterCategory === 'all' || item.category === filterCategory
  );

  const getCategoryColor = (category: string): string => {
    const colors = {
      hero: 'bg-blue-100 text-blue-800',
      navigation: 'bg-green-100 text-green-800',
      services: 'bg-purple-100 text-purple-800',
      stories: 'bg-orange-100 text-orange-800',
      partnership: 'bg-pink-100 text-pink-800',
      cta: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Business Content Translation Manager</h2>
          <p className="text-muted-foreground">
            Manage business-focused translations with Proventus-inspired messaging
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="preview-mode"
              checked={previewMode}
              onCheckedChange={setPreviewMode}
            />
            <Label htmlFor="preview-mode">Preview Mode</Label>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="navigation">Navigation</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="stories">Stories</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="cta">Call-to-Action</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="flex items-center space-x-4">
        <Label>Active Language:</Label>
        <div className="flex space-x-2">
          <Button
            variant={activeLanguage === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleLanguageSwitch('en')}
          >
            English
          </Button>
          <Button
            variant={activeLanguage === 'no' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleLanguageSwitch('no')}
          >
            Norwegian
          </Button>
        </div>
      </div>

      {/* Preview Mode Alert */}
      {previewMode && (
        <Alert>
          <AlertDescription>
            Preview mode is active. Translation changes will be reflected immediately in the interface.
          </AlertDescription>
        </Alert>
      )}

      {/* Translation Management Interface */}
      <Tabs defaultValue="edit" className="space-y-4">
        <TabsList>
          <TabsTrigger value="edit">Edit Translations</TabsTrigger>
          <TabsTrigger value="preview">Preview Content</TabsTrigger>
          <TabsTrigger value="export">Export/Import</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4">
          {filteredKeys.map((item) => (
            <Card key={item.key}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.key}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`${item.key}-en`}>English</Label>
                    <Textarea
                      id={`${item.key}-en`}
                      value={item.englishValue}
                      onChange={(e) => handleTranslationUpdate(item.key, e.target.value, 'en')}
                      rows={3}
                      className={
                        !validateTranslation(item.key, item.englishValue)
                          ? 'border-red-300 focus:border-red-500'
                          : ''
                      }
                    />
                    {!validateTranslation(item.key, item.englishValue) && (
                      <p className="text-sm text-red-600 mt-1">
                        Translation validation failed
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`${item.key}-no`}>Norwegian</Label>
                    <Textarea
                      id={`${item.key}-no`}
                      value={item.norwegianValue}
                      onChange={(e) => handleTranslationUpdate(item.key, e.target.value, 'no')}
                      rows={3}
                      className={
                        !validateTranslation(item.key, item.norwegianValue)
                          ? 'border-red-300 focus:border-red-500'
                          : ''
                      }
                    />
                    {!validateTranslation(item.key, item.norwegianValue) && (
                      <p className="text-sm text-red-600 mt-1">
                        Translation validation failed
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Content Preview</CardTitle>
              <CardDescription>
                Preview how business content appears with current translations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Preview */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                <h1 className="text-3xl font-bold mb-2">
                  {t('business.hero.title')}
                </h1>
                <h2 className="text-xl mb-4">
                  {t('business.hero.subtitle')}
                </h2>
                <p className="text-lg opacity-90">
                  {t('business.hero.description')}
                </p>
                <div className="flex space-x-4 mt-6">
                  <Button variant="secondary">
                    {t('business.hero.cta.primary')}
                  </Button>
                  <Button variant="outline">
                    {t('business.hero.cta.secondary')}
                  </Button>
                </div>
              </div>

              {/* Navigation Preview */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Navigation Preview</h3>
                <nav className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:underline">
                    {t('business.navigation.solutions')}
                  </a>
                  <a href="#" className="text-blue-600 hover:underline">
                    {t('business.navigation.outcomes')}
                  </a>
                  <a href="#" className="text-blue-600 hover:underline">
                    {t('business.navigation.partnership')}
                  </a>
                  <Button size="sm">
                    {t('business.navigation.consultation')}
                  </Button>
                </nav>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('business.navigation.challenge')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export/Import Translations</CardTitle>
              <CardDescription>
                Export current business translations or import new ones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Button variant="outline">
                  Export Current Translations
                </Button>
                <Button variant="outline">
                  Import Translations
                </Button>
              </div>
              <Alert>
                <AlertDescription>
                  Export/Import functionality would integrate with the business content data models 
                  from Story 1.1 for persistent storage and version control.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BusinessContentManager;
