// Canonical list of the 63 designated US national parks, used by the in-app
// "Request a park" form to offer a searchable select. This is reference data
// for the request flow only — NOT a `Park` (that richer shape lives in
// types.ts and is filled in by the add-park pipeline once a request lands).
//
// `slug` follows the same kebab-case convention as the files in parks/, so the
// request form can filter out parks already present in PARKS by slug.

export interface NationalPark {
  name: string;
  slug: string;
  state: string;
}

export const NATIONAL_PARKS: NationalPark[] = [
  { name: 'Acadia', slug: 'acadia', state: 'Maine' },
  { name: 'American Samoa', slug: 'american-samoa', state: 'American Samoa' },
  { name: 'Arches', slug: 'arches', state: 'Utah' },
  { name: 'Badlands', slug: 'badlands', state: 'South Dakota' },
  { name: 'Big Bend', slug: 'big-bend', state: 'Texas' },
  { name: 'Biscayne', slug: 'biscayne', state: 'Florida' },
  { name: 'Black Canyon of the Gunnison', slug: 'black-canyon-of-the-gunnison', state: 'Colorado' },
  { name: 'Bryce Canyon', slug: 'bryce-canyon', state: 'Utah' },
  { name: 'Canyonlands', slug: 'canyonlands', state: 'Utah' },
  { name: 'Capitol Reef', slug: 'capitol-reef', state: 'Utah' },
  { name: 'Carlsbad Caverns', slug: 'carlsbad-caverns', state: 'New Mexico' },
  { name: 'Channel Islands', slug: 'channel-islands', state: 'California' },
  { name: 'Congaree', slug: 'congaree', state: 'South Carolina' },
  { name: 'Crater Lake', slug: 'crater-lake', state: 'Oregon' },
  { name: 'Cuyahoga Valley', slug: 'cuyahoga-valley', state: 'Ohio' },
  { name: 'Death Valley', slug: 'death-valley', state: 'California · Nevada' },
  { name: 'Denali', slug: 'denali', state: 'Alaska' },
  { name: 'Dry Tortugas', slug: 'dry-tortugas', state: 'Florida' },
  { name: 'Everglades', slug: 'everglades', state: 'Florida' },
  { name: 'Gates of the Arctic', slug: 'gates-of-the-arctic', state: 'Alaska' },
  { name: 'Gateway Arch', slug: 'gateway-arch', state: 'Missouri' },
  { name: 'Glacier', slug: 'glacier', state: 'Montana' },
  { name: 'Glacier Bay', slug: 'glacier-bay', state: 'Alaska' },
  { name: 'Grand Canyon', slug: 'grand-canyon', state: 'Arizona' },
  { name: 'Grand Teton', slug: 'grand-teton', state: 'Wyoming' },
  { name: 'Great Basin', slug: 'great-basin', state: 'Nevada' },
  { name: 'Great Sand Dunes', slug: 'great-sand-dunes', state: 'Colorado' },
  { name: 'Great Smoky Mountains', slug: 'great-smoky-mountains', state: 'Tennessee · North Carolina' },
  { name: 'Guadalupe Mountains', slug: 'guadalupe-mountains', state: 'Texas' },
  { name: 'Haleakalā', slug: 'haleakala', state: 'Hawaii' },
  { name: 'Hawaiʻi Volcanoes', slug: 'hawaii-volcanoes', state: 'Hawaii' },
  { name: 'Hot Springs', slug: 'hot-springs', state: 'Arkansas' },
  { name: 'Indiana Dunes', slug: 'indiana-dunes', state: 'Indiana' },
  { name: 'Isle Royale', slug: 'isle-royale', state: 'Michigan' },
  { name: 'Joshua Tree', slug: 'joshua-tree', state: 'California' },
  { name: 'Katmai', slug: 'katmai', state: 'Alaska' },
  { name: 'Kenai Fjords', slug: 'kenai-fjords', state: 'Alaska' },
  { name: 'Kings Canyon', slug: 'kings-canyon', state: 'California' },
  { name: 'Kobuk Valley', slug: 'kobuk-valley', state: 'Alaska' },
  { name: 'Lake Clark', slug: 'lake-clark', state: 'Alaska' },
  { name: 'Lassen Volcanic', slug: 'lassen-volcanic', state: 'California' },
  { name: 'Mammoth Cave', slug: 'mammoth-cave', state: 'Kentucky' },
  { name: 'Mesa Verde', slug: 'mesa-verde', state: 'Colorado' },
  { name: 'Mount Rainier', slug: 'mount-rainier', state: 'Washington' },
  { name: 'New River Gorge', slug: 'new-river-gorge', state: 'West Virginia' },
  { name: 'North Cascades', slug: 'north-cascades', state: 'Washington' },
  { name: 'Olympic', slug: 'olympic', state: 'Washington' },
  { name: 'Petrified Forest', slug: 'petrified-forest', state: 'Arizona' },
  { name: 'Pinnacles', slug: 'pinnacles', state: 'California' },
  { name: 'Redwood', slug: 'redwood', state: 'California' },
  { name: 'Rocky Mountain', slug: 'rocky-mountain', state: 'Colorado' },
  { name: 'Saguaro', slug: 'saguaro', state: 'Arizona' },
  { name: 'Sequoia', slug: 'sequoia', state: 'California' },
  { name: 'Shenandoah', slug: 'shenandoah', state: 'Virginia' },
  { name: 'Theodore Roosevelt', slug: 'theodore-roosevelt', state: 'North Dakota' },
  { name: 'Virgin Islands', slug: 'virgin-islands', state: 'U.S. Virgin Islands' },
  { name: 'Voyageurs', slug: 'voyageurs', state: 'Minnesota' },
  { name: 'White Sands', slug: 'white-sands', state: 'New Mexico' },
  { name: 'Wind Cave', slug: 'wind-cave', state: 'South Dakota' },
  { name: 'Wrangell–St. Elias', slug: 'wrangell-st-elias', state: 'Alaska' },
  { name: 'Yellowstone', slug: 'yellowstone', state: 'Wyoming · Montana · Idaho' },
  { name: 'Yosemite', slug: 'yosemite', state: 'California' },
  { name: 'Zion', slug: 'zion', state: 'Utah' },
];
