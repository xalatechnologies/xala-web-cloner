import { Message } from '@/types/chat';

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
    const query = lastMessage.content.toLowerCase();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (query.includes('api')) {
      return {
        content: "An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other. Here are the key points about APIs:\n\n1. Types of APIs:\n   - REST APIs: Most common for web services\n   - GraphQL: Modern, flexible query language\n   - SOAP: Enterprise-grade protocol\n\n2. Common Use Cases:\n   - Data exchange between systems\n   - Third-party integrations\n   - Microservices communication\n\nWould you like to know more about any specific type of API or implementation details?",
        sources: [
          {
            title: "RESTful API Design Guide",
            url: "https://restfulapi.net/"
          },
          {
            title: "GraphQL vs REST",
            url: "https://www.apollographql.com/blog/graphql-vs-rest/"
          }
        ]
      };
    }

    if (query.includes('architecture') || query.includes('system design')) {
      return {
        content: "Based on your requirements, I recommend considering a microservices architecture for the following reasons:\n\n1. Scalability: Each service can be scaled independently\n2. Flexibility: Teams can use different technologies for different services\n3. Resilience: Failures are isolated to individual services\n4. Deployment: Services can be deployed independently\n\nWould you like me to elaborate on any of these points?",
        sources: [
          {
            title: "Microservices Architecture Guide",
            url: "https://microservices.io/patterns/microservices.html"
          },
          {
            title: "Scaling with Microservices",
            url: "https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices"
          }
        ]
      };
    }

    // Default response for other queries
    return {
      content: "I'd be happy to help you understand more about " + query + ". To provide the most relevant information, could you specify:\n\n1. Your current use case or project context\n2. Any specific challenges you're facing\n3. Your technical requirements\n4. Performance or scaling needs",
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to get AI response');
  }
}