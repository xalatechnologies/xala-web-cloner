import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendChatMessage } from '../chat';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        error: null,
      })),
    })),
  },
}));

describe('Chat API', () => {
  const mockMessage = 'Test message';
  const mockLanguage = 'en';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successfully sends a message', async () => {
    const response = await sendChatMessage(mockMessage, mockLanguage);
    
    expect(supabase.from).toHaveBeenCalledWith('chat_messages');
    expect(response).toHaveProperty('message');
    expect(response.error).toBeUndefined();
  });

  it('handles database errors', async () => {
    // Mock a database error
    (supabase.from as any).mockImplementationOnce(() => ({
      insert: vi.fn(() => ({
        error: new Error('Database error'),
      })),
    }));

    const response = await sendChatMessage(mockMessage, mockLanguage);
    
    expect(response).toHaveProperty('error');
    expect(response.error).toContain('error');
  });

  it('supports Norwegian language', async () => {
    const noMessage = 'Test melding';
    const response = await sendChatMessage(noMessage, 'no');
    
    expect(supabase.from).toHaveBeenCalledWith('chat_messages');
    expect(response).toHaveProperty('message');
  });
});
