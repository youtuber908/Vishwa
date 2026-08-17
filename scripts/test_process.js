import fs from 'fs';
import { geoPath, geoEquirectangular } from 'd3-geo';

// Test with just one feature first
const geojson = JSON.parse(fs.readFileSync('./src/datasets/india/india-states.geojson', 'utf8'));
console.log('Total features:', geojson.features.length);

// Let's process the first few features to see what we get
const nameProp = 'name';

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

// Check first 3 features
for (let i = 0; i < Math.min(3, geojson.features.length); i++) {
  const f = geojson.features[i];
  console.log(`Feature ${i}: ${f.properties[nameProp]}`);
  examineCoordinates(f.geometry.coordinates);
}

console.log(`Bounds: lon [${minX}, ${maxX}], lat [${minY}, ${maxY}]`);

// Create path generator for first feature
const width = 332;
const height = 328;
const padding = 20;
const lonRange = maxX - minX;
const latRange = maxY - minY;
const scale = Math.min((width - 2*padding) / lonRange, (height - 2*padding) / latRange);

const projection = geoEquirectangular()
  .scale(scale)
  .translate([
    padding - minX * scale,
    height - padding + maxY * scale
  ]);

const pathGenerator = geoPath().projection(projection);

// Test with first feature
const firstFeature = geojson.features[0];
const pathData = pathGenerator(firstFeature);
console.log(`Path data for ${firstFeature.properties[nameProp]}:`, pathData.substring(0, 100) + '...');
