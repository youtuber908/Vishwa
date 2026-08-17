import type { IndiaMapRegion } from './IndiaMap'

// Placeholder map geometry: a grid of non-overlapping regions.
// Goal for Phase 2: correctness of click + selection + info panel.
// Later phases can replace d with real SVG boundaries.

const makeRectPath = (x: number, y: number, w: number, h: number) => {
  const rx = 18
  // Simple rounded rect path
  return `M ${x + rx} ${y} H ${x + w - rx} Q ${x + w} ${y} ${x + w} ${y + rx} V ${y + h - rx} Q ${x + w} ${y + h} ${x + w - rx} ${y + h} H ${x + rx} Q ${x} ${y + h} ${x} ${y + h - rx} V ${y + rx} Q ${x} ${y} ${x + rx} ${y} Z`
}

const ids = [
  // 28 states
  'andhra-pradesh',
  'arunachal-pradesh',
  'assam',
  'bihar',
  'chhattisgarh',
  'goa',
  'gujarat',
  'haryana',
  'himachal-pradesh',
  'jharkhand',
  'karnataka',
  'kerala',
  'madhya-pradesh',
  'maharashtra',
  'manipur',
  'meghalaya',
  'mizoram',
  'nagaland',
  'odisha',
  'punjab',
  'rajasthan',
  'sikkim',
  'tamil-nadu',
  'telangana',
  'tripura',
  'uttarakhand',
  'uttar-pradesh',
  'west-bengal',
  // 8 UTs
  'andaman-nicobar',
  'chandigarh',
  'dadra-nagar-haveli-and-daman-and-diu',
  'delhi',
  'jammu-kashmir',
  'ladakh',
  'lakshadweep',
  'puducherry',
] as const

const labels: Record<string, string> = {
  'andhra-pradesh': 'Andhra Pradesh',
  'arunachal-pradesh': 'Arunachal Pradesh',
  assam: 'Assam',
  bihar: 'Bihar',
  chhattisgarh: 'Chhattisgarh',
  goa: 'Goa',
  gujarat: 'Gujarat',
  haryana: 'Haryana',
  'himachal-pradesh': 'Himachal Pradesh',
  jharkhand: 'Jharkhand',
  karnataka: 'Karnataka',
  kerala: 'Kerala',
  'madhya-pradesh': 'Madhya Pradesh',
  maharashtra: 'Maharashtra',
  manipur: 'Manipur',
  meghalaya: 'Meghalaya',
  mizoram: 'Mizoram',
  nagaland: 'Nagaland',
  odisha: 'Odisha',
  punjab: 'Punjab',
  rajasthan: 'Rajasthan',
  sikkim: 'Sikkim',
  'tamil-nadu': 'Tamil Nadu',
  telangana: 'Telangana',
  tripura: 'Tripura',
  uttarakhand: 'Uttarakhand',
  'uttar-pradesh': 'Uttar Pradesh',
  'west-bengal': 'West Bengal',
  'andaman-nicobar': 'Andaman & Nicobar',
  chandigarh: 'Chandigarh',
  'dadra-nagar-haveli-and-daman-and-diu': 'Dadra & Nagar Haveli',
  delhi: 'Delhi',
  'jammu-kashmir': 'Jammu & Kashmir',
  ladakh: 'Ladakh',
  lakshadweep: 'Lakshadweep',
  puducherry: 'Puducherry',
}

// grid layout
const cols = 8
// keep within the SVG viewBox (0..1000 x 0..1200)
const cellW = 120
const cellH = 120
const startX = 40
const startY = 60

export const INDIA_MAP_PLACEHOLDER_REGIONS: IndiaMapRegion[] = ids.map((id, idx) => {
  const row = Math.floor(idx / cols)
  const col = idx % cols
  const x = startX + col * (cellW - 6)
  const y = startY + row * (cellH - 10)
  const w = cellW - 20
  const h = cellH - 22
  return {
    id,
    label: labels[id] ?? id,
    d: makeRectPath(x, y, w, h),
  }
})

