/**
 * Centralized contact information configuration
 * 
 * This file contains all contact details used across the website
 * to ensure consistency and easy maintenance.
 */

export const CONTACT_CONFIG = {
  /**
   * Primary phone number in international format
   * Format: +47 966 65 001
   */
  phone: '+47 966 65 001',
  
  /**
   * Phone number formatted for tel: links (no spaces)
   * Format: +4796665001
   */
  phoneTel: '+4796665001',
  
  /**
   * Phone number formatted for structured data (with hyphens)
   * Format: +47-966-65-001
   */
  phoneStructured: '+47-966-65-001',
  
  /**
   * Primary email address
   */
  email: 'Info@xala.no',
  
  /**
   * Email address in lowercase (for some systems)
   */
  emailLowercase: 'info@xala.no',
} as const;
