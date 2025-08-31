# Service Images

This directory contains AI-generated images for service cards on the Xala website.

## Current Implementation

The service cards now support displaying images alongside the existing icon and text content. The images are displayed at the top of each card with a hover effect.

## How to Add AI-Generated Images

1. **Generate Images**: Use the prompts in the root `AI_SERVICE_IMAGE_PROMPTS.md` file to generate images for each service.

2. **Save Images**: Save the generated images in this directory with the following naming convention:
   - digital-transformation.jpg
   - ai-automation.jpg
   - enterprise-integration.jpg
   - web-applications.jpg

3. **Update Database**: Add the image URLs to the services table in Supabase:
   ```sql
   UPDATE services 
   SET image_url = '/services/digital-transformation.jpg' 
   WHERE slug = 'digital-transformation';
   ```

## Image Specifications

- Format: JPG or PNG
- Minimum size: 800x600 pixels
- Aspect ratio: 4:3
- Style: Professional, clean, modern
- Color scheme: Consistent with Xala brand

## Fallback

If no image is provided for a service, the card will display normally without an image, showing only the icon, title, and description.