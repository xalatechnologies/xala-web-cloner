import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateResponse } from '../chat';
import { supabase } from '@/integrations/supabase/client';
import { OpenAI } from 'openai';

// Mock dependencies
vi.mock('openai');
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: { key_value: 'test-api-key' },
            error: null,
          })),
        })),
        textSearch: vi.fn(() => ({
          data: [{ content: 'Test content' }],
          error: null,
        })),
      })),
    })),
  },
}));

describe('LLM Chat', () => {
  const mockMessage = 'Test message';

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock OpenAI response
    (OpenAI as any).mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{ message: { content: 'AI response' } }],
          }),
        },
      },
    }));
  });

  it('generates English response', async () => {
    const response = await generateResponse(mockMessage, 'en');
    
    expect(response).toHaveProperty('message', 'AI response');
    expect(OpenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
  });

  it('generates Norwegian response', async () => {
    const noMessage = 'Test melding';
    const response = await generateResponse(noMessage, 'no');
    
    expect(response).toHaveProperty('message');
    // Verify Norwegian system message was used
    expect(OpenAI.prototype.chat.completions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({
            content: expect.stringContaining('Svar alltid på norsk'),
          }),
        ]),
      })
    );
  });

  it('handles API key retrieval error', async () => {
    // Mock API key retrieval error
    (supabase.from as any).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: null,
            error: new Error('API key not found'),
          })),
        })),
      })),
    }));

    await expect(generateResponse(mockMessage, 'en')).rejects.toThrow();
  });

  it('handles OpenAI error', async () => {
    // Mock OpenAI error
    (OpenAI as any).mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn().mockRejectedValue(new Error('OpenAI error')),
        },
      },
    }));

    await expect(generateResponse(mockMessage, 'en')).rejects.toThrow();
  });

  it('uses context from database', async () => {
    const testContext = 'Specific context for testing';
    (supabase.from as any).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: { key_value: 'test-api-key' },
            error: null,
          })),
        })),
        textSearch: vi.fn(() => ({
          data: [{ content: testContext }],
          error: null,
        })),
      })),
    }));

    await generateResponse(mockMessage, 'en');

    expect(OpenAI.prototype.chat.completions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({
            content: expect.stringContaining(testContext),
          }),
        ]),
      })
    );
  });
});
