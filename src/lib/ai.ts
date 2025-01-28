import { Message } from '@/types/chat';
import { AI_CONSULTANT_CONFIG } from '@/config/ai-consultant';

export interface AIResponse {
  content: string;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

export async function getAIResponse(messages: Message[], context: string): Promise<AIResponse> {
  try {
    const lastMessage = messages[messages.length - 1];
    const conversationHistory = messages
      .slice(-5) // Keep last 5 messages for context
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // If it's the first message, provide a welcoming response
    if (messages.length === 1) {
      return {
        content: AI_CONSULTANT_CONFIG.quickResponses.greeting
      };
    }

    // If the message is too short or unclear
    if (lastMessage.content.length < 5) {
      return {
        content: AI_CONSULTANT_CONFIG.quickResponses.needMoreInfo
      };
    }

    // Default response with context awareness
    return {
      content: `I understand what you're asking about. Let me help you with that.

Based on our conversation, I can see you're interested in ${lastMessage.content}. 

Here's how I can help:
1. First, let's clarify your specific needs
2. Then, I can provide targeted solutions
3. Finally, we can discuss implementation details

What aspect would you like to explore first?`
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to get AI response');
  }
}