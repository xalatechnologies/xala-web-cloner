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
  if (lastMessage.includes('how') || lastMessage.includes('implement')) {
    intent = 'implementation';
  } else if (lastMessage.includes('architecture') || lastMessage.includes('design')) {
    intent = 'architecture';
  } else if (lastMessage.includes('cost') || lastMessage.includes('price')) {
    intent = 'pricing';
  } else if (lastMessage.includes('time') || lastMessage.includes('long')) {
    intent = 'timeline';
  }

  return { intent, techStack, features };
}

function generateTechnicalResponse(intent: string, techStack: string[], features: string[]): string {
  switch (intent) {
    case 'implementation':
      return `### Implementation Approach

#### Frontend Architecture
${techStack.includes('react') ? '✓ React.js with Next.js for optimal performance and SEO' : '**Recommended: React.js with Next.js for:**'}
- Server-side rendering for better performance
- Static site generation for marketing pages
- API routes for backend functionality
${features.includes('real-time-updates') ? '- WebSocket integration for real-time features' : ''}

#### Backend Services
${techStack.includes('node.js') ? '✓ Node.js with Express for:' : '**Recommended: Node.js with Express for:**'}
- RESTful API development
- GraphQL support for flexible data querying
- Microservices architecture
${features.includes('machine-learning') ? '- Python microservice for ML functionality' : ''}

#### Data Layer
${techStack.includes('postgresql') ? '✓ PostgreSQL for:' : '**Recommended: PostgreSQL for:**'}
- Relational data storage
- ACID compliance
- Complex queries
${features.includes('caching') ? '- Redis for caching and performance' : ''}

Would you like me to elaborate on any of these components?`;

    case 'architecture':
      return `### System Architecture

#### Infrastructure Layer
\`\`\`mermaid
graph TD
    A[Client] --> B[CDN]
    B --> C[Load Balancer]
    C --> D[API Gateway]
    D --> E[Services]
    E --> F[Database]
    E --> G[Cache]
\`\`\`

#### Key Components
1. **Containerization**
   - Docker for consistent deployment
   - Kubernetes for orchestration
   - ${features.includes('cloud-scaling') ? '✓ Auto-scaling configuration' : 'Manual scaling'}

2. **Application Structure**
   - Microservices architecture
   - API Gateway pattern
   - CDN integration
   ${features.includes('caching') ? '- Distributed caching layer' : ''}

3. **Security Measures**
   - JWT authentication
   - Role-based access control
   ${features.includes('encryption') ? '- End-to-end encryption' : ''}
   - Regular security audits

Would you like to dive deeper into any of these areas?`;

    default:
      return `### Project Requirements Analysis

To provide the most relevant technical recommendations, please share more details about:

1. **Scalability Requirements**
   - Expected user load
   - Growth projections
   - Geographic distribution

2. **Performance Expectations**
   - Response time targets
   - Concurrent user goals
   - Data processing needs

3. **Security Needs**
   - Authentication requirements
   - Data protection standards
   - Compliance requirements

4. **Integration Requirements**
   - External systems
   - APIs needed
   - Data formats

This will help me suggest the optimal technical approach using our stack.`;
  }
}

export async function getAIResponse({ messages, context }: ConversationContext): Promise<AIResponse> {
  try {
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
    const response = generateTechnicalResponse(intent, techStack, features);

    return {
      content: response,
      shouldStopThinking: intent !== 'general'
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    return {
      content: "I understand your question. Could you provide more details about your specific requirements so I can recommend the best technical solution?",
      shouldStopThinking: true
    };
  }
}
