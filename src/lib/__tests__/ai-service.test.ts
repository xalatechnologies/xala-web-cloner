import { getAIResponse } from '../ai-service';
import { Message } from '@/types/chat';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('AI Service', () => {
  const mockMessages: Message[] = [
    {
      id: '1',
      type: 'user',
      content: 'Hello',
      timestamp: new Date(),
    },
  ];

  const mockContext = 'Test context';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle symptom analysis queries', async () => {
    const messages = [
      ...mockMessages,
      {
        id: '2',
        type: 'user',
        content: 'I want to build a symptom analysis app',
        timestamp: new Date(),
      },
    ];

    const response = await getAIResponse({ messages, context: mockContext });
    
    expect(response.content).toContain('AI-Powered Analysis');
    expect(response.content).toContain('User Experience');
    expect(response.content).toContain('Healthcare Integration');
    expect(response.sources).toBeDefined();
    expect(response.sources?.length).toBeGreaterThan(0);
    expect(response.sources?.[0].title).toContain('Symptom Analysis Platform');
  });

  it('should handle service inquiry', async () => {
    const messages = [
      ...mockMessages,
      {
        id: '2',
        type: 'user',
        content: 'What services do you offer?',
        timestamp: new Date(),
      },
    ];

    const response = await getAIResponse({ messages, context: mockContext });
    
    expect(response.content).toContain('Core Features');
    expect(response.content).toContain('Technical Implementation');
    expect(response.content).toContain('Security & Compliance');
    expect(response.sources).toBeDefined();
    expect(response.sources?.length).toBeGreaterThan(0);
  });

  it('should handle timeline queries', async () => {
    const messages = [
      ...mockMessages,
      {
        id: '2',
        type: 'user',
        content: 'What is the project timeline?',
        timestamp: new Date(),
      },
    ];

    const response = await getAIResponse({ messages, context: mockContext });
    
    expect(response.content).toContain('MVP Development');
    expect(response.content).toContain('Full Platform');
    expect(response.content).toContain('Enterprise Integration');
    expect(response.sources).toBeDefined();
    expect(response.sources?.[0].title).toBe('Healthcare Project Timeline Guide');
  });

  it('should provide relevant sources for healthcare queries', async () => {
    const messages = [
      ...mockMessages,
      {
        id: '2',
        type: 'user',
        content: 'Tell me about your healthcare solutions',
        timestamp: new Date(),
      },
    ];

    const response = await getAIResponse({ messages, context: mockContext });
    
    expect(response.sources).toBeDefined();
    expect(response.sources?.some(s => s.title.includes('Healthcare'))).toBe(true);
    expect(response.sources?.some(s => s.content.includes('HIPAA'))).toBe(true);
  });

  it('should handle default queries with healthcare context', async () => {
    const messages = [
      ...mockMessages,
      {
        id: '2',
        type: 'user',
        content: 'Can you help me?',
        timestamp: new Date(),
      },
    ];

    const response = await getAIResponse({ messages, context: mockContext });
    
    expect(response.content).toContain('Medical Use Case');
    expect(response.content).toContain('Technical Requirements');
    expect(response.content).toContain('Compliance Needs');
  });
});
