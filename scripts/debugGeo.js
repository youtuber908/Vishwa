import fs from 'fs';

const geojson = JSON.parse(fs.readFileSync('./src/datasets/india/india_state.geojson', 'utf8'));
console.log('Number of features:', geojson.features.length);
const f0 = geojson.features[0];
console.log('First feature geometry type:', f0.geometry.type);
console.log('First feature geometry coordinates:', JSON.stringify(f0.geometry.coordinates).substring(0, 200));
console.log('First feature props:', f0.properties);
// Let's also see second feature
const f1 = geojson.features[1];
console.log('Second feature geometry type:', f1.geometry.type);
console.log('Second feature geometry coordinates snippet:', JSON.stringify(f1.geometry.coordinates).substring(0, 200));