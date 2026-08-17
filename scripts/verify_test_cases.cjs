const vm = require('vm');
const fs = require('fs');

// Read the generated paths file
const content = fs.readFileSync('./src/features/india/IndiaMap/indiaRealPaths.ts', 'utf8');
// Replace the export statement with a let assignment so we can capture it
const modified = content.replace(/export const INDIA_REAL_PATHS/, 'let INDIA_REAL_PATHS');
// Also remove the export for INDIA_MAP_VIEWBOX if we don't need it, but we can leave it as it won't hurt
// We'll create a context and run the modified code
const context = { INDIA_REAL_PATHS: null };
vm.runInNewContext(modified, context);
const INDIA_REAL_PATHS = context.INDIA_REAL_PATHS;

if (!INDIA_REAL_PATHS) {
  console.error('Failed to extract INDIA_REAL_PATHS from the generated file');
  process.exit(1);
}

const testCases = [
  { description: 'Northwest -> Rajasthan', ids: ['rajasthan'] },
  { description: 'Southern tip -> Tamil Nadu/Kerala', ids: ['tamil-nadu', 'kerala'] },
  { description: 'Northeast -> Assam/Arunachal Pradesh', ids: ['assam', 'arunachal-pradesh'] },
  { description: 'Northernmost -> J&K/Ladakh', ids: ['jammu-kashmir', 'ladakh'] },
  { description: 'Western coast -> Gujarat/Maharashtra', ids: ['gujarat', 'maharashtra'] },
  { description: 'Central-eastern Gangetic plain -> UP/Bihar', ids: ['uttar-pradesh', 'bihar'] }
];

console.log('Verifying test case regions exist in generated paths...');
let allGood = true;

for (const { description, ids } of testCases) {
  console.log(`\n${description}:`);
  for (const id of ids) {
    const entry = INDIA_REAL_PATHS[id];
    if (entry && entry.d && entry.d.length > 0) {
      console.log(`  ✓ ${id}: ${entry.name} (path length: ${entry.d.length})`);
    } else {
      console.log(`  ✗ ${id}: MISSING or EMPTY PATH`);
      allGood = false;
    }
  }
}

if (allGood) {
  console.log('\n✅ All test case regions are present with valid path data.');
} else {
  console.log('\n❌ Some test case regions are missing or have empty path data.');
  process.exit(1);
}