import { renderHook, act } from '@testing-library/react';
import { useChatStore } from '../useChatStore';
import { vi } from 'vitest';

// Mock uuid to have consistent IDs in tests
vi.mock('uuid', () => ({
  v4: () => 'test-id',
}));

describe('useChatStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useChatStore());
    act(() => {
      result.current.messages = [];
      result.current.isLoading = false;
      result.current.isOpen = false;
      result.current.thinking = false;
      result.current.context = '';
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useChatStore());
    
    expect(result.current.messages).toHaveLength(1); // Initial greeting message
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isOpen).toBe(false);
    expect(result.current.thinking).toBe(false);
    expect(result.current.context).toBe('');
  });

  it('adds user message with correct properties', () => {
    const { result } = renderHook(() => useChatStore());
    
    act(() => {
      result.current.addMessage('Hello', 'user');
    });

    const message = result.current.messages[result.current.messages.length - 1];
    expect(message).toEqual({
      id: 'test-id',
      type: 'user',
      content: 'Hello',
      timestamp: expect.any(Date),
      status: 'sending',
    });
  });

  it('adds assistant message with sources', () => {
    const { result } = renderHook(() => useChatStore());
    const sources = [
      {
        title: 'Test Source',
        url: 'https://example.com',
        content: 'Test content',
      },
    ];

    act(() => {
      result.current.addMessage('Response', 'assistant', sources);
    });

    const message = result.current.messages[result.current.messages.length - 1];
    expect(message).toEqual({
      id: 'test-id',
      type: 'assistant',
      content: 'Response',
      timestamp: expect.any(Date),
      thinking: true,
      sources,
    });
  });

  it('updates message status', () => {
    const { result } = renderHook(() => useChatStore());
    let messageId: string;

    act(() => {
      messageId = result.current.addMessage('Hello', 'user');
    });

    act(() => {
      result.current.updateMessageStatus(messageId, 'sent');
    });

    const message = result.current.messages.find(m => m.id === messageId);
    expect(message?.status).toBe('sent');
    expect(message?.thinking).toBe(false);
  });

  it('sets loading state', () => {
    const { result } = renderHook(() => useChatStore());
    
    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('sets thinking state', () => {
    const { result } = renderHook(() => useChatStore());
    
    act(() => {
      result.current.setThinking(true);
    });

    expect(result.current.thinking).toBe(true);
  });

  it('sets context', () => {
    const { result } = renderHook(() => useChatStore());
    
    act(() => {
      result.current.setContext('Test context');
    });

    expect(result.current.context).toBe('Test context');
  });
});
