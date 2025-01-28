import type { BusinessContext } from './intentAnalyzer';

export function generateResponse(context: BusinessContext): string {
  if (context.type === 'restaurant') {
    return `I understand you have a restaurant and need a website. We can help you create a modern, attractive website that will help grow your business.

Based on our experience with restaurant websites, here are some key features we recommend:
1. Beautiful menu display with high-quality food photos
2. Online reservation system
3. Online ordering capability
4. Mobile-friendly design
5. Integration with popular delivery platforms

Would you like me to explain more about any of these features? Or shall we discuss your specific requirements?`;
  }

  if (context.type === 'website') {
    return `I can help you create a professional website for your business. To provide the best solution, could you tell me:

1. What type of business do you run?
2. What are the main features you need?
3. Do you have any specific design preferences?

We specialize in creating modern, responsive websites that help businesses grow their online presence.`;
  }

  return `To help you better, could you tell me more about:

1. What type of business do you run?
2. What specific challenges are you trying to solve?
3. What features are most important for your project?

This will help me recommend the most suitable solutions from our service portfolio.`;
}