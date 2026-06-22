import type { Park, Subject, QuizQuestion } from '../types';

// Places deck — the "Crown of the Continent." Headline numbers follow the NPS
// Glacier Fact Sheet; glacier counts/area loss follow the USGS (Fagre et al.)
// 2015 survey. Accents are literal hex so the park file is self-contained.
const places: Subject[] = [
  {
    id: 'going-to-the-sun-road', name: 'Going-to-the-Sun Road', region: 'Spans the park · crests Logan Pass',
    coord: '50 mi · Continental Divide at 6,646 ft', accent: '#D98A3D', colorName: 'Sun Road',
    teaser: "The only road across the park — a 50-mile engineering marvel that climbs over the Continental Divide.",
    facts: [
      { tag: 'Scale', text: "About 50 miles long, it's the only road that traverses the park, crossing the Continental Divide at Logan Pass (6,646 ft)." },
      { tag: 'History', text: "Construction began in 1921 and finished in 1932; it was formally dedicated on July 15, 1933, at a cost of roughly $2.5 million." },
      { tag: 'Engineering', text: "It's the only road registered as a National Historic Place, a National Historic Landmark, AND a Historic Civil Engineering Landmark. It's named for Going-to-the-Sun Mountain." },
      { tag: 'Snow', text: "Up to about 80 feet of snow piles up at Logan Pass; the 'Big Drift' east of the pass is the deepest, and clearing the road takes roughly 10 weeks each spring." },
      { tag: 'Season', text: "Lower sections open early, but the full alpine route usually opens late June or early July and closes by mid-October. The latest opening ever was July 13, 2022." },
      { tag: 'Tip', text: "Between Avalanche Creek and Rising Sun, vehicles longer than 21 feet or wider than 8 feet are prohibited — there's no gas anywhere inside the park." },
    ],
  },
  {
    id: 'logan-pass', name: 'Logan Pass', region: 'Highest point on the road',
    coord: '6,646 ft · on the Continental Divide', accent: '#5FA39A', colorName: 'Alpine crest',
    teaser: "The road's high point on the Continental Divide — and the best place to find mountain goats.",
    facts: [
      { tag: 'Stat', text: "At 6,646 feet (2,025 m), it's the highest point on Going-to-the-Sun Road, sitting right on the Continental Divide." },
      { tag: 'History', text: "It's named for Major William R. Logan, the park's first superintendent." },
      { tag: 'Wildlife', text: "It's renowned for close-up mountain goat and bighorn sheep sightings around the visitor center and meadows." },
      { tag: 'Trails', text: "It's the trailhead for the Hidden Lake Overlook (1.4 mi, ~460 ft of climb) and the famous Highline Trail along the Garden Wall." },
      { tag: 'Snow', text: "As one of the snowiest spots on the road, it's always the last alpine section to be plowed open each summer." },
    ],
  },
  {
    id: 'lake-mcdonald', name: 'Lake McDonald', region: 'West side · largest lake',
    coord: '9.4 mi long · 464 ft deep', accent: '#2E86A8', colorName: 'Glacial blue',
    teaser: "The park's largest, longest, and deepest lake — floored with famous colored pebbles.",
    facts: [
      { tag: 'Scale', text: "It's the park's largest lake — 9.4 miles long, 1.5 miles wide, 464 feet deep, and 6,823 acres — also its longest and deepest." },
      { tag: 'Geology', text: "It fills a U-shaped trough on the park's west side, carved out by an ancient glacier." },
      { tag: 'Wow', text: "Its shallows are paved with colorful pebbles — red, green, maroon, and blue argillite — easy to see through the exceptionally clear, cold water." },
      { tag: 'Why', text: "The colors come from iron in the argillite: stones exposed to oxygen turned red, while those that weren't stayed green." },
    ],
  },
  {
    id: 'grinnell-glacier', name: 'Grinnell Glacier', region: 'Lewis Range · east of the Divide',
    coord: '~17 mi south of Canada', accent: '#46B4C6', colorName: 'Glacier ice',
    teaser: "The park's signature glacier — and a stark before-and-after of a vanishing landscape.",
    facts: [
      { tag: 'Name', text: "It's named for George Bird Grinnell, the conservationist who first observed it in 1885 and championed the park's creation." },
      { tag: 'Location', text: "It sits in the Lewis Range on the east slope of the Continental Divide, about 17 miles south of the Canadian border." },
      { tag: 'Shrinking', text: "Around 1850 it covered roughly 710 acres (combined with The Salamander); per USGS it lost about 45% of its area between 1966 and 2015 alone." },
      { tag: 'Meltwater', text: "Its retreat has filled a growing basin — Upper Grinnell Lake — with milky, ice-fed meltwater at the glacier's foot." },
      { tag: 'Tip', text: "It's reached by a strenuous trail from the Many Glacier area, one of the park's classic day hikes." },
    ],
  },
  {
    id: 'st-mary-lake', name: 'St. Mary Lake & Wild Goose Island', region: 'East side · higher and colder',
    coord: '9.9 mi long · 300 ft deep · 4,484 ft', accent: '#3A6FB0', colorName: 'Cobalt',
    teaser: "The park's second-largest lake, with a tiny island that became a Hollywood opening shot.",
    facts: [
      { tag: 'Scale', text: "It's the park's second-largest lake — 9.9 miles long, 300 feet deep, and 3,923 acres — and at 4,484 feet it sits higher and colder than Lake McDonald." },
      { tag: 'Island', text: "Wild Goose Island rises only about 14 feet above the water and covers roughly half an acre — yet it anchors one of the most photographed scenes in the park." },
      { tag: 'Wow', text: "That little island appears in the opening aerial sequence of Stanley Kubrick's The Shining (1980)." },
    ],
  },
  {
    id: 'many-glacier', name: 'Many Glacier', region: "East side · 'the heart of Glacier'",
    coord: 'Hub for Grinnell & Iceberg Lake', accent: '#7E6BB5', colorName: 'Heart of Glacier',
    teaser: "The east-side wildlife and trail hub locals call the heart of the park.",
    facts: [
      { tag: 'Nickname', text: "On the east side, it's nicknamed the 'heart of Glacier' — the launch point for the Grinnell Glacier, Iceberg Lake, and Swiftcurrent Lake trails." },
      { tag: 'Landmark', text: "The historic Many Glacier Hotel, a grand Great Northern Railway lodge, sits on the shore of Swiftcurrent Lake." },
      { tag: 'Wildlife', text: "It's one of the best places in the park for wildlife — moose, grizzlies and black bears, bighorn sheep, and mountain goats are all common." },
    ],
  },
  {
    id: 'triple-divide-peak', name: 'Triple Divide Peak', region: 'Lewis Range · hydrological apex',
    coord: '8,020 ft · three watersheds', accent: '#7C8A99', colorName: 'Hydrological apex',
    teaser: "The one point in North America where a raindrop could head for three different oceans.",
    facts: [
      { tag: 'Stat', text: "It rises to 8,020 feet (NPS) in the Lewis Range — modest in height but extraordinary in what flows off it." },
      { tag: 'Wow', text: "It's considered the hydrological apex of North America: water from this peak can reach the Pacific (via the Columbia), Hudson Bay (via the Saskatchewan–Nelson), and the Atlantic/Gulf of Mexico (via the Missouri–Mississippi)." },
      { tag: 'Geology', text: "It's where the Continental Divide and the Laurentian (Northern) Divide meet — the rare junction of three major watersheds." },
    ],
  },
  {
    id: 'vanishing-glaciers', name: 'The Vanishing Glaciers', region: 'Parkwide · Crown of the Continent',
    coord: '1,012,837 acres · est. May 11, 1910', accent: '#A8BDC8', colorName: 'Crown of the Continent',
    teaser: "A million acres of glacier-carved peaks — named for ice that is now mostly gone.",
    facts: [
      { tag: 'Park', text: "The 'Crown of the Continent' was established on May 11, 1910 as the 10th U.S. national park — 1,012,837 acres (1,583 sq mi) in northwestern Montana on the Canadian border." },
      { tag: 'Ice', text: "About 150 glaciers existed at the end of the Little Ice Age (~1850). By the 2015 USGS survey, only 26 named glaciers larger than 25 acres remained, and just 25 were still 'active.'" },
      { tag: 'Loss', text: "USGS found the park's named glaciers shrank about 40% on average between 1966 and 2015 — and roughly 68% since the Little Ice Age." },
      { tag: 'Future', text: "Earlier 'all gone by 2020 or 2030' forecasts have been superseded; current USGS framing spans 2030–2080 and stresses the trend rather than any single doomsday date." },
      { tag: 'Peace Park', text: "With Canada's Waterton Lakes National Park, it forms the Waterton-Glacier International Peace Park (1932) — the world's first — and a World Heritage Site (1995)." },
      { tag: 'Peak', text: "Mount Cleveland is the highest point at 10,448 feet (NPS), the tallest summit in the Lewis Range." },
      { tag: 'Geology', text: "Most of the park's rock is the Belt Supergroup — Precambrian sediments roughly 1.4 billion years old that preserve fossil stromatolites, among the finest Proterozoic rocks on Earth." },
    ],
  },
];

// Animals deck — population figures stated as the NPS does (~300 grizzlies,
// ~600 black bears, ~50 lynx); the mountain goat is the park's official symbol.
const animals: Subject[] = [
  {
    id: 'a-mountain-goat', name: 'Mountain Goat', region: 'Official park symbol',
    coord: 'Cliff specialist · seen at Logan Pass', accent: '#D9D3C7', colorName: 'Park symbol',
    teaser: "The park's official emblem — a white cliff-dweller that climbs where nothing should.",
    facts: [
      { tag: 'Symbol', text: "The mountain goat is Glacier's official symbol, and the park holds the largest native population in the lower 48." },
      { tag: 'Surefooted', text: "Cloven hooves with soft, grippy pads and a thick two-layer wool coat let it scale near-vertical cliffs and shrug off alpine cold." },
      { tag: 'Where', text: "Logan Pass is the classic spot to see them up close, often grazing right beside the visitor center." },
      { tag: 'Not a goat', text: "Despite the name it isn't a true goat — it's the only North American member of its genus, more closely related to antelopes and chamois." },
      { tag: 'Trend', text: "A USGS study found the median number of goats per survey site fell 45% between 2008 and 2019 — a population worth watching." },
    ],
  },
  {
    id: 'a-grizzly', name: 'Grizzly Bear', region: 'Threatened in the lower 48',
    coord: '~300 in the park · dished face', accent: '#C5873C', colorName: 'Omnivore',
    teaser: "One of the densest grizzly strongholds left in the contiguous United States.",
    facts: [
      { tag: 'Numbers', text: "Based on a multi-year DNA study, the NPS estimates roughly 300 grizzly bears live within the park." },
      { tag: 'Density', text: "Glacier holds one of the densest grizzly populations anywhere in the contiguous U.S." },
      { tag: 'ID', text: "Tell a grizzly by its shoulder hump, dished face, rounded ears, and long, light-colored claws." },
      { tag: 'Status', text: "Grizzlies are listed as threatened in the lower 48 — the park is a key refuge for the species." },
      { tag: 'Safety', text: "Carry bear spray on your hip or chest (not in your pack), make noise, and keep at least 100 yards away." },
    ],
  },
  {
    id: 'a-black-bear', name: 'Black Bear', region: 'Twice as common as grizzlies',
    coord: '~600 in the park · straight muzzle', accent: '#5A5048', colorName: 'Forest bear',
    teaser: "The park's other bear — more numerous than grizzlies, and easy to tell apart once you know how.",
    facts: [
      { tag: 'Numbers', text: "The NPS puts the park's black bear population at around 600 — roughly twice the number of grizzlies." },
      { tag: 'Science', text: "A USGS DNA hair-trap study estimated 603 black bears (95% CI 522–684) in and around the park." },
      { tag: 'ID', text: "Look for no shoulder hump, a straight muzzle, taller pointed ears, and short dark claws — color alone won't tell you (black bears can be brown)." },
      { tag: 'Both', text: "Glacier is home to both grizzlies and black bears, so every bear sighting is worth a careful second look." },
    ],
  },
  {
    id: 'a-bighorn', name: 'Bighorn Sheep', region: 'East of the Divide',
    coord: 'Ram horns to ~30 lb', accent: '#9C7B45', colorName: 'Curl',
    teaser: "Heavy-horned cliff sheep that share the high country with the goats.",
    facts: [
      { tag: 'Where', text: "They range in loosely connected herds east of the Continental Divide; Logan Pass and Many Glacier are good places to spot them." },
      { tag: 'Horns', text: "A mature ram's curled horns can weigh up to about 30 pounds — and the rams ram them together in head-cracking rut-season duels." },
      { tag: 'Population', text: "Glacier supports one of only two large native bighorn populations in all of Montana." },
      { tag: 'Threat', text: "They're highly vulnerable to pneumonia caught from domestic sheep and goats, which can wipe out a whole herd." },
    ],
  },
  {
    id: 'a-wolf', name: 'Gray Wolf', region: 'Returned on its own',
    coord: 'Recolonized 1986 · the "Magic Pack"', accent: '#9AA0A6', colorName: 'Recolonized',
    teaser: "Unlike Yellowstone's wolves, Glacier's walked back in on their own.",
    facts: [
      { tag: 'History', text: "Wolves were wiped out of the park by about 1936, then recolonized naturally from Canada — no reintroduction needed." },
      { tag: 'Wow', text: "In 1986 the first wolf den in the western U.S. in over 50 years was documented here, by a group that became known as the 'Magic Pack.'" },
      { tag: 'Where', text: "Several packs now roam the park, with the largest presence in the remote North Fork area on the west side." },
      { tag: 'Voice', text: "Like all wolves they live in family packs and use far-carrying howls to reunite, mark territory, and warn off rivals." },
    ],
  },
  {
    id: 'a-lynx', name: 'Canada Lynx', region: 'Threatened · snowshoe-hare specialist',
    coord: '~50 in the park · listed 2000', accent: '#C2A06A', colorName: 'Snow cat',
    teaser: "A ghostly, snow-padded cat that makes Glacier a possible climate refuge.",
    facts: [
      { tag: 'Status', text: "The Canada lynx was listed as threatened in 2000 and is rarely seen in the park's deep forests." },
      { tag: 'Numbers', text: "A 2018–2021 camera survey found about 50 lynx in the park — more than researchers expected — suggesting Glacier could be a climate refuge for the species." },
      { tag: 'Diet', text: "Its prey is almost entirely snowshoe hare — boom-and-bust hare cycles drive lynx numbers up and down." },
      { tag: 'Feet', text: "Huge, heavily furred paws spread its weight like snowshoes, letting it hunt over deep powder its prey would sink into." },
    ],
  },
  {
    id: 'a-harlequin', name: 'Harlequin Duck', region: 'Whitewater specialist',
    coord: 'Upper McDonald Creek stronghold', accent: '#41699E', colorName: 'Whitewater duck',
    teaser: "A boldly painted little duck that lives and nests in roaring mountain streams.",
    facts: [
      { tag: 'Wow', text: "Upper McDonald Creek has the highest density of breeding harlequin ducks in the contiguous U.S. — about a quarter of all chicks born in Montana are raised in this one drainage." },
      { tag: 'Whitewater', text: "It's the only North American duck specialized for fast-moving water, nesting within a few feet of rushing, tumbling streams." },
      { tag: 'Migration', text: "It makes an unusual east–west migration, leaving the mountains to molt and winter along the Pacific coast." },
      { tag: 'Status', text: "It's listed as a Montana species of concern, so the park's streams are a stronghold worth protecting." },
    ],
  },
  {
    id: 'a-bull-trout', name: 'Bull Trout', region: 'Native fish · federally threatened',
    coord: 'Only population east of the Divide', accent: '#5E9B6E', colorName: 'Native fish',
    teaser: "A cold-water native losing ground to an invasive cousin in the park's lakes.",
    facts: [
      { tag: 'Status', text: "The bull trout has been federally threatened since 1998 and needs very cold, clean water to survive." },
      { tag: 'Range', text: "Glacier and the neighboring Blackfeet Reservation hold the only bull trout populations east of the Continental Divide in the U.S." },
      { tag: 'Threat', text: "Native bull trout are being displaced by invasive lake trout, while westslope cutthroat trout — the other key native — are under pressure too." },
    ],
  },
];

// Places quiz bank.
const placesQuiz: QuizQuestion[] = [
  { subjectId: 'going-to-the-sun-road', q: "What is Going-to-the-Sun Road?", opts: ["A loop around Lake McDonald", "The only road that traverses the park, crossing the Continental Divide", "A road to the Canadian border crossing", "A scenic spur to Many Glacier Hotel"], a: 1, why: "It's the only road across the park, running about 50 miles and crossing the Continental Divide at Logan Pass (6,646 ft)." },
  { subjectId: 'going-to-the-sun-road', q: "When was Going-to-the-Sun Road dedicated?", opts: ["1910, with the park's founding", "1921", "1933", "1974"], a: 2, why: "Construction began in 1921 and finished in 1932; the road was formally dedicated on July 15, 1933." },
  { subjectId: 'going-to-the-sun-road', q: "Why are large vehicles restricted on the road?", opts: ["To cut down on traffic noise", "It's narrow and winding — nothing longer than 21 ft or wider than 8 ft is allowed on the alpine stretch", "The bridges can't bear the weight", "To protect nesting birds"], a: 1, why: "Between Avalanche Creek and Rising Sun, vehicles longer than 21 feet or wider than 8 feet are prohibited on the tight alpine route." },

  { subjectId: 'logan-pass', q: "What is Logan Pass?", opts: ["The park's lowest valley", "The highest point on Going-to-the-Sun Road, on the Continental Divide", "A backcountry chalet", "The west entrance station"], a: 1, why: "At 6,646 feet it's the highest point on the road, sitting right on the Continental Divide." },
  { subjectId: 'logan-pass', q: "Logan Pass is one of the best places to see which animal?", opts: ["Bull trout", "Mountain goats", "Harlequin ducks", "Wolverines"], a: 1, why: "It's renowned for close-up mountain goat and bighorn sheep sightings around the visitor center." },

  { subjectId: 'lake-mcdonald', q: "How does Lake McDonald rank in the park?", opts: ["Smallest but deepest", "The largest, longest, and deepest lake", "Second-largest after St. Mary Lake", "Highest in elevation"], a: 1, why: "At 9.4 miles long and 464 feet deep, it's the park's largest, longest, and deepest lake." },
  { subjectId: 'lake-mcdonald', q: "What makes Lake McDonald's shoreline famous?", opts: ["Hot springs", "Colorful argillite pebbles seen through clear water", "Floating glaciers", "A historic lighthouse"], a: 1, why: "Its shallows are paved with red, green, maroon, and blue argillite pebbles, visible through the exceptionally clear, cold water." },

  { subjectId: 'grinnell-glacier', q: "Who is Grinnell Glacier named for?", opts: ["A Blackfeet chief", "George Bird Grinnell, a conservationist who pushed for the park", "The park's first superintendent", "A Great Northern Railway founder"], a: 1, why: "It honors George Bird Grinnell, who first observed it in 1885 and championed the park's creation." },
  { subjectId: 'grinnell-glacier', q: "What has happened to Grinnell Glacier over time?", opts: ["It has grown steadily", "It lost roughly 45% of its area between 1966 and 2015", "It has stayed exactly the same size", "It vanished completely in 2010"], a: 1, why: "Per USGS it lost about 45% of its area between 1966 and 2015, with meltwater filling Upper Grinnell Lake at its foot." },
  { subjectId: 'grinnell-glacier', q: "How do most visitors reach Grinnell Glacier?", opts: ["By boat across Lake McDonald", "A strenuous trail from the Many Glacier area", "By the Going-to-the-Sun Road shuttle", "It can't be reached at all"], a: 1, why: "It's accessed via a strenuous day hike from the Many Glacier area on the park's east side." },

  { subjectId: 'st-mary-lake', q: "What is unusual about Wild Goose Island?", opts: ["It's the park's largest island", "It rises only ~14 feet above the water yet is one of the most photographed scenes in the park", "It holds a backcountry chalet", "It's man-made"], a: 1, why: "The tiny half-acre island rises just ~14 feet above St. Mary Lake but anchors a postcard-famous view." },
  { subjectId: 'st-mary-lake', q: "Which film opens with an aerial shot of Wild Goose Island?", opts: ["The Revenant", "The Shining (1980)", "A River Runs Through It", "Forrest Gump"], a: 1, why: "The little island appears in the opening aerial sequence of Stanley Kubrick's The Shining." },

  { subjectId: 'many-glacier', q: "Why is Many Glacier called the 'heart of Glacier'?", opts: ["It sits at the exact center of the park", "It's the east-side hub for top trails and wildlife, with a historic hotel", "It has the park's only glacier", "It's where the road begins"], a: 1, why: "On the east side, it's the launch point for the Grinnell Glacier, Iceberg Lake, and Swiftcurrent trails and prime wildlife viewing." },
  { subjectId: 'many-glacier', q: "What historic landmark sits at Many Glacier?", opts: ["Granite Park Chalet", "The Many Glacier Hotel on Swiftcurrent Lake", "The Lake McDonald Lodge", "Liberty Cap"], a: 1, why: "The grand Many Glacier Hotel, built by the Great Northern Railway, sits on the shore of Swiftcurrent Lake." },

  { subjectId: 'triple-divide-peak', q: "What makes Triple Divide Peak special?", opts: ["It's the park's tallest mountain", "Water from it can reach three different watersheds — Pacific, Hudson Bay, and Atlantic/Gulf", "It holds the largest glacier", "It straddles the Canadian border"], a: 1, why: "It's the hydrological apex of North America, sending water toward the Pacific, Hudson Bay, and the Gulf of Mexico." },
  { subjectId: 'triple-divide-peak', q: "Which two divides meet at Triple Divide Peak?", opts: ["The Pacific and Atlantic divides", "The Continental Divide and the Laurentian (Northern) Divide", "The Lewis and Livingston divides", "The east and west rim divides"], a: 1, why: "It's the rare junction where the Continental Divide and the Laurentian (Northern) Divide meet." },

  { subjectId: 'vanishing-glaciers', q: "How many named glaciers larger than 25 acres remained at the 2015 USGS survey?", opts: ["About 150", "26 (with 25 still 'active')", "Exactly 100", "None"], a: 1, why: "Of the ~150 glaciers present around 1850, only 26 named glaciers over 25 acres remained by 2015, and just 25 were still active." },
  { subjectId: 'vanishing-glaciers', q: "When was Glacier National Park established?", opts: ["May 11, 1910", "1872", "1932", "1974"], a: 0, why: "It was established on May 11, 1910, as the 10th U.S. national park." },
  { subjectId: 'vanishing-glaciers', q: "What is the 'Crown of the Continent's' international distinction with Canada?", opts: ["A shared toll road", "The Waterton-Glacier International Peace Park — the world's first, created in 1932", "A joint ski resort", "A cross-border railway"], a: 1, why: "With Canada's Waterton Lakes National Park it forms the world's first International Peace Park (1932) and a World Heritage Site (1995)." },
];

// Animals quiz bank.
const animalsQuiz: QuizQuestion[] = [
  { subjectId: 'a-mountain-goat', q: "What is the official symbol of Glacier National Park?", opts: ["The grizzly bear", "The mountain goat", "The bald eagle", "The harlequin duck"], a: 1, why: "The mountain goat is the park's official symbol, and Glacier has the largest native population in the lower 48." },
  { subjectId: 'a-mountain-goat', q: "Where are mountain goats most reliably seen?", opts: ["Lake McDonald's shore", "Logan Pass", "Upper McDonald Creek", "The North Fork"], a: 1, why: "Logan Pass is the classic spot, where goats often graze right beside the visitor center." },
  { subjectId: 'a-mountain-goat', q: "Is the mountain goat a true goat?", opts: ["Yes, a domestic breed gone wild", "No — it's the only North American member of its own genus", "Yes, the largest wild goat", "No, it's a kind of sheep"], a: 1, why: "Despite the name it isn't a true goat — it's the sole North American member of its genus, related to antelopes and chamois." },

  { subjectId: 'a-grizzly', q: "About how many grizzly bears live in the park?", opts: ["About 50", "About 300", "About 600", "Over 2,000"], a: 1, why: "Based on a multi-year DNA study, the NPS estimates roughly 300 grizzlies live within Glacier." },
  { subjectId: 'a-grizzly', q: "Which feature helps identify a grizzly?", opts: ["A straight muzzle and pointed ears", "A shoulder hump, dished face, and long light claws", "Short dark claws and no hump", "A white head and tail"], a: 1, why: "Grizzlies show a muscular shoulder hump, a dished face, rounded ears, and long, light-colored claws." },

  { subjectId: 'a-black-bear', q: "How does the black bear population compare with grizzlies in the park?", opts: ["Far fewer black bears", "About 600 black bears — roughly twice the grizzlies", "Exactly equal numbers", "Black bears are absent"], a: 1, why: "The NPS puts black bears at around 600, roughly double the ~300 grizzlies." },
  { subjectId: 'a-black-bear', q: "What's a reliable way to tell a black bear from a grizzly?", opts: ["Black bears are always black", "A straight muzzle, tall pointed ears, no shoulder hump, and short dark claws", "Black bears are larger", "Only grizzlies climb trees"], a: 1, why: "Color isn't reliable (black bears can be brown) — look for a straight muzzle, pointed ears, no hump, and short dark claws." },

  { subjectId: 'a-bighorn', q: "How heavy can a mature ram's horns get?", opts: ["About 5 pounds", "Up to about 30 pounds", "About 100 pounds", "They have no horns"], a: 1, why: "A mature ram's curled horns can weigh up to about 30 pounds, used in head-to-head rut duels." },
  { subjectId: 'a-bighorn', q: "What is a major threat to the park's bighorn sheep?", opts: ["Invasive lake trout", "Pneumonia caught from domestic sheep and goats", "Loss of snowshoe hare", "Warming streams"], a: 1, why: "Bighorns are highly vulnerable to pneumonia transmitted from domestic sheep and goats, which can devastate a herd." },

  { subjectId: 'a-wolf', q: "How did wolves return to Glacier?", opts: ["They were reintroduced in 1995", "They recolonized naturally from Canada", "They were never gone", "They were bred in captivity and released"], a: 1, why: "Unlike Yellowstone's reintroduced wolves, Glacier's walked back in on their own from Canada after being wiped out by ~1936." },
  { subjectId: 'a-wolf', q: "What was the 'Magic Pack' known for?", opts: ["Being the largest pack on Earth", "Denning in the western U.S. in 1986 — the first in over 50 years", "Hunting only bighorn sheep", "Living entirely on Lake McDonald's islands"], a: 1, why: "In 1986 the 'Magic Pack' produced the first documented wolf den in the western U.S. in more than 50 years." },

  { subjectId: 'a-lynx', q: "What does the Canada lynx eat almost exclusively?", opts: ["Fish", "Snowshoe hare", "Bighorn lambs", "Berries"], a: 1, why: "Its diet is almost entirely snowshoe hare, and hare population cycles drive lynx numbers." },
  { subjectId: 'a-lynx', q: "What did a recent camera survey find about lynx in the park?", opts: ["They were extinct", "About 50 lynx — more than expected, hinting at a climate refuge", "Thousands of lynx", "Only a single individual"], a: 1, why: "A 2018–2021 survey found roughly 50 lynx, more than expected, suggesting Glacier could be a climate refuge for the species." },

  { subjectId: 'a-harlequin', q: "What's remarkable about Upper McDonald Creek for harlequin ducks?", opts: ["It's the only place they nest in winter", "It has the highest density of breeding harlequin ducks in the contiguous U.S.", "It's where they molt", "They avoid it entirely"], a: 1, why: "Upper McDonald Creek hosts the highest breeding density in the contiguous U.S. — about a quarter of all Montana's chicks are raised there." },
  { subjectId: 'a-harlequin', q: "What kind of water does the harlequin duck specialize in?", opts: ["Still ponds", "Fast-moving whitewater streams", "Deep cold lakes", "Brackish marshes"], a: 1, why: "It's the only North American duck specialized for fast water, nesting within a few feet of rushing streams." },

  { subjectId: 'a-bull-trout', q: "What is the main threat to the park's native bull trout?", opts: ["Overfishing by visitors", "Displacement by invasive lake trout", "Warming caught from bighorn herds", "Loss of nesting cliffs"], a: 1, why: "Native bull trout are being displaced by invasive lake trout; they've been federally threatened since 1998." },
  { subjectId: 'a-bull-trout', q: "Where are the park's bull trout populations notable?", opts: ["They're the only ones east of the Continental Divide in the U.S.", "They're the most abundant trout in Montana", "They live only in hot springs", "They were introduced from Canada"], a: 0, why: "Glacier and the adjacent Blackfeet Reservation hold the only bull trout populations east of the Continental Divide in the U.S." },
];

export const glacier: Park = {
  slug: 'glacier',
  name: 'Glacier',
  region: 'Montana',
  tagline: "Standing in the Crown of the Continent? Search a spot or tap a card for the stories, numbers, and oddities behind the peaks, ice, and wildlife around you.",
  safetyNote:
    'A trailside reference, not a park guide — always follow posted signs. Glacier is grizzly and black bear country: carry bear spray, make noise, and stay at least 100 yd from bears and wolves, 25 yd from other wildlife. Facts compiled from the National Park Service Glacier Fact Sheet and the USGS (Fagre et al.) glacier surveys.',
  decks: [
    { id: 'places', label: 'Places', dotColor: '#2E86A8', subjects: places, quiz: placesQuiz },
    { id: 'animals', label: 'Animals', dotColor: '#9C7B45', subjects: animals, quiz: animalsQuiz },
  ],
};
