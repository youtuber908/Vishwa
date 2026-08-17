const fs = require('fs');

// Read the generated paths file as text
const content = fs.readFileSync('./src/features/india/IndiaMap/indiaRealPaths.ts', 'utf8');

// Count how many region entries we have by looking for the pattern of an id followed by opening brace
const regionPattern = /"[^"]+":\s*{/g;
const matches = content.match(regionPattern);
const count = matches ? matches.length : 0;

console.log(`Found ${count} region entries in indiaRealPaths.ts`);

// Also load the regions from INDIA_REGIONS to compare
const regionsContent = fs.readFileSync('./src/datasets/india/indiaRegions.ts', 'utf8');
const regionMatches = regionsContent.match(/id:\s*'[^']+'/g);
const expectedCount = regionMatches ? regionMatches.length : 0;

console.log(`Expected ${expectedCount} regions from INDIA_REGIONS`);

if (count === expectedCount) {
  console.log('✅ Region count matches!');
} else {
  console.log('❌ Region count mismatch!');
  process.exit(1);
}