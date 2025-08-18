/**
 * Business Content i18n Integration Tests
 * 
 * Tests for business content translation integration with React components
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { 
  useBusinessHero, 
  useBusinessNavigation, 
  useBusinessServices,
  useBusinessStories,
  useBusinessPartnership,
  useBusinessCTA
} from '../business-content';
import { mockBusinessTranslations } from './business-content.test';

// Test component that uses business hero translations
function TestBusinessHeroComponent() {
  const businessHero = useBusinessHero();
  
  return (
    <div>
      <h1>{businessHero.title}</h1>
      <h2>{businessHero.subtitle}</h2>
      <p>{businessHero.description}</p>
      <button>{businessHero.cta.primary}</button>
      <button>{businessHero.cta.secondary}</button>
      <div>
        <span>{businessHero.value.partnership}</span>
        <span>{businessHero.value.transformation}</span>
        <span>{businessHero.value.results}</span>
        <span>{businessHero.value.innovation}</span>
      </div>
    </div>
  );
}

// Test component that uses business navigation translations
function TestBusinessNavigationComponent() {
  const businessNav = useBusinessNavigation();
  
  return (
    <nav>
      <div>{businessNav.challenge}</div>
      <a href="/solutions">{businessNav.solutions}</a>
      <a href="/outcomes">{businessNav.outcomes}</a>
      <a href="/partnership">{businessNav.partnership}</a>
      <a href="/consultation">{businessNav.consultation}</a>
    </nav>
  );
}

// Test component that uses business services translations
function TestBusinessServicesComponent() {
  const services = useBusinessServices();
  
  return (
    <div>
      <div data-testid="digital-transformation">
        <h3>{services.digitalTransformation.title}</h3>
        <p>{services.digitalTransformation.challenge}</p>
        <p>{services.digitalTransformation.outcome}</p>
        <p>{services.digitalTransformation.timeline}</p>
        <p>{services.digitalTransformation.investment}</p>
      </div>
      <div data-testid="ai-automation">
        <h3>{services.aiAutomation.title}</h3>
        <p>{services.aiAutomation.challenge}</p>
        <p>{services.aiAutomation.outcome}</p>
      </div>
    </div>
  );
}

// Test component for business stories
function TestBusinessStoriesComponent() {
  const stories = useBusinessStories();
  
  return (
    <div>
      <h2>{stories.title}</h2>
      <p>{stories.subtitle}</p>
      <button>{stories.cta}</button>
      <div>
        <span>{stories.metrics.efficiency}</span>
        <span>{stories.metrics.cost_savings}</span>
        <span>{stories.metrics.revenue_growth}</span>
        <span>{stories.metrics.time_reduction}</span>
      </div>
    </div>
  );
}

// Test component for business partnership
function TestBusinessPartnershipComponent() {
  const partnership = useBusinessPartnership();
  
  return (
    <div>
      <h2>{partnership.title}</h2>
      <p>{partnership.subtitle}</p>
      <div>
        <div>
          <h4>{partnership.approach.consultation.title}</h4>
          <p>{partnership.approach.consultation.description}</p>
        </div>
        <div>
          <h4>{partnership.approach.planning.title}</h4>
          <p>{partnership.approach.planning.description}</p>
        </div>
        <div>
          <h4>{partnership.approach.implementation.title}</h4>
          <p>{partnership.approach.implementation.description}</p>
        </div>
        <div>
          <h4>{partnership.approach.optimization.title}</h4>
          <p>{partnership.approach.optimization.description}</p>
        </div>
      </div>
    </div>
  );
}

// Test component for business CTA
function TestBusinessCTAComponent() {
  const cta = useBusinessCTA();
  
  return (
    <div>
      <div data-testid="consultation-cta">
        <h3>{cta.consultation.title}</h3>
        <p>{cta.consultation.description}</p>
        <button>{cta.consultation.button}</button>
        <small>{cta.consultation.guarantee}</small>
      </div>
      <div data-testid="contact-options">
        <option value="business">{cta.contact.business}</option>
        <option value="partnership">{cta.contact.partnership}</option>
        <option value="solution">{cta.contact.solution}</option>
      </div>
    </div>
  );
}

// Setup test i18n instance
function createTestI18n(language: string) {
  const testI18n = i18n.createInstance();
  testI18n.init({
    lng: language,
    resources: {
      en: { translation: mockBusinessTranslations.en },
      no: { translation: mockBusinessTranslations.no }
    },
    react: {
      useSuspense: false
    }
  });
  return testI18n;
}

describe('Business Content i18n Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('English Business Content Integration', () => {
    it('should render business hero content in English', () => {
      const testI18n = createTestI18n('en');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessHeroComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('We Use Technology to Create Digital Transformation')).toBeInTheDocument();
      expect(screen.getByText('Your Strategic Technology Partner')).toBeInTheDocument();
      expect(screen.getByText(/We don't just build software/)).toBeInTheDocument();
      expect(screen.getByText('Explore Business Solutions')).toBeInTheDocument();
      expect(screen.getByText('Schedule Consultation')).toBeInTheDocument();
    });

    it('should render business navigation content in English', () => {
      const testI18n = createTestI18n('en');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessNavigationComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('What Business Challenge Can We Solve for You?')).toBeInTheDocument();
      expect(screen.getByText('Business Solutions')).toBeInTheDocument();
      expect(screen.getByText('Success Stories')).toBeInTheDocument();
      expect(screen.getByText('Partnership Approach')).toBeInTheDocument();
      expect(screen.getByText('Free Consultation')).toBeInTheDocument();
    });

    it('should render business services content in English', () => {
      const testI18n = createTestI18n('en');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessServicesComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Digital Transformation')).toBeInTheDocument();
      expect(screen.getByText(/Legacy systems limiting business growth/)).toBeInTheDocument();
      expect(screen.getByText(/Modernized infrastructure enabling rapid scaling/)).toBeInTheDocument();
      
      expect(screen.getByText('AI & Intelligent Automation')).toBeInTheDocument();
      expect(screen.getByText(/Manual processes consuming resources/)).toBeInTheDocument();
    });

    it('should render business stories content in English', () => {
      const testI18n = createTestI18n('en');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessStoriesComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Client Success Stories')).toBeInTheDocument();
      expect(screen.getByText('Measurable Business Impact Through Technology')).toBeInTheDocument();
      expect(screen.getByText('Explore All Success Stories')).toBeInTheDocument();
      expect(screen.getByText('Efficiency Improvement')).toBeInTheDocument();
      expect(screen.getByText('Cost Savings')).toBeInTheDocument();
    });

    it('should render business partnership content in English', () => {
      const testI18n = createTestI18n('en');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessPartnershipComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Your Technology Transformation Partner')).toBeInTheDocument();
      expect(screen.getByText('Collaborative Approach to Business Success')).toBeInTheDocument();
      expect(screen.getByText('Strategic Consultation')).toBeInTheDocument();
      expect(screen.getByText('Solution Architecture')).toBeInTheDocument();
      expect(screen.getByText('Agile Delivery')).toBeInTheDocument();
      expect(screen.getByText('Continuous Optimization')).toBeInTheDocument();
    });

    it('should render business CTA content in English', () => {
      const testI18n = createTestI18n('en');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessCTAComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Ready to Transform Your Business?')).toBeInTheDocument();
      expect(screen.getByText('Schedule Free Consultation')).toBeInTheDocument();
      expect(screen.getByText(/No obligation - just insights/)).toBeInTheDocument();
      expect(screen.getByText('Business Transformation Inquiry')).toBeInTheDocument();
      expect(screen.getByText('Strategic Partnership Discussion')).toBeInTheDocument();
    });
  });

  describe('Norwegian Business Content Integration', () => {
    it('should render business hero content in Norwegian', () => {
      const testI18n = createTestI18n('no');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessHeroComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Vi bruker teknologi for å skape digital transformasjon')).toBeInTheDocument();
      expect(screen.getByText('Din strategiske teknologipartner')).toBeInTheDocument();
      expect(screen.getByText(/Vi bygger ikke bare programvare/)).toBeInTheDocument();
      expect(screen.getByText('Utforsk våre løsninger')).toBeInTheDocument();
      expect(screen.getByText('Book konsultasjon')).toBeInTheDocument();
    });

    it('should render business navigation content in Norwegian', () => {
      const testI18n = createTestI18n('no');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessNavigationComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Hva kan vi løse for din bedrift?')).toBeInTheDocument();
      expect(screen.getByText('Forretningsløsninger')).toBeInTheDocument();
      expect(screen.getByText('Suksesshistorier')).toBeInTheDocument();
      expect(screen.getByText('Partnerskap')).toBeInTheDocument();
      expect(screen.getByText('Gratis konsultasjon')).toBeInTheDocument();
    });

    it('should render business services content in Norwegian', () => {
      const testI18n = createTestI18n('no');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessServicesComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Digital transformasjon')).toBeInTheDocument();
      expect(screen.getByText(/Eldre systemer som begrenser forretningsvekst/)).toBeInTheDocument();
      expect(screen.getByText(/Modernisert infrastruktur som muliggjør rask skalering/)).toBeInTheDocument();
      
      expect(screen.getByText('AI og intelligent automatisering')).toBeInTheDocument();
      expect(screen.getByText(/Manuelle prosesser som forbruker ressurser/)).toBeInTheDocument();
    });

    it('should render business stories content in Norwegian', () => {
      const testI18n = createTestI18n('no');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessStoriesComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Kundesuksesshistorier')).toBeInTheDocument();
      expect(screen.getByText('Målbar forretningseffekt gjennom teknologi')).toBeInTheDocument();
      expect(screen.getByText('Utforsk alle suksesshistorier')).toBeInTheDocument();
      expect(screen.getByText('Effektivitetsforbedring')).toBeInTheDocument();
      expect(screen.getByText('Kostnadsbesparelser')).toBeInTheDocument();
    });

    it('should render business CTA content in Norwegian', () => {
      const testI18n = createTestI18n('no');
      
      render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessCTAComponent />
        </I18nextProvider>
      );

      expect(screen.getByText('Klar til å transformere din bedrift?')).toBeInTheDocument();
      expect(screen.getByText('Book gratis konsultasjon')).toBeInTheDocument();
      expect(screen.getByText(/Ingen forpliktelser - bare innsikt/)).toBeInTheDocument();
      expect(screen.getByText('Forespørsel om forretningsendring')).toBeInTheDocument();
      expect(screen.getByText('Strategisk partnerskapsdiskusjon')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should update content when language is changed', () => {
      const testI18n = createTestI18n('en');
      
      const { rerender } = render(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessHeroComponent />
        </I18nextProvider>
      );

      // Verify English content
      expect(screen.getByText('We Use Technology to Create Digital Transformation')).toBeInTheDocument();

      // Change language to Norwegian
      testI18n.changeLanguage('no');

      rerender(
        <I18nextProvider i18n={testI18n}>
          <TestBusinessHeroComponent />
        </I18nextProvider>
      );

      // Verify Norwegian content
      expect(screen.getByText('Vi bruker teknologi for å skape digital transformasjon')).toBeInTheDocument();
    });
  });
});
