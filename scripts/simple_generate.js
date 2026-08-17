import fs from 'fs';
import { geoPath, geoEquirectangular } from 'd3-geo';

console.log('Starting generation...');

// Load the GeoJSON
const geojson = JSON.parse(fs.readFileSync('./src/datasets/india/india-states.geojson', 'utf8'));
console.log('Loaded', geojson.features.length, 'features');

// Simple approach: just create a basic entry for Ladakh since that's what's missing
const ladakhFeature = geojson.features.find(f => f.properties.name === 'Ladakh');
if (ladakhFeature) {
  console.log('Found Ladakh feature');
} else {
  console.log('Ladakh feature not found!');
}

// Write a minimal file with just Ladakh for testing
let output = '// Auto-generated test file\n';
output += '// Projection: equirectangular (simple), viewBox: 341 335 332 328\n\n';
output += 'export interface IndiaRealPathEntry {\n';
output += '  id: string\n';
output += '  name: string\n';
output += '  iso: string | null\n';
output += '  d: string\n';
output += '}\n\n';
output += 'export const INDIA_REAL_PATHS: Record<string, IndiaRealPathEntry> = {\n';
// Add a simple test entry
output += `  "ladakh": {\n`;
output += `    id: "ladakh",\n`;
output += `    name: "Ladakh",\n`;
output += `    iso: null,\n`;
output += `    d: "M0,0 L10,0 L10,10 L0,10 Z"\n`; // Simple square path
output += `  },\n`;
output += '};\n';

// Add the viewBox export
output += '\nexport const INDIA_MAP_VIEWBOX = [341, 335, 332, 328];\n';

fs.writeFileSync('./src/features/india/IndiaMap/indiaRealPaths.ts', output);
console.log('Written test file');
