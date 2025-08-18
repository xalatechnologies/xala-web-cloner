/**
 * Business Content i18n Unit Tests
 * 
 * Tests for business content translation utilities and validation functions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  validateBusinessTranslation, 
  getBusinessServiceIcon, 
  formatBusinessInvestment,
  getLocalizedBusinessContent
} from '../business-content';

// Mock react-i18next
const mockUseTranslation = vi.fn();
vi.mock('react-i18next', () => ({
  useTranslation: () => mockUseTranslation()
}));

describe('Business Content i18n Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validateBusinessTranslation', () => {
    it('should validate proper business content', () => {
      const validContent = 'We create digital transformation solutions for enterprise clients';
      expect(validateBusinessTranslation('business.hero.title', validContent)).toBe(true);
    });

    it('should reject empty or short content', () => {
      expect(validateBusinessTranslation('business.hero.title', '')).toBe(false);
      expect(validateBusinessTranslation('business.hero.title', '   ')).toBe(false);
      expect(validateBusinessTranslation('business.hero.title', 'Short')).toBe(false);
    });

    it('should reject placeholder content', () => {
      expect(validateBusinessTranslation('business.hero.title', 'TODO: Add business content')).toBe(false);
      expect(validateBusinessTranslation('business.hero.title', 'PLACEHOLDER text here')).toBe(false);
      expect(validateBusinessTranslation('business.hero.title', 'FIXME: Update content')).toBe(false);
      expect(validateBusinessTranslation('business.hero.title', '[INSERT CONTENT HERE]')).toBe(false);
    });
  });

  describe('getBusinessServiceIcon', () => {
    it('should return correct icons for business services', () => {
      expect(getBusinessServiceIcon('digitalTransformation')).toBe('transformation');
      expect(getBusinessServiceIcon('aiAutomation')).toBe('automation');
      expect(getBusinessServiceIcon('enterpriseIntegration')).toBe('integration');
      expect(getBusinessServiceIcon('modernWebApps')).toBe('webapp');
    });

    it('should return default icon for unknown services', () => {
      expect(getBusinessServiceIcon('unknownService')).toBe('default');
      expect(getBusinessServiceIcon('')).toBe('default');
    });
  });

  describe('formatBusinessInvestment', () => {
    it('should format Norwegian investment amounts', () => {
      expect(formatBusinessInvestment('500,000 NOK', 'no')).toBe('Fra 500 000 NOK');
      expect(formatBusinessInvestment('1,200,000 NOK', 'no')).toBe('Fra 1 200 000 NOK');
    });

    it('should format English investment amounts', () => {
      expect(formatBusinessInvestment('500,000 NOK', 'en')).toBe('Starting from NOK 500,000');
      expect(formatBusinessInvestment('1,200,000 EUR', 'en')).toBe('Starting from EUR 1,200,000');
    });

    it('should handle malformed investment strings', () => {
      expect(formatBusinessInvestment('Invalid format', 'en')).toBe('Invalid format');
      expect(formatBusinessInvestment('', 'en')).toBe('');
    });

    it('should default to English format when language not specified', () => {
      expect(formatBusinessInvestment('500,000 NOK')).toBe('Starting from NOK 500,000');
    });
  });

  describe('getLocalizedBusinessContent', () => {
    it('should return Norwegian configuration when i18n language is Norwegian', () => {
      mockUseTranslation.mockReturnValue({
        i18n: { language: 'no' }
      });

      const content = getLocalizedBusinessContent();
      expect(content.isNorwegian).toBe(true);
      expect(content.language).toBe('no');
      expect(content.currency).toBe('NOK');
      expect(content.dateFormat).toBe('dd.mm.yyyy');
    });

    it('should return English configuration when i18n language is English', () => {
      mockUseTranslation.mockReturnValue({
        i18n: { language: 'en' }
      });

      const content = getLocalizedBusinessContent();
      expect(content.isNorwegian).toBe(false);
      expect(content.language).toBe('en');
      expect(content.currency).toBe('EUR');
      expect(content.dateFormat).toBe('mm/dd/yyyy');
    });

    it('should handle Norwegian language variants', () => {
      mockUseTranslation.mockReturnValue({
        i18n: { language: 'no-NO' }
      });

      const content = getLocalizedBusinessContent();
      expect(content.isNorwegian).toBe(true);
      expect(content.language).toBe('no');
    });
  });
});

// Integration test data for business content validation
export const mockBusinessTranslations = {
  en: {
    business: {
      hero: {
        title: "We Use Technology to Create Digital Transformation",
        subtitle: "Your Strategic Technology Partner",
        description: "We don't just build software - we create measurable business transformation."
      },
      navigation: {
        challenge: "What Business Challenge Can We Solve for You?",
        solutions: "Business Solutions"
      },
      services: {
        digitalTransformation: {
          title: "Digital Transformation",
          challenge: "Legacy systems limiting business growth",
          outcome: "Modernized infrastructure enabling rapid scaling"
        }
      }
    }
  },
  no: {
    business: {
      hero: {
        title: "Vi bruker teknologi for å skape digital transformasjon",
        subtitle: "Din strategiske teknologipartner",
        description: "Vi bygger ikke bare programvare - vi skaper målbar forretningsendring."
      },
      navigation: {
        challenge: "Hva kan vi løse for din bedrift?",
        solutions: "Forretningsløsninger"
      },
      services: {
        digitalTransformation: {
          title: "Digital transformasjon",
          challenge: "Eldre systemer som begrenser forretningsvekst",
          outcome: "Modernisert infrastruktur som muliggjør rask skalering"
        }
      }
    }
  }
};

// Test helper function
export function validateAllBusinessTranslations(translations: typeof mockBusinessTranslations): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  Object.entries(translations).forEach(([language, content]) => {
    const validateNestedObject = (obj: any, path: string = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'string') {
          if (!validateBusinessTranslation(currentPath, value)) {
            errors.push(`Invalid translation at ${language}.${currentPath}: "${value}"`);
          }
        } else if (typeof value === 'object' && value !== null) {
          validateNestedObject(value, currentPath);
        }
      });
    };
    
    validateNestedObject(content.business);
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}
