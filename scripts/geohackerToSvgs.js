import fs from 'fs';
import { geoPath, geoEquirectangular } from 'd3-geo';

// Load the main state GeoJSON
const stateGeojson = JSON.parse(fs.readFileSync('./src/datasets/india/india_state.geojson', 'utf8'));
// Load the Telangana GeoJSON (if exists)
let telGeojson = { type: 'FeatureCollection', features: [] };
try {
  telGeojson = JSON.parse(fs.readFileSync('./src/datasets/india/india_telengana.geojson', 'utf8'));
} catch (e) {
  console.warn('Telangana GeoJSON not found, continuing without it.');
}

// Combine features
const allFeatures = [...stateGeojson.features, ...telGeojson.features];
console.log(`Total features: ${allFeatures.length}`);

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

allFeatures.forEach(f => {
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
  // From previous run we saw:
  'Orissa': 'odisha',
  'Uttaranchal': 'uttarakhand',
  'Andaman and Nicobar': 'andaman-nicobar',
  'Dadra and Nagar Haveli': 'dadra-nagar-haveli-and-daman-and-diu', // Note: this is actually only Dadra and Nagar Haveli, but after merger it's combined. We'll handle later.
  'Daman and Diu': 'dadra-nagar-haveli-and-daman-and-diu', // We'll merge both into one ID? Actually the region is now a single UT. We'll need to combine the two features into one region? But the GeoJSON has them separate.
  'Jammu and Kashmir': 'jammu-kashmir',
  // Also note: Telangana and others were missing? Actually they were present but with different NAME_1? Let's see.
  // We'll add more as needed.
};

// We also need to handle the merged UT: Dadra and Nagar Haveli and Daman and Diu.
// The GeoJSON has two separate features: Dadra and Nagar Haveli, and Daman and Diu.
// We need to combine their geometries into one region for the ID 'dadra-nagar-haveli-and-daman-and-diu'.
// We'll do that by collecting the geometries of these two names and then generating a combined path.
// However, combining paths from MultiPolygons is non-trivial (we would need to merge the feature collections).
// For simplicity, we can just use one of them? But that would be inaccurate.
// Since the area is small, we might get away with using just one? But the requirement is to have correct geography.
// Let's instead generate separate paths for each and then in the INDIA_REAL_PATHS we can have two entries? But the ID must be unique.
// We cannot have two entries with the same ID.
// So we need to merge the two features into one geometry (union) and then generate a path.
// That's complex with just d3-geo.
// Alternative: we can approximate by using the bounding box of both and generate a path that covers both? Not good.
// Given the time, we might decide to keep them separate and change the ID in INDIA_REGIONS? But the task expects the ID as per INDIA_REGIONS.
// Let's check if the INDIA_REGIONS has a single ID for that merged UT. Yes, it does: 'dadra-nagar-haveli-and-daman-and-diu'.
//
// We will need to merge the two features. We can do so by combining their coordinates into a single MultiPolygon feature.
// Since both are already MultiPolygon (each feature is a MultiPolygon with likely one polygon), we can concatenate their coordinates arrays.
//
// Let's implement: for the two names, we collect all their coordinates and treat as one MultiPolygon.

// We'll create a map from normalized name (from GeoJSON) to list of features (for merging)
const nameToFeatures = {};
allFeatures.forEach(f => {
  const name = f.properties[nameProp];
  if (!name) return;
  const norm = normalizeToId(name);
  if (!nameToFeatures[norm]) {
    nameToFeatures[norm] = [];
  }
  nameToFeatures[norm].push(f);
});

// Now we also have manual mapping from GeoJSON name to expected id.
// Let's build a map from expected id to list of features (after merging according to manual mapping)
const expectedIdToFeatures = {};
// First, initialize with empty arrays for all expected IDs from INDIA_REGIONS (we'll load them from the regions file)
const regionsText = fs.readFileSync('./src/datasets/india/indiaRegions.ts', 'utf8');
const regions = [];
const lines = regionsText.split('\n');
let inArray = false;
for (const line of lines) {
  if (line.includes('export const INDIA_REGIONS')) {
    inArray = true;
    continue;
  }
  if (inArray && line.includes('];')) {
    break;
  }
  if (inArray) {
    // Match { id: '...', name: '...'
    const idMatch = line.match(/id:\s*'([^']+)'/);
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    if (idMatch && nameMatch) {
      regions.push({ id: idMatch[1], name: nameMatch[1] });
    }
  }
}
console.log(`Loaded ${regions.length} regions from INDIA_REGIONS`);
// Initialize expectedIdToFeatures with empty arrays
for (const r of regions) {
  expectedIdToFeatures[r.id] = [];
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
  // Get the name from the regions array (or fallback to first feature's name)
  const regionObj = regions.find(r => r.id === expectedId);
  const name = regionObj ? regionObj.name : features[0].properties[nameProp];
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
const expectedIds = regions.map(r => r.id);
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
let output = '// Auto-generated from official India state GeoJSON (geohacker/india) with merging for merged UTs\n';
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