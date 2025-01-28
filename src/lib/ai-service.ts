import { Message } from '@/types/chat';
import { AI_CONSULTANT_CONFIG } from '@/config/ai-consultant';

export interface AIResponse {
  content: string;
  sources?: Array<{
    title: string;
    url: string;
  }>;
  shouldStopThinking?: boolean;
}

interface ConversationContext {
  messages: Message[];
  context: string;
}

// Keep track of conversation context and insights
const conversationMemory = new Map<string, {
  topic?: string;
  lastIntent?: string;
  businessType?: string;
  requirements?: string[];
}>();

function analyzeUserIntent(messages: Message[]): { 
  intent: string; 
  businessType?: string;
  requirements: string[];
} {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  const requirements: string[] = [];
  let businessType = '';
  
  // Detect business type
  if (lastMessage.includes('restaurant') || lastMessage.includes('sushi')) {
    businessType = 'restaurant';
    requirements.push('menu display', 'online ordering', 'reservation system');
  }

  // Determine primary intent
  let intent = 'general';
  if (lastMessage.includes('website')) {
    intent = 'website';
    requirements.push('responsive design', 'contact form');
  } else if (lastMessage.includes('app') || lastMessage.includes('application')) {
    intent = 'application';
    requirements.push('mobile compatibility');
  } else if (lastMessage.includes('ai') || lastMessage.includes('machine learning')) {
    intent = 'ai';
  } else if (lastMessage.includes('cloud') || lastMessage.includes('infrastructure')) {
    intent = 'cloud';
  } else if (lastMessage.includes('data') || lastMessage.includes('analytics')) {
    intent = 'data';
  }

  return { intent, businessType, requirements };
}

function generateResponse(intent: string, businessType: string, requirements: string[]): string {
  if (businessType === 'restaurant') {
    return `I understand you have a sushi restaurant and need a website. We can help you create a modern, attractive website that will help grow your business.

Based on our experience with restaurant websites, here are some key features we recommend:
1. Beautiful menu display with high-quality food photos
2. Online reservation system
3. Online ordering capability
4. Mobile-friendly design
5. Integration with popular delivery platforms

Would you like me to explain more about any of these features? Or shall we discuss your specific requirements?`;
  }

  switch (intent) {
    case 'website':
      return `I can help you create a professional website for your business. To provide the best solution, could you tell me:

1. What type of business do you run?
2. What are the main features you need? (e.g., online booking, product catalog, blog)
3. Do you have any specific design preferences?

We specialize in creating modern, responsive websites that help businesses grow their online presence.`;

    case 'application':
      return `Great! We can help you develop a custom application. To better understand your needs:

1. Is this a web, mobile, or desktop application?
2. What are the core functionalities you're looking for?
3. Do you have any specific technology preferences?

We have extensive experience in building scalable applications using modern tech stacks.`;

    default:
      return `To help you better, could you tell me more about:

1. What type of business do you run?
2. What specific challenges are you trying to solve?
3. What features are most important for your project?

This will help me recommend the most suitable solutions from our service portfolio.`;
  }
}

export async function getAIResponse({ messages, context }: ConversationContext): Promise<AIResponse> {
  try {
    // Don't respond with greeting if it's not the first message
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const sessionId = lastMessage.id.split('-')[0];
      const { intent, businessType, requirements } = analyzeUserIntent(messages);
      
      // Update conversation memory
      const memory = conversationMemory.get(sessionId) || {};
      conversationMemory.set(sessionId, {
        ...memory,
        lastIntent: intent,
        businessType: businessType || memory.businessType,
        requirements: requirements
      });

      // Generate contextual response
      const response = generateResponse(intent, businessType || '', requirements);

      return {
        content: response,
        shouldStopThinking: true
      };
    }

    // Return greeting for first message
    return {
      content: AI_CONSULTANT_CONFIG.quickResponses.greeting,
      shouldStopThinking: true
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    return {
      content: "I apologize, but I'm having trouble understanding. Could you please rephrase your question or provide more details about what you're looking for?",
      shouldStopThinking: true
    };
  }
}
