/**
 * Business Content i18n Utilities
 * 
 * Utility functions for managing business-focused translations and content
 */

import { useTranslation } from 'react-i18next';

/**
 * Hook for accessing business hero translations
 */
export function useBusinessHero() {
  const { t } = useTranslation();
  
  return {
    title: t('business.hero.title'),
    subtitle: t('business.hero.subtitle'),
    description: t('business.hero.description'),
    cta: {
      primary: t('business.hero.cta.primary'),
      secondary: t('business.hero.cta.secondary')
    },
    value: {
      partnership: t('business.hero.value.partnership'),
      transformation: t('business.hero.value.transformation'),
      results: t('business.hero.value.results'),
      innovation: t('business.hero.value.innovation')
    }
  };
}

/**
 * Hook for accessing business navigation translations
 */
export function useBusinessNavigation() {
  const { t } = useTranslation();
  
  return {
    challenge: t('business.navigation.challenge'),
    solutions: t('business.navigation.solutions'),
    outcomes: t('business.navigation.outcomes'),
    partnership: t('business.navigation.partnership'),
    consultation: t('business.navigation.consultation')
  };
}

/**
 * Hook for accessing business services translations
 */
export function useBusinessServices() {
  const { t } = useTranslation();
  
  return {
    digitalTransformation: {
      title: t('business.services.digitalTransformation.title'),
      challenge: t('business.services.digitalTransformation.challenge'),
      outcome: t('business.services.digitalTransformation.outcome'),
      approach: t('business.services.digitalTransformation.approach'),
      timeline: t('business.services.digitalTransformation.timeline'),
      investment: t('business.services.digitalTransformation.investment')
    },
    aiAutomation: {
      title: t('business.services.aiAutomation.title'),
      challenge: t('business.services.aiAutomation.challenge'),
      outcome: t('business.services.aiAutomation.outcome'),
      approach: t('business.services.aiAutomation.approach'),
      timeline: t('business.services.aiAutomation.timeline'),
      investment: t('business.services.aiAutomation.investment')
    },
    enterpriseIntegration: {
      title: t('business.services.enterpriseIntegration.title'),
      challenge: t('business.services.enterpriseIntegration.challenge'),
      outcome: t('business.services.enterpriseIntegration.outcome'),
      approach: t('business.services.enterpriseIntegration.approach'),
      timeline: t('business.services.enterpriseIntegration.timeline'),
      investment: t('business.services.enterpriseIntegration.investment')
    },
    modernWebApps: {
      title: t('business.services.modernWebApps.title'),
      challenge: t('business.services.modernWebApps.challenge'),
      outcome: t('business.services.modernWebApps.outcome'),
      approach: t('business.services.modernWebApps.approach'),
      timeline: t('business.services.modernWebApps.timeline'),
      investment: t('business.services.modernWebApps.investment')
    }
  };
}

/**
 * Hook for accessing business stories translations
 */
export function useBusinessStories() {
  const { t } = useTranslation();
  
  return {
    title: t('business.stories.title'),
    subtitle: t('business.stories.subtitle'),
    cta: t('business.stories.cta'),
    metrics: {
      efficiency: t('business.stories.metrics.efficiency'),
      cost_savings: t('business.stories.metrics.cost_savings'),
      revenue_growth: t('business.stories.metrics.revenue_growth'),
      time_reduction: t('business.stories.metrics.time_reduction')
    }
  };
}

/**
 * Hook for accessing business partnership translations
 */
export function useBusinessPartnership() {
  const { t } = useTranslation();
  
  return {
    title: t('business.partnership.title'),
    subtitle: t('business.partnership.subtitle'),
    approach: {
      consultation: {
        title: t('business.partnership.approach.consultation.title'),
        description: t('business.partnership.approach.consultation.description')
      },
      planning: {
        title: t('business.partnership.approach.planning.title'),
        description: t('business.partnership.approach.planning.description')
      },
      implementation: {
        title: t('business.partnership.approach.implementation.title'),
        description: t('business.partnership.approach.implementation.description')
      },
      optimization: {
        title: t('business.partnership.approach.optimization.title'),
        description: t('business.partnership.approach.optimization.description')
      }
    }
  };
}

/**
 * Hook for accessing business CTA translations
 */
export function useBusinessCTA() {
  const { t } = useTranslation();
  
  return {
    consultation: {
      title: t('business.cta.consultation.title'),
      description: t('business.cta.consultation.description'),
      button: t('business.cta.consultation.button'),
      guarantee: t('business.cta.consultation.guarantee')
    },
    contact: {
      business: t('business.cta.contact.business'),
      partnership: t('business.cta.contact.partnership'),
      solution: t('business.cta.contact.solution')
    }
  };
}

/**
 * Utility function to get current language
 */
export function getCurrentLanguage() {
  const { i18n } = useTranslation();
  return i18n.language;
}

/**
 * Utility function to check if current language is Norwegian
 */
export function isNorwegian() {
  const language = getCurrentLanguage();
  return language === 'no' || language.startsWith('no');
}

/**
 * Utility function to get localized business content based on language
 */
export function getLocalizedBusinessContent() {
  const isNo = isNorwegian();
  
  return {
    isNorwegian: isNo,
    language: isNo ? 'no' : 'en',
    // Additional language-specific business content can be added here
    currency: isNo ? 'NOK' : 'EUR',
    dateFormat: isNo ? 'dd.mm.yyyy' : 'mm/dd/yyyy'
  };
}

/**
 * Business content validation helper
 */
export function validateBusinessTranslation(key: string, value: string): boolean {
  // Basic validation for business content
  if (!value || value.trim().length === 0) return false;
  
  // Business content should be substantial (at least 10 characters)
  if (value.trim().length < 10) return false;
  
  // Check for placeholder content (common during development)
  const placeholders = ['TODO', 'PLACEHOLDER', 'FIXME', '[INSERT'];
  if (placeholders.some(placeholder => value.includes(placeholder))) return false;
  
  return true;
}

/**
 * Get business service icon mapping
 */
export function getBusinessServiceIcon(serviceKey: string): string {
  const iconMap: Record<string, string> = {
    digitalTransformation: 'transformation',
    aiAutomation: 'automation',
    enterpriseIntegration: 'integration',
    modernWebApps: 'webapp'
  };
  
  return iconMap[serviceKey] || 'default';
}

/**
 * Format business investment ranges for display
 */
export function formatBusinessInvestment(amount: string, language: string = 'en'): string {
  // Extract number and currency from investment string
  const match = amount.match(/(\d+(?:,\d+)*)\s*(\w+)/);
  if (!match) return amount;
  
  const [, number, currency] = match;
  const numericValue = parseInt(number.replace(/,/g, ''));
  
  if (language === 'no') {
    return `Fra ${numericValue.toLocaleString('no-NO')} ${currency}`;
  } else {
    return `Starting from ${currency} ${numericValue.toLocaleString('en-US')}`;
  }
}

export default {
  useBusinessHero,
  useBusinessNavigation,
  useBusinessServices,
  useBusinessStories,
  useBusinessPartnership,
  useBusinessCTA,
  getCurrentLanguage,
  isNorwegian,
  getLocalizedBusinessContent,
  validateBusinessTranslation,
  getBusinessServiceIcon,
  formatBusinessInvestment
};
