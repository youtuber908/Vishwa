const fs = require('fs');

// Read the generated paths file as text
const content = fs.readFileSync('./src/features/india/IndiaMap/indiaRealPaths.ts', 'utf8');

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
    // Check if the region ID appears in the file with a path definition
    const pattern = `"${id}":\\s*{[^}]*d:\\s*"[^"]*"`;
    const regex = new RegExp(pattern);
    const match = content.match(regex);

    if (match && match[0]) {
      // Extract the d value to verify it's not empty
      const dMatch = match[0].match(/d:\s*"([^"]*)"/);
      if (dMatch && dMatch[1] && dMatch[1].length > 0) {
        // Also try to get the name
        const nameMatch = match[0].match(/name:\s*"([^"]*)"/);
        const name = nameMatch ? nameMatch[1] : id;
        console.log(`  ✓ ${id}: ${name} (path present)`);
      } else {
        console.log(`  ✗ ${id}: PATH APPEARS TO BE EMPTY`);
        allGood = false;
      }
    } else {
      console.log(`  ✗ ${id}: NOT FOUND IN PATHS`);
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