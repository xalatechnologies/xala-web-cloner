import type { BusinessContext } from './intentAnalyzer';

export function generateResponse(context: BusinessContext): string {
  if (context.type === 'restaurant') {
    const cuisineType = context.cuisine ? `${context.cuisine} restaurant` : 'restaurant';
    
    return `I understand you have a ${cuisineType} and need a website. We can help you create a modern, attractive website that will help grow your business.

Based on our experience with restaurant websites, here are some key features we recommend:
1. Beautiful menu display with high-quality food photos
2. Online reservation system
3. Online ordering capability
4. Mobile-friendly design
5. Integration with popular delivery platforms
6. Location and hours section
7. Photo gallery to showcase your dishes
8. Customer reviews integration
9. Social media integration
10. Contact form and newsletter signup

Would you like me to explain more about any of these features? Or shall we discuss your specific requirements for your ${cuisineType} website?`;
  }

  if (context.type === 'website') {
    return `I can help you create a professional website for your business. To provide the best solution, could you tell me:

1. What type of business do you run?
2. What are the main features you need?
3. Do you have any specific design preferences?

We specialize in creating modern, responsive websites that help businesses grow their online presence.`;
  }

  return `To help you better understand how we can assist you, could you tell me more about:

1. What type of business do you run? (e.g., restaurant, retail, services)
2. What are your main goals for the website? (e.g., online orders, reservations, information)
3. What specific features are most important to you?

This will help me recommend the most suitable solutions for your needs.`;
}