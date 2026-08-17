import fs from 'fs';

const geojson = JSON.parse(fs.readFileSync('./src/datasets/india/india_state.geojson', 'utf8'));

const names = [];
geojson.features.forEach(f => {
  const name = f.properties.NAME_1;
  if (name) {
    names.push(name);
  }
});
names.sort();
console.log('All names in GeoJSON:');
names.forEach((n, i) => {
  console.log(`${i+1}: ${n}`);
});