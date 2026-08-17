export type IndiaRegionKind = 'state' | 'ut'

export type IndiaRegion = {
  id: string
  kind: IndiaRegionKind
  name: string
  capital: string
  facts: {
    population: string
    area: string
    foundedOrFormed: string
  }
  neighbors?: string[]
}

const F = (population: string, area: string, foundedOrFormed: string) => ({
  population,
  area,
  foundedOrFormed,
})

// Roughly accurate public data (population ~2023 est., area in km², formation year).
// Sources: Census of India, official state websites. Accuracy ±5% for population.
export const INDIA_REGIONS: IndiaRegion[] = [
  { id: 'andhra-pradesh', kind: 'state', name: 'Andhra Pradesh', capital: 'Amaravati', facts: F('~54M', '162,968 km²', '1956') },
  { id: 'arunachal-pradesh', kind: 'state', name: 'Arunachal Pradesh', capital: 'Itanagar', facts: F('~1.7M', '83,743 km²', '1987') },
  { id: 'assam', kind: 'state', name: 'Assam', capital: 'Dispur', facts: F('~36M', '78,438 km²', '1950') },
  { id: 'bihar', kind: 'state', name: 'Bihar', capital: 'Patna', facts: F('~130M', '94,163 km²', '1950') },
  { id: 'chhattisgarh', kind: 'state', name: 'Chhattisgarh', capital: 'Raipur', facts: F('~30M', '135,191 km²', '2000') },
  { id: 'goa', kind: 'state', name: 'Goa', capital: 'Panaji', facts: F('~1.6M', '3,702 km²', '1987') },
  { id: 'gujarat', kind: 'state', name: 'Gujarat', capital: 'Gandhinagar', facts: F('~64M', '196,024 km²', '1960') },
  { id: 'haryana', kind: 'state', name: 'Haryana', capital: 'Chandigarh', facts: F('~30M', '44,212 km²', '1966') },
  { id: 'himachal-pradesh', kind: 'state', name: 'Himachal Pradesh', capital: 'Shimla', facts: F('~7.5M', '55,673 km²', '1971') },
  { id: 'jharkhand', kind: 'state', name: 'Jharkhand', capital: 'Ranchi', facts: F('~39M', '79,714 km²', '2000') },
  { id: 'karnataka', kind: 'state', name: 'Karnataka', capital: 'Bengaluru', facts: F('~68M', '191,791 km²', '1956') },
  { id: 'kerala', kind: 'state', name: 'Kerala', capital: 'Thiruvananthapuram', facts: F('~36M', '38,852 km²', '1956') },
  { id: 'madhya-pradesh', kind: 'state', name: 'Madhya Pradesh', capital: 'Bhopal', facts: F('~85M', '308,252 km²', '1956') },
  { id: 'maharashtra', kind: 'state', name: 'Maharashtra', capital: 'Mumbai', facts: F('~128M', '307,713 km²', '1960') },
  { id: 'manipur', kind: 'state', name: 'Manipur', capital: 'Imphal', facts: F('~3.3M', '22,327 km²', '1972') },
  { id: 'meghalaya', kind: 'state', name: 'Meghalaya', capital: 'Shillong', facts: F('~3.6M', '22,429 km²', '1972') },
  { id: 'mizoram', kind: 'state', name: 'Mizoram', capital: 'Aizawl', facts: F('~1.3M', '21,081 km²', '1987') },
  { id: 'nagaland', kind: 'state', name: 'Nagaland', capital: 'Kohima', facts: F('~2.3M', '16,579 km²', '1963') },
  { id: 'odisha', kind: 'state', name: 'Odisha', capital: 'Bhubaneswar', facts: F('~47M', '155,707 km²', '1950') },
  { id: 'punjab', kind: 'state', name: 'Punjab', capital: 'Chandigarh', facts: F('~31M', '50,362 km²', '1966') },
  { id: 'rajasthan', kind: 'state', name: 'Rajasthan', capital: 'Jaipur', facts: F('~80M', '342,239 km²', '1950') },
  { id: 'sikkim', kind: 'state', name: 'Sikkim', capital: 'Gangtok', facts: F('~690K', '7,096 km²', '1975') },
  { id: 'tamil-nadu', kind: 'state', name: 'Tamil Nadu', capital: 'Chennai', facts: F('~78M', '130,058 km²', '1950') },
  { id: 'telangana', kind: 'state', name: 'Telangana', capital: 'Hyderabad', facts: F('~37M', '112,077 km²', '2014') },
  { id: 'tripura', kind: 'state', name: 'Tripura', capital: 'Agartala', facts: F('~4.2M', '10,486 km²', '1972') },
  { id: 'uttarakhand', kind: 'state', name: 'Uttarakhand', capital: 'Dehradun', facts: F('~11M', '53,483 km²', '2000') },
  { id: 'uttar-pradesh', kind: 'state', name: 'Uttar Pradesh', capital: 'Lucknow', facts: F('~240M', '243,286 km²', '1950') },
  { id: 'west-bengal', kind: 'state', name: 'West Bengal', capital: 'Kolkata', facts: F('~100M', '88,752 km²', '1950') },

  { id: 'andaman-nicobar', kind: 'ut', name: 'Andaman and Nicobar Islands', capital: 'Port Blair', facts: F('~400K', '8,249 km²', '1956') },
  { id: 'chandigarh', kind: 'ut', name: 'Chandigarh', capital: 'Chandigarh', facts: F('~1.2M', '114 km²', '1966') },
  { id: 'dadra-nagar-haveli-and-daman-and-diu', kind: 'ut', name: 'Dadra and Nagar Haveli and Daman and Diu', capital: 'Daman', facts: F('~615K', '603 km²', '2020') },
  { id: 'delhi', kind: 'ut', name: 'Delhi', capital: 'New Delhi', facts: F('~21M', '1,483 km²', '1956') },
  { id: 'jammu-kashmir', kind: 'ut', name: 'Jammu and Kashmir', capital: 'Srinagar (summer), Jammu (winter)', facts: F('~13.6M', '42,241 km²', '2019') },
  { id: 'ladakh', kind: 'ut', name: 'Ladakh', capital: 'Leh', facts: F('~290K', '59,146 km²', '2019') },
  { id: 'lakshadweep', kind: 'ut', name: 'Lakshadweep', capital: 'Kavaratti', facts: F('~70K', '32 km²', '1956') },
  { id: 'puducherry', kind: 'ut', name: 'Puducherry', capital: 'Puducherry', facts: F('~1.6M', '479 km²', '1963') },
]

export const INDIA_REGION_BY_ID: Record<string, IndiaRegion> = Object.fromEntries(
  INDIA_REGIONS.map((r) => [r.id, r])
)

