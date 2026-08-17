import fs from 'fs';

// Load INDIA_REGIONS by executing the file? Since it's TypeScript, we can't require directly.
// We'll read the file and extract the array using a simple regex for the INDIA_REGIONS assignment.
// Alternatively, we can use the fact that the file exports INDIA_REGIONS and INDIA_REGION_BY_ID.
// We'll just read the file and evaluate it in a Node.js environment? That's tricky.
// Instead, we'll load the file as text and extract the ID and name from each object using regex.
// This is brittle but okay for now.

const regionsText = fs.readFileSync('./src/datasets/india/indiaRegions.ts', 'utf8');
// Find the array assignment: export const INDIA_REGIONS: IndiaRegion[] = [
const regionsMatch = regionsText.match(/export\s+const\s+INDIA_REGIONS\s*:?\s*IndiaRegion\[\]\s*=\s*(\[[\s\S]*?\])/);
if (!regionsMatch) {
  console.error('Could not find INDIA_REGIONS array');
  process.exit(1);
}
const regionsArrayText = regionsMatch[1];
// Now we need to parse this as JSON? It's almost JSON but with trailing commas and function calls.
// We'll replace the F(...) calls with a placeholder object.
// Let's do a more robust extraction: we can split by lines and look for lines that start with '{' and end with '},'
// But given time, we'll assume the format is consistent and we can extract id and name with regex per line.

const lines = regionsText.split('\n');
const regions = [];
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

// Load INDIA_REAL_PATHS
const pathsText = fs.readFileSync('./src/features/india/IndiaMap/indiaRealPaths.ts', 'utf8');
// Extract the object literal after export const INDIA_REAL_PATHS: Record<string, IndiaRealPathEntry> = {
// We'll do similar line-by-line parsing.
const pathsLines = pathsText.split('\n');
const paths = {};
let inPathsObject = false;
let currentId = null;
let currentName = null;
let currentD = null;
let bracedepth = 0;
for (const line of pathsLines) {
  if (line.includes('export const INDIA_REAL_PATHS')) {
    inPathsObject = true;
    continue;
  }
  if (!inPathsObject) continue;
  // Look for the start of the object: {
  // We'll just parse line by line for simplicity: each entry is on its own line? Actually the file is minified? No, it's pretty printed.
  // We'll look for lines that contain a quoted id: "id": {
  const idLineMatch = line.match(/^\s*"([^"]+)"\s*:\s*{/);
  if (idLineMatch) {
    // If we were already in an entry, push the previous one
    if (currentId !== null) {
      paths[currentId] = { name: currentName, d: currentD };
    }
    currentId = idLineMatch[1];
    currentName = null;
    currentD = null;
    continue;
  }
  if (currentId !== null) {
    // Look for name: "name": "..."
    const nameMatch = line.match(/name:\s*"([^"]+)"/);
    if (nameMatch) {
      currentName = nameMatch[1];
    }
    // Look for d: "d": "..."
    const dMatch = line.match(/d:\s*"([^"]+)"/);
    if (dMatch) {
      // The d value may span multiple lines? In the file it's on one line.
      currentD = dMatch[1];
    }
    // Look for closing brace of this entry
    if (line.trim() === '},' || line.trim() === '}') {
      // End of entry
      paths[currentId] = { name: currentName, d: currentD };
      currentId = null;
      currentName = null;
      currentD = null;
    }
  }
}
// Push the last entry if needed
if (currentId !== null) {
  paths[currentId] = { name: currentName, d: currentD };
}

console.log(`Loaded ${Object.keys(paths).length} paths`);

// Now check mapping
console.log('\n--- Mapping check ---');
for (const r of regions) {
  const id = r.id;
  if (paths[id]) {
    console.log(`��✓ ${id}: ${r.name} -> path name: ${paths[id].name}`);
  } else {
    console.log(`��✗ ${id}: ${r.name} -> NO PATH FOUND`);
    // Suggest possible similar IDs
    const similar = Object.keys(paths).filter(p => p.startsWith(id.substring(0, Math.max(1, id.length-2))));
    if (similar.length > 0) {
      console.log(`    Similar IDs: ${similar.slice(0,5).join(', ')}`);
    }
  }
}
console.log('\n--- Extra paths not in regions ---');
for (const pid in paths) {
  if (!regions.some(r => r.id === pid)) {
    console.log(`Extra path: ${pid} -> ${paths[pid].name}`);
  }
}