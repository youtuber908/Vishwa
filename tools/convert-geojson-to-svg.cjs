/**
 * Script: convert India states GeoJSON → SVG path data for Vishwa map.
 * Run: node tools/convert-geojson-to-svg.cjs
 * 
 * Uses Natural Earth admin-1 data via geographic projection.
 * Output: src/features/india/IndiaMap/indiaRealPaths.ts
 */
const fs = require('fs');
const path = require('path');

// Tiny Mercator-like projection for India (bounds roughly lat 6-37, lon 68-98)
// We use a simple equirectangular projection scaled to a reasonable viewBox.
function project(lon, lat) {
  const scaleX = 10;
  const scaleY = 10;
  const centerLon = 82;
  const centerLat = 21;
  const x = (lon - centerLon) * scaleX + 500; // center at ~500
  const y = (centerLat - lat) * scaleY + 500;  // center at ~500
  return [x, y];
}

function coordsToPath(coords) {
  return coords.map(pt => pt.map(v => Math.round(v * 100) / 100).join(',')).join(' ');
}

function polygonToPath(polygon) {
  // polygon is array of rings
  const rings = polygon.map(ring => {
    const pts = ring.map(([lon, lat]) => project(lon, lat));
    return pts.map(p => p.join(',')).join(' ');
  });
  // M first point of outer ring, then L for rest, then Z for each ring
  const outerRing = polygon[0];
  const projectedOuter = outerRing.map(([lon, lat]) => project(lon, lat));
  let d = `M ${projectedOuter[0][0].toFixed(1)},${projectedOuter[0][1].toFixed(1)}`;
  for (let i = 1; i < projectedOuter.length; i++) {
    d += ` L ${projectedOuter[i][0].toFixed(1)},${projectedOuter[i][1].toFixed(1)}`;
  }
  d += ' Z';
  return d;
}

function geoJsonToSvgPaths(geojson) {
  const results = {};
  
  geojson.features.forEach(f => {
    const props = f.properties;
    const name = props.name;
    const iso = props.iso_3166_2;
    
    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    
    const geom = f.geometry;
    if (!geom) return;
    
    let d = '';
    
    if (geom.type === 'Polygon') {
      d = polygonToPath(geom.coordinates);
    } else if (geom.type === 'MultiPolygon') {
      d = geom.coordinates.map(poly => polygonToPath(poly)).join(' ');
    }
    
    results[slug] = {
      id: slug,
      name: name,
      iso: iso,
      d: d
    };
  });
  
  return results;
}

// Load the GeoJSON
const geojsonPath = path.join(__dirname, '..', 'src', 'datasets', 'india', 'india-states.geojson');
const raw = fs.readFileSync(geojsonPath, 'utf8');
const geojson = JSON.parse(raw);

const paths = geoJsonToSvgPaths(geojson);

// Compute viewBox bounds
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
Object.values(paths).forEach(p => {
  // Extract all numbers from path
  const nums = p.d.match(/[\d.]+/g);
  if (!nums) return;
  for (let i = 0; i < nums.length; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i + 1]);
    if (isNaN(x) || isNaN(y)) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
});

const padding = 20;
const vbX = Math.floor(minX - padding);
const vbY = Math.floor(minY - padding);
const vbW = Math.ceil(maxX - minX + padding * 2);
const vbH = Math.ceil(maxY - minY + padding * 2);

// Generate output file
let output = `// Auto-generated from Natural Earth admin-1 data
// Projection: equirectangular (simple), viewBox: ${vbX} ${vbY} ${vbW} ${vbH}

export interface IndiaRealPathEntry {
  id: string
  name: string
  iso: string | null
  d: string
}

export const INDIA_REAL_PATHS: Record<string, IndiaRealPathEntry> = ${JSON.stringify(paths, null, 2)};

export const INDIA_MAP_VIEWBOX = '${vbX} ${vbY} ${vbW} ${vbH}';
`;

const outPath = path.join(__dirname, '..', 'src', 'features', 'india', 'IndiaMap', 'indiaRealPaths.ts');
fs.writeFileSync(outPath, output, 'utf8');

console.log(`Generated ${Object.keys(paths).length} region paths`);
console.log(`ViewBox: ${vbX} ${vbY} ${vbW} ${vbH}`);
console.log(`Output: ${outPath}`);

// Print region names for verification
Object.values(paths).forEach(p => {
  console.log(`  ${p.id}: ${p.iso || 'no-iso'} "${p.name}" (path length: ${p.d.length})`);
});
