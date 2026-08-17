import fs from 'fs';
import { geoPath, geoEquirectangular } from 'd3-geo';

const geojson = JSON.parse(fs.readFileSync('./src/datasets/india/india_state.geojson', 'utf8'));

console.log(`Loaded ${geojson.features.length} features`);

// Determine bounding box of all coordinates
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
geojson.features.forEach(f => {
  const coords = f.geometry.coordinates;
  function examine(coordArray) {
    for (const point of coordArray) {
      const [x, y] = point;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (f.geometry.type === 'Polygon') {
    examine(coords);
  } else if (f.geometry.type === 'MultiPolygon') {
    for (const poly of coords) {
      examine(poly);
    }
  }
});

console.log(`Bounds: lon [${minX}, ${maxX}], lat [${minY}, ${maxY}]`);

// Compute bounding box for scaling
const width = 332;
const height = 328;
const padding = 20; // leaving some margin inside viewBox

// Compute scale to fit bounds into (width - 2*padding) x (height - 2*padding)
const lonRange = maxX - minX;
const latRange = maxY - minY;
const scale = Math.min((width - 2*padding) / lonRange, (height - 2*padding) / latRange);

// Create path generator using equirectangular projection
const projection = geoEquirectangular()
  .scale(scale)
  .translate([
    padding - minX * scale,
    height - padding + maxY * scale // Note: y increases downwards in SVG
  ]);

const pathGenerator = geoPath().projection(projection);

const results = {};

geojson.features.forEach(f => {
  const props = f.properties;
  // Get name, try to get official name
  let name = props.name || props.name_en;
  if (!name) {
    // fallback
    name = props.NAME || props.NAME_EN;
  }
  if (!name) {
    console.warn('Feature missing name:', props);
    return;
  }
  // Normalize name to match our region ids: lower case, replace spaces and special chars with hyphens
  const id = name
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');

  // Generate path data
  try {
    const pathData = pathGenerator({type: 'Feature', geometry: f.geometry, properties: {}});
    results[id] = { id, name, d: pathData };
  } catch (e) {
    console.error(`Failed to generate path for ${name}:`, e.message);
  }
});

console.log(`Generated ${Object.keys(results).length} paths`);

// Write to a TypeScript file
let output = '// Auto-generated from official India state GeoJSON (Survey of India standard)\n';
// We'll keep same viewBox comment as before
output += '// Projection: equirectangular (simple), viewBox: 341 335 332 328\n\n';
output += 'export interface IndiaRealPathEntry {\n';
output += '  id: string\n';
output += '  name: string\n';
output += '  iso: string | null\n';
output += '  d: string\n';
output += '}\n\n';
output += 'export const INDIA_REAL_PATHS: Record<string, IndiaRealPathEntry> = {\n';
const entries = Object.values(results).sort((a, b) => a.id.localeCompare(b.id));
entries.forEach(entry => {
  // Escape quotes and newlines in d if needed
  const d = entry.d.replace(/"/g, '\\"');
  output += `  "${entry.id}": {\n`;
  output += `    id: "${entry.id}",\n`;
  output += `    name: "${entry.name.replace(/"/g, '\\"')}",\n`;
  output += `    iso: null,\n`;
  output += `    d: "${d}"\n`;
  output += `  },\n`;
});
output += '};\n';

fs.writeFileSync('./src/features/india/IndiaMap/indiaRealPaths.ts', output);
console.log('Written to src/features/india/IndiaMap/indiaRealPaths.ts');