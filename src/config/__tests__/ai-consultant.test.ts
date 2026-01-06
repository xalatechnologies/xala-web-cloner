import { AI_CONSULTANT_CONFIG } from '../ai-consultant';
import { describe, it, expect } from 'vitest';

describe('AI Consultant Configuration', () => {
  it('should have required system prompt sections', () => {
    expect(AI_CONSULTANT_CONFIG.systemPrompt).toContain('Core Services Overview');
    expect(AI_CONSULTANT_CONFIG.systemPrompt).toContain('Healthcare Application Development');
    expect(AI_CONSULTANT_CONFIG.systemPrompt).toContain('Digital Health Solutions');
    expect(AI_CONSULTANT_CONFIG.systemPrompt).toContain('Security & Compliance');
  });

  it('should include healthcare-specific best practices', () => {
    expect(AI_CONSULTANT_CONFIG.systemPrompt).toContain('HIPAA-Compliant Development Process');
    expect(AI_CONSULTANT_CONFIG.systemPrompt).toContain('Security & Compliance Audits');
  });

  it('should have healthcare-focused default context', () => {
    expect(AI_CONSULTANT_CONFIG.defaultContext).toContain('healthcare');
    expect(AI_CONSULTANT_CONFIG.defaultContext).toContain('symptom analysis');
  });

  it('should have appropriate model configuration', () => {
    expect(AI_CONSULTANT_CONFIG.modelConfig.model).toBe('gpt-4-turbo-preview');
    expect(AI_CONSULTANT_CONFIG.modelConfig.temperature).toBeGreaterThan(0);
    expect(AI_CONSULTANT_CONFIG.modelConfig.temperature).toBeLessThan(1);
    expect(AI_CONSULTANT_CONFIG.modelConfig.max_tokens).toBeGreaterThan(0);
  });

  it('should have healthcare-specific quick responses', () => {
    expect(AI_CONSULTANT_CONFIG.quickResponses.greeting).toContain('healthcare');
    expect(AI_CONSULTANT_CONFIG.quickResponses.healthcare).toContain('symptom analysis');
    expect(AI_CONSULTANT_CONFIG.quickResponses.timeline).toContain('MVP Development');
    expect(AI_CONSULTANT_CONFIG.quickResponses.process).toContain('HIPAA Compliance');
  });

  it('should include all required role instructions', () => {
    const prompt = AI_CONSULTANT_CONFIG.systemPrompt;
    expect(prompt).toContain('Your role is to:');
    expect(prompt).toContain('When responding:');
    expect(prompt).toContain('understand healthcare requirements');
    expect(prompt).toContain('security measures');
  });

  it('should have comprehensive healthcare benefits section', () => {
    const prompt = AI_CONSULTANT_CONFIG.systemPrompt;
    expect(prompt).toContain('Patient Care');
    expect(prompt).toContain('Operational Efficiency');
    expect(prompt).toContain('Data Security');
  });
});
