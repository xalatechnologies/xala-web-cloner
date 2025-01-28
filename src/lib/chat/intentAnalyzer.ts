export interface BusinessContext {
  type: string;
  requirements: string[];
}

export function analyzeIntent(message: string): BusinessContext {
  const lowerMessage = message.toLowerCase();
  
  // Detect business type
  let type = 'unknown';
  const requirements: string[] = [];
  
  if (lowerMessage.includes('restaurant') || lowerMessage.includes('sushi')) {
    type = 'restaurant';
    requirements.push('menu display', 'online ordering', 'reservation system');
  } else if (lowerMessage.includes('website')) {
    type = 'website';
    requirements.push('responsive design', 'contact form');
  }
  
  return { type, requirements };
}