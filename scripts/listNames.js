import fs from 'fs';

const geojson = JSON.parse(fs.readFileSync('./src/datasets/india/india_state.geojson', 'utf8'));

const names = [];
geojson.features.forEach(f => {
  const name = f.properties.NAME_1;
  if (name) {
    names.push(name);
  }
});
console.log('All names from GEOJSON:');
names.sort().forEach(n => console.log(`- "${n}"`));