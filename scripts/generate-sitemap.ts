import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { generateSitemapXml } from '../src/utils/sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '..', 'public');

// Ensure public directory exists
if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Generate sitemap
const sitemap = generateSitemapXml();

// Write sitemap to file
writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), sitemap);

console.log('Sitemap generated successfully!');
