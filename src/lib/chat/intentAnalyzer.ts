export interface BusinessContext {
  type: string;
  requirements: string[];
  businessName?: string;
  cuisine?: string;
}

export function analyzeIntent(message: string): BusinessContext {
  const lowerMessage = message.toLowerCase();
  
  // Initialize context
  const context: BusinessContext = {
    type: 'unknown',
    requirements: []
  };
  
  // Detect restaurant type
  if (lowerMessage.includes('restaurant') || lowerMessage.includes('sushi')) {
    context.type = 'restaurant';
    context.cuisine = lowerMessage.includes('sushi') ? 'sushi' : undefined;
    context.requirements = [
      'menu display',
      'online ordering',
      'reservation system',
      'mobile-friendly design',
      'location and hours',
      'photo gallery'
    ];
  } else if (lowerMessage.includes('website')) {
    context.type = 'website';
    context.requirements = ['responsive design', 'contact form'];
  }
  
  return context;
}