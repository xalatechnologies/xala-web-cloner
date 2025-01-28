import { analyzeIntent } from './chat/intentAnalyzer';
import { generateResponse } from './chat/responseGenerator';
import type { Message } from '@/types/chat';

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
    
    // Skip intent analysis for the first message (greeting)
    if (messages.length === 1) {
      return {
        content: `Hi! I'm your AI assistant from Xala Technologies. I specialize in AI solutions, cloud integration, data analytics, and custom software development. How can I help you today?`
      };
    }

    // Analyze user intent from the last message
    const intent = analyzeIntent(lastMessage.content);
    
    // Generate appropriate response based on intent
    const response = generateResponse(intent);

    return {
      content: response
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to get AI response');
  }
}