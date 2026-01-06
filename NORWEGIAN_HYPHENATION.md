# Norwegian Title Hyphenation Implementation

## Problem
Norwegian titles in service cards were overflowing their boundaries due to long compound words like:
- "Programvareutvikling"
- "Applikasjonsutvikling"

## Solution
Implemented a comprehensive hyphenation system that includes:

### 1. Text Processing Utility
The `src/utils/text-hyphenation.ts` file contains functions to:
- Insert soft hyphens (`&shy;`) at appropriate breaking points
- Handle specific known Norwegian compound words
- Process titles based on language

### 2. Specific Word Handling
Added explicit handling for the problematic words:
- "Programvareutvikling" → "Program&shy;vare&shy;ut&shy;vikling"
- "Applikasjonsutvikling" → "Appli&shy;kasjons&shy;ut&shy;vikling"

### 3. CSS Enhancements
Updated CSS to ensure proper hyphenation:
- Added `hyphens: auto` property
- Included vendor prefixes for cross-browser compatibility
- Added `word-break: break-word` and `overflow-wrap: break-word`

### 4. Component Integration
Modified `ServiceCard.tsx` to:
- Import and use the text processing utility
- Process titles based on language
- Render processed titles with `dangerouslySetInnerHTML`

## How It Works
1. ServiceCard receives a title and language prop
2. If language is Norwegian ('no', 'nb', or 'nn'), the title is processed
3. Known compound words are replaced with hyphenated versions
4. CSS ensures proper line breaking and hyphenation display

## Testing
Created a test component at `src/components/services/TestHyphenation.tsx` to verify the implementation.

## Result
Norwegian titles now properly break at syllable boundaries:
- "Programvareutvikling" displays as "Program- vare- utvikling"
- "Applikasjonsutvikling" displays as "Appli- kasjons- utvikling"

This prevents overflow while maintaining readability.