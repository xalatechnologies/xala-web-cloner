import { Message } from '@/types/chat';

export interface AIResponse {
  content: string;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

const RESTAURANT_SOLUTIONS = {
  features: [
    'Online menu management',
    'Table reservations',
    'Order tracking',
    'Customer reviews',
    'Mobile-responsive design',
    'Integration with delivery services'
  ],
  technologies: [
    'React for dynamic user interface',
    'Supabase for data management',
    'Real-time updates for order status',
    'Secure payment processing'
  ]
};

export async function getAIResponse(messages: Message[], context: string): Promise<AIResponse> {
  try {
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content.toLowerCase();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Handle restaurant-specific queries
    if (query.includes('restaurant') || query.includes('sushi')) {
      return {
        content: `I can help you create a modern website for your sushi restaurant. Here's what we can offer:

1. Essential Features:
${RESTAURANT_SOLUTIONS.features.map(feature => `   - ${feature}`).join('\n')}

2. Technical Implementation:
${RESTAURANT_SOLUTIONS.technologies.map(tech => `   - ${tech}`).join('\n')}

Would you like me to explain any of these features in detail or shall we start with a specific aspect of your website?`,
      };
    }

    // Handle solution requests
    if (query.includes('solution')) {
      return {
        content: `Let's build your restaurant website step by step:

1. First, we'll create a stunning landing page showcasing your restaurant's atmosphere and signature dishes
2. Then, we'll implement an interactive menu system with beautiful food photography
3. Next, we'll add a reservation system for table bookings
4. Finally, we'll integrate online ordering if needed

Which of these would you like to start with?`,
      };
    }

    // Default response for other queries
    return {
      content: `I understand you're interested in building a website. To provide the best solution, could you tell me more about:

1. Your specific requirements (menu, reservations, online ordering?)
2. Your target audience
3. Any special features you'd like to include
4. Your preferred design style`,
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to get AI response');
  }
}