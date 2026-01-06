/**
 * Text hyphenation utilities for Norwegian language
 * 
 * This module provides functions to automatically insert soft hyphens
 * in Norwegian words to improve line breaking and prevent overflow.
 */

/**
 * Inserts soft hyphens (&shy;) in Norwegian words at appropriate breaking points
 * 
 * @param text - The text to process
 * @param language - The language code (defaults to 'no' for Norwegian)
 * @returns The text with soft hyphens inserted
 */
export function insertSoftHyphens(text: string, language: string = 'no'): string {
  if (language !== 'no' && language !== 'nb' && language !== 'nn') {
    return text;
  }

  // Common Norwegian word breaking patterns
  const breakingPatterns = [
    // Compound word patterns (common in Norwegian)
    /([a-zæøå]{3,})([A-ZÆØÅ][a-zæøå]*)/g, // camelCase boundaries
    // Consonant clusters that can be broken
    /([a-zæøå]{2,})(sk|st|sp|sn|sm|sl|sr|sv|sf|sg|sc|sh|sj|sk|sl|sm|sn|sp|sr|st|sv)([a-zæøå]{2,})/gi,
    // Vowel-consonant patterns
    /([aeiouyæøåAEIOUYÆØÅ]{1,2})([bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ][aeiouyæøåAEIOUYÆØÅ])/gi,
  ];

  let result = text;

  // Apply breaking patterns
  for (const pattern of breakingPatterns) {
    result = result.replace(pattern, (match, p1, p2, p3) => {
      // For compound words with camelCase
      if (p3 !== undefined) {
        return `${p1}${p2}&shy;${p3}`;
      }
      // For consonant clusters
      else if (p2 && p3 === undefined) {
        return `${p1}&shy;${p2}`;
      }
      return match;
    });
  }

  return result;
}

/**
 * Processes service titles for better display in cards
 * 
 * @param title - The original title
 * @param language - The language code
 * @returns The processed title with appropriate hyphenation
 */
export function processServiceTitle(title: string, language: string = 'en'): string {
  // For Norwegian, we want to add hyphenation hints
  if (language === 'no' || language === 'nb' || language === 'nn') {
    // Specific handling for known long Norwegian service titles
    const norwegianTitleMap: Record<string, string> = {
      'Digital Transformasjon': 'Digital Trans&shy;for&shy;masjon',
      'AI & Automatisering': 'AI & Auto&shy;ma&shy;ti&shy;se&shy;ring',
      'Bedriftsintegrasjon': 'Bedrifts&shy;inte&shy;grasjon',
      'Moderne Webapplikasjoner': 'Moderne Web&shy;appli&shy;ka&shy;sjo&shy;ner',
      'Programvareutvikling': 'Program&shy;vare&shy;ut&shy;vikling',
      'Applikasjonsutvikling': 'Appli&shy;kasjons&shy;ut&shy;vikling',
    };

    // Check if we have a specific mapping
    if (norwegianTitleMap[title]) {
      return norwegianTitleMap[title];
    }

    // Otherwise apply general hyphenation
    return insertSoftHyphens(title, language);
  }

  // For other languages, return as is
  return title;
}

/**
 * CSS class for Norwegian text that enables hyphenation
 * 
 * Usage: Add this class to elements containing Norwegian text
 */
export const norwegianHyphenationClass = "hyphenate-no";

/**
 * CSS styles for Norwegian hyphenation
 * 
 * Should be included in your main CSS file:
 * 
 * .hyphenate-no {
 *   hyphens: auto;
 *   word-break: break-word;
 *   overflow-wrap: break-word;
 * }
 */
export const norwegianHyphenationStyles = `
  .hyphenate-no {
    hyphens: auto;
    word-break: break-word;
    overflow-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
  }
  
  /* Ensure proper hyphenation works in all browsers */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .hyphenate-no {
      word-break: break-word;
    }
  }
`;