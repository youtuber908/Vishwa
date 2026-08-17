import fs from 'fs';
import { geoPath, geoEquirectangular } from 'd3-geo';

// Load the GeoJSON that contains all states and UTs
const geojson = JSON.parse(fs.readFileSync('./src/datasets/india/india-states.geojson', 'utf8'));

// Determine which property holds the state/UT name in GeoJSON
// From inspection, it's 'NAME_1'
const nameProp = 'NAME_1';

// Determine bounding box of all coordinates
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

function examineCoordinates(coords) {
  if (Array.isArray(coords[0]) && Array.isArray(coords[0][0]) && typeof coords[0][0][0] === 'number') {
    // Polygon
    for (const ring of coords) {
      for (const point of ring) {
        const [x, y] = point;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  } else {
    // MultiPolygon
    for (const polygon of coords) {
      examineCoordinates(polygon);
    }
  }
}

geojson.features.forEach(f => {
  const coords = f.geometry.coordinates;
  examineCoordinates(coords);
});

console.log(`Bounds: lon [${minX}, ${maxX}], lat [${minY}, ${maxY}]`);

if (minX === Infinity || maxX === -Infinity) {
  console.error('Invalid bounds, check geometry');
  process.exit(1);
}

// Width and height of the viewBox we want to fit into (from the existing code)
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

// Helper to normalize a string to our ID format
function normalizeToId(str) {
  return str
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

// Manual mapping for known mismatches (GeoJSON NAME_1 -> expected id)
const manualMapping = {
  // From previous runs we saw:
  'Orissa': 'odisha',
  'Uttaranchal': 'uttarakhand',
  'Andaman and Nicobar': 'andaman-nicobar',
  // Add any other mismatches we find by comparing the normalized GeoJSON name to the expected id.
};

// We'll create a map from normalized name (from GeoJSON) to list of features (for merging)
const nameToFeatures = {};
geojson.features.forEach(f => {
  const name = f.properties[nameProp];
  if (!name) return;
  const norm = normalizeToId(name);
  if (!nameToFeatures[norm]) {
    nameToFeatures[norm] = [];
  }
  nameToFeatures[norm].push(f);
});

// Load INDIA_REGIONS to get expected IDs and names
const regionsContent = fs.readFileSync('./src/datasets/india/indiaRegions.ts', 'utf8');
const idToNameFromRegions = {};
const lines = regionsContent.split('\n');
for (const line of lines) {
  const match = line.match(/id:\s*'([^']+)'/);
  if (match) {
    const id = match[1];
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    if (nameMatch) {
      idToNameFromRegions[id] = nameMatch[1];
    }
  }
}
console.log(`Loaded ${Object.keys(idToNameFromRegions).length} regions from indiaRegions.ts`);

// Now we also have manual mapping from GeoJSON name to expected id.
const expectedIdToFeatures = {};
// First, initialize with empty arrays for all expected IDs from idToNameFromRegions
for (const expectedId of Object.keys(idToNameFromRegions)) {
  expectedIdToFeatures[expectedId] = [];
}
// Now, for each normalized name from GeoJSON, determine which expected ID it maps to.
for (const [normName, features] of Object.entries(nameToFeatures)) {
  // Find the original GeoJSON name (we have the first feature's name)
  const geoName = features[0].properties[nameProp];
  let expectedId = null;
  // Check manual mapping by original geoName
  if (manualMapping[geoName]) {
    expectedId = manualMapping[geoName];
  } else {
    // Otherwise, assume the normalized name matches the expected ID
    expectedId = normName;
  }
  if (!expectedIdToFeatures[expectedId]) {
    console.warn(`Expected ID ${expectedId} not found in INDIA_REGIONS for GeoJSON name ${geoName}`);
    // We'll skip this feature? Or create a new entry? Let's skip for now.
    continue;
  }
  expectedIdToFeatures[expectedId].push(...features);
}

// Now, for each expected ID, we have a list of features (maybe multiple that we need to merge)
const results = {};
for (const [expectedId, features] of Object.entries(expectedIdToFeatures)) {
  if (features.length === 0) {
    console.warn(`No features found for expected ID: ${expectedId}`);
    continue;
  }
  // Get the name from idToNameFromRegions (or fallback to first feature's name)
  const name = idToNameFromRegions[expectedId] || features[0].properties[nameProp];
  // Merge geometries: we'll create a single MultiPolygon feature by concatenating all coordinates.
  // Each feature's geometry is either Polygon or MultiPolygon.
  const allCoordinates = [];
  for (const f of features) {
    const geom = f.geometry;
    if (geom.type === 'Polygon') {
      // Convert Polygon to MultiPolygon format: [coordinates]
      allCoordinates.push(geom.coordinates);
    } else if (geom.type === 'MultiPolygon') {
      // Already MultiPolygon: coordinates is an array of Polygons
      allCoordinates.push(...geom.coordinates);
    } else {
      console.warn(`Unsupported geometry type: ${geom.type}`);
    }
  }
  // Create a merged feature (we don't need all properties, just geometry)
  const mergedFeature = {
    type: 'Feature',
    geometry: {
      type: 'MultiPolygon',
      coordinates: allCoordinates
    },
    properties: {}
  };
  // Generate path data
  try {
    const pathData = pathGenerator(mergedFeature);
    results[expectedId] = { id: expectedId, name, d: pathData };
  } catch (e) {
    console.error(`Failed to generate path for ${name} (ID: ${expectedId}):`, e.message);
  }
}

console.log(`Generated ${Object.keys(results).length} paths`);

// Check for missing expected IDs
const expectedIds = Object.keys(idToNameFromRegions);
const missing = expectedIds.filter(id => !(id in results));
if (missing.length > 0) {
  console.warn('Missing expected IDs:', missing);
}
// Check for unexpected IDs in results (should not happen if we only output expected IDs)
const unexpected = Object.keys(results).filter(id => !expectedIds.includes(id));
if (unexpected.length > 0) {
  console.warn('Unexpected IDs in results:', unexpected);
}

// Write to a TypeScript file
let output = '// Auto-generated from india-states.geojson (Natural Earth data)\n';
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
