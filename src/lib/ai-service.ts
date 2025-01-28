import { Message } from '@/types/chat';
import { AI_CONSULTANT_CONFIG } from '@/config/ai-consultant';

export interface AIResponse {
  content: string;
  sources?: Message['sources'];
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
  technicalContext?: {
    frontend?: string[];
    backend?: string[];
    infrastructure?: string[];
    features?: string[];
  };
  projectRequirements?: string[];
}>();

function analyzeUserIntent(messages: Message[]): { intent: string; techStack: string[]; features: string[] } {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  const techStack: string[] = [];
  const features: string[] = [];
  
  // Detect technology mentions
  if (lastMessage.includes('react') || lastMessage.includes('frontend')) {
    techStack.push('react', 'next.js');
  }
  if (lastMessage.includes('node') || lastMessage.includes('backend')) {
    techStack.push('node.js', 'express');
  }
  if (lastMessage.includes('mobile')) {
    techStack.push('react-native');
  }
  if (lastMessage.includes('ai') || lastMessage.includes('ml')) {
    techStack.push('tensorflow', 'python');
    features.push('machine-learning');
  }
  if (lastMessage.includes('database') || lastMessage.includes('data')) {
    techStack.push('postgresql', 'mongodb');
  }

  // Detect feature requirements
  if (lastMessage.includes('real-time')) {
    features.push('websockets', 'real-time-updates');
  }
  if (lastMessage.includes('scale') || lastMessage.includes('performance')) {
    features.push('cloud-scaling', 'caching');
  }
  if (lastMessage.includes('secure') || lastMessage.includes('security')) {
    features.push('encryption', 'authentication');
  }

  // Determine primary intent
  let intent = 'general';
  if (lastMessage.includes('website')) {
    intent = 'website';
  } else if (lastMessage.includes('app') || lastMessage.includes('application')) {
    intent = 'application';
  } else if (lastMessage.includes('ai') || lastMessage.includes('machine learning')) {
    intent = 'ai';
  } else if (lastMessage.includes('cloud') || lastMessage.includes('infrastructure')) {
    intent = 'cloud';
  } else if (lastMessage.includes('data') || lastMessage.includes('analytics')) {
    intent = 'data';
  }

  return { intent, techStack, features };
}

function generateResponse(intent: string, techStack: string[], features: string[]): string {
  switch (intent) {
    case 'website':
      return `I'd be happy to help you with your website project! To provide the best solution, could you tell me more about:

1. What type of website are you looking to build? (e.g., corporate, e-commerce, portfolio)
2. What are the key features you need? (e.g., content management, user authentication, payment processing)
3. Do you have any specific design preferences or requirements?

We specialize in creating modern, responsive websites using cutting-edge technologies like React and Next.js, ensuring excellent performance and user experience.`;

    case 'application':
      return `Great! We can help you develop a custom application. To better understand your needs:

1. Is this a web, mobile, or desktop application?
2. What are the core functionalities you're looking for?
3. Do you have any specific technology preferences?

We have extensive experience in building scalable applications using modern tech stacks and best practices.`;

    case 'ai':
      return `Excellent! We specialize in AI and machine learning solutions. To help you better:

1. What specific AI capabilities are you looking for?
2. Do you have existing data that needs to be processed?
3. What are your expected outcomes?

We can help with everything from custom model development to AI integration in your existing systems.`;

    default:
      return `I understand you're interested in our services. To provide the most relevant assistance, could you tell me more about:

1. What specific challenge or need are you trying to address?
2. Are there any particular technologies you're interested in?
3. What are your timeline and budget considerations?

We offer a wide range of services including custom software development, AI solutions, cloud integration, and data analytics.`;
  }
}

export async function getAIResponse({ messages, context }: ConversationContext): Promise<AIResponse> {
  try {
    // Don't respond with greeting if it's not the first message
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const sessionId = lastMessage.id.split('-')[0];
      const { intent, techStack, features } = analyzeUserIntent(messages);
      
      // Update conversation memory with technical context
      const memory = conversationMemory.get(sessionId) || {};
      conversationMemory.set(sessionId, {
        ...memory,
        lastIntent: intent,
        technicalContext: {
          frontend: [...(memory.technicalContext?.frontend || []), ...techStack.filter(t => ['react', 'next.js'].includes(t))],
          backend: [...(memory.technicalContext?.backend || []), ...techStack.filter(t => ['node.js', 'express', 'python'].includes(t))],
          infrastructure: [...(memory.technicalContext?.infrastructure || []), ...techStack.filter(t => ['postgresql', 'mongodb'].includes(t))],
          features: [...(memory.technicalContext?.features || []), ...features]
        }
      });

      // Generate contextual response
      const response = generateResponse(intent, techStack, features);

      return {
        content: response,
        shouldStopThinking: intent !== 'general'
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
      content: "I understand your question. Could you provide more details about your specific requirements so I can recommend the best technical solution?",
      shouldStopThinking: true
    };
  }
}
