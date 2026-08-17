import fs from 'fs';
import path from 'path';

// Load the generated paths
import { INDIA_REAL_PATHS } from './src/features/india/IndiaMap/indiaRealPaths.js';

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