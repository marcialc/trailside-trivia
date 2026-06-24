import type { Park, Subject, QuizQuestion } from '../types';

const places: Subject[] = [
  {
    id: 'angels-landing',
    name: { en: 'Angels Landing', es: 'Angels Landing' },
    region: { en: 'Zion Canyon', es: 'Cañón de Zion' },
    coord: { en: '37.269°N · Elev. 5,790 ft', es: '37.269°N · Elev. 5,790 pies' },
    accent: '#D35400',
    colorName: { en: 'Terracotta', es: 'Terracota' },
    teaser: { en: 'An iconic, knife-edge sandstone ridge with 1,000-foot drop-offs and bolted chain handrails.', es: 'Una icónica cresta de arenisca con bordes afilados, abismos de 300 metros (1,000 pies) y pasamanos de cadenas ancladas.' },
    facts: [
      { tag: { en: 'History', es: 'Historia' }, text: { en: 'Originally named the "Temple of Aeolus" by Methodist minister Frederick Vining Fisher in 1916, who famously remarked that only an angel could land there.', es: 'Originalmente llamado el "Templo de Eolo" por el ministro metodista Frederick Vining Fisher en 1916, quien comentó célebremente que solo un ángel podría aterrizar allí.' } }, // source: NPS Zion National Park History
      { tag: { en: 'Safety', es: 'Seguridad' }, text: { en: 'The final half-mile of the trail follows a narrow, steep ridge with sheer drops of 1,000 feet on one side and 800 feet on the other, aided only by metal chains.', es: 'La última media milla del sendero sigue una cresta estrecha y empinada con caídas verticales de 300 metros (1,000 pies) a un lado y de 240 metros (800 pies) al otro, con la única ayuda de cadenas metálicas.' } }, // source: NPS Angels Landing Safety Guide
      { tag: { en: 'Tip', es: 'Consejo' }, text: { en: 'To manage crowding and improve safety, the park introduced a seasonal permit lottery system in 2022 for anyone hiking the chain-assisted section.', es: 'Para gestionar las multitudes y mejorar la seguridad, el parque introdujo un sistema de lotería de permisos de temporada en 2022 para cualquiera que recorra la sección asistida por cadenas.' } }, // source: NPS Angels Landing Permits
      { tag: { en: 'Engineering', es: 'Ingeniería' }, text: { en: 'The trail up to Scout Lookout includes "Walter\'s Wiggles," 21 tight switchbacks engineered and built in 1926 by the National Park Service under custodian Walter Ruesch.', es: 'El sendero hasta Scout Lookout incluye "Walter\'s Wiggles", 21 curvas cerradas diseñadas y construidas en 1926 por el Servicio de Parques Nacionales bajo la dirección de Walter Ruesch.' } }, // source: NPS Zion Trail Engineering History
    ],
  },
  {
    id: 'the-narrows',
    name: { en: 'The Narrows', es: 'The Narrows' },
    region: { en: 'Zion Canyon', es: 'Cañón de Zion' },
    coord: { en: '37.306°N · Width 20–30 ft', es: '37.306°N · Ancho 20–30 pies (6–9 m)' },
    accent: '#3498DB',
    colorName: { en: 'Canyon Blue', es: 'Azul del cañón' },
    teaser: { en: 'The narrowest section of Zion Canyon, where the Virgin River flows between towering 1,000-foot walls.', es: 'La sección más estrecha del Cañón de Zion, donde el río Virgin fluye entre imponentes paredes de 300 metros (1,000 pies).' },
    facts: [
      { tag: { en: 'Scale', es: 'Escala' }, text: { en: 'This slot canyon features sheer walls rising up to 1,000 feet tall, with sections of the riverbed narrowing to just 20 to 30 feet wide.', es: 'Este cañón de ranura presenta paredes verticales de hasta 300 metros (1,000 pies) de altura, con secciones del lecho del río que se estrechan a solo 6 u 9 metros (20 a 30 pies) de ancho.' } }, // source: NPS Zion Narrows Guide
      { tag: { en: 'Wow', es: 'Sorprendente' }, text: { en: 'Hikers spend about 60% of their time wading, walking, or swimming upstream in the cold waters of the Virgin River, which carved the canyon.', es: 'Los excursionistas pasan aproximadamente el 60% de su tiempo vadeando, caminando o nadando contra la corriente en las frías aguas del río Virgin, que esculpió el cañón.' } }, // source: USGS Geologic History of Zion
      { tag: { en: 'Safety', es: 'Seguridad' }, text: { en: 'Flash floods are a constant hazard here; storms miles away can send a sudden, destructive wall of water down the canyon in minutes.', es: 'Las inundaciones repentinas son un peligro constante aquí; las tormentas a millas de distancia pueden enviar una pared de agua repentina y destructiva cañón abajo en cuestión de minutos.' } }, // source: NOAA Weather & NPS Safety
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'The towering walls are made of Navajo Sandstone, which formed from a vast Jurassic desert of windblown sand dunes around 180 million years ago.', es: 'Las imponentes paredes están hechas de arenisca Navajo, que se formó a partir de un vasto desierto jurásico de dunas de arena arrastradas por el viento hace unos 180 millones de años.' } }, // source: USGS Utah Stratigraphy
    ],
  },
  {
    id: 'the-subway',
    name: { en: 'The Subway', es: 'The Subway' },
    region: { en: 'Left Fork North Creek', es: 'Bifurcación izquierda de North Creek' },
    coord: { en: '37.311°N · Technical Slot', es: '37.311°N · Cañón de ranura técnico' },
    accent: '#1ABC9C',
    colorName: { en: 'Emerald Pool', es: 'Poza esmeralda' },
    teaser: { en: 'A unique semi-slot canyon where the creek has carved a tubular, subway-like tunnel through sandstone.', es: 'Un cañón de ranura semicerrado único donde el arroyo ha esculpido un túnel tubular similar al del metro a través de la arenisca.' },
    facts: [
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'The Left Fork of North Creek has carved a smooth, curved, tube-like passage through the Navajo Sandstone, resembling an underground subway station.', es: 'La bifurcación izquierda de North Creek ha esculpido un pasaje suave, curvo y tubular a través de la arenisca Navajo, asemejándose a una estación de metro subterránea.' } }, // source: NPS Zion Backcountry Guide
      { tag: { en: 'Tip', es: 'Consejo' }, text: { en: 'Exploring the Subway requires a wilderness permit and technical slot canyon skills, including cold-water wading, swimming, and route-finding.', es: 'Explorar The Subway requiere un permiso de área silvestre y habilidades técnicas de cañonismo, incluyendo vadear en agua fría, nadar y navegación de rutas.' } }, // source: NPS Zion Backcountry Wilderness Permits
      { tag: { en: 'Wow', es: 'Sorprendente' }, text: { en: 'The canyon floor is dotted with deep, cold, emerald-green plunge pools that require swimming or careful scrambling to bypass.', es: 'El suelo del cañón está salpicado de pozas de inmersión profundas, frías y de color verde esmeralda que requieren nadar o trepar con cuidado para esquivarlas.' } }, // source: NPS Canyon Ecology
    ],
  },
  {
    id: 'court-of-the-patriarchs',
    name: { en: 'Court of the Patriarchs', es: 'Corte de los Patriarcas' },
    region: { en: 'Zion Canyon', es: 'Cañón de Zion' },
    coord: { en: '37.236°N · Sandstone Peaks', es: '37.236°N · Picos de arenisca' },
    accent: '#F1C40F',
    colorName: { en: 'Sandstone Gold', es: 'Oro de arenisca' },
    teaser: { en: 'A trio of towering sandstone monoliths named after the biblical figures Abraham, Isaac, and Jacob.', es: 'Un trío de imponentes monolitos de arenisca que llevan el nombre de los personajes bíblicos Abraham, Isaac y Jacob.' },
    facts: [
      { tag: { en: 'History', es: 'Historia' }, text: { en: 'In 1916, Methodist minister Frederick Vining Fisher named the three massive peaks after the biblical patriarchs Abraham, Isaac, and Jacob.', es: 'En 1916, el ministro metodista Frederick Vining Fisher nombró a los tres picos masivos en honor a los patriarcas bíblicos Abraham, Isaac y Jacob.' } }, // source: NPS Zion History
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'The base of the peaks consists of red Kayenta shale, while the upper walls are made of the resistant, cream-colored Navajo Sandstone.', es: 'La base de los picos consiste en esquisto rojo de Kayenta, mientras que las paredes superiores están hechas de la resistente arenisca Navajo de color crema.' } }, // source: USGS Zion Geology
      { tag: { en: 'Tip', es: 'Consejo' }, text: { en: 'A very short, paved trail leads from the main canyon road to a viewpoint offering a panoramic perspective of the Court and nearby Mount Moroni.', es: 'Un sendero pavimentado muy corto conduce desde la carretera principal del cañón hasta un mirador que ofrece una perspectiva panorámica de la Corte y del cercano Monte Moroni.' } }, // source: NPS Zion Day Hikes
    ],
  },
  {
    id: 'great-white-throne',
    name: { en: 'Great White Throne', es: 'Great White Throne' },
    region: { en: 'Zion Canyon', es: 'Cañón de Zion' },
    coord: { en: '37.266°N · 2,400 ft Cliff', es: '37.266°N · Acantilado de 2,400 pies (730 m)' },
    accent: '#ECF0F1',
    colorName: { en: 'Alabaster', es: 'Alabastro' },
    teaser: { en: 'Zion\'s most recognizable sheer monolith, transitionally colored from deep red to stark white.', es: 'El monolito vertical más reconocible de Zion, con una transición de color que va del rojo profundo al blanco puro.' },
    facts: [
      { tag: { en: 'Scale', es: 'Escala' }, text: { en: 'This massive monolith rises 2,400 feet above the canyon floor, making it one of the largest sheer sandstone cliffs in the world.', es: 'Este enorme monolito se eleva 2,400 pies (730 metros) sobre el suelo del cañón, lo que lo convierte en uno de los acantilados de arenisca verticales más grandes del mundo.' } }, // source: NPS Zion Monoliths
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'Its gradient color—deep red at the base to white at the summit—reflects varying amounts of iron minerals and bleaching in the sandstone.', es: 'Su gradiente de color, desde el rojo intenso en la base hasta el blanco en la cima, refleja cantidades variables de minerales de hierro y la decoloración en la arenisca.' } }, // source: USGS Sandstone Properties
      { tag: { en: 'History', es: 'Historia' }, text: { en: 'Though early promoters claimed the summit was unreachable, W. H. W. Evans completed the first recorded ascent of the Great White Throne in 1927.', es: 'Aunque los primeros promotores afirmaban que la cima era inalcanzable, W. H. W. Evans completó el primer ascenso registrado del Great White Throne en 1927.' } }, // source: NPS Zion Historical Climbs
    ],
  },
  {
    id: 'emerald-pools',
    name: { en: 'Emerald Pools', es: 'Emerald Pools' },
    region: { en: 'Zion Canyon', es: 'Cañón de Zion' },
    coord: { en: '37.251°N · Three Tiers', es: '37.251°N · Tres niveles' },
    accent: '#2ECC71',
    colorName: { en: 'Moss Green', es: 'Verde musgo' },
    teaser: { en: 'An oasis of spring-fed pools, waterfalls, and hanging gardens tucked into Zion\'s red alcoves.', es: 'Un oasis de pozas alimentadas por manantiales, cascadas y jardines colgantes escondidos en los nichos rojos de Zion.' },
    facts: [
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'The pools are divided into three tiers (Lower, Middle, and Upper) fed by small springs leaking out of the sandstone cliffs.', es: 'Las pozas se dividen en tres niveles (Inferior, Medio y Superior) alimentados por pequeños manantiales que se filtran desde los acantilados de arenisca.' } }, // source: NPS Zion Emerald Pools Trail Guide
      { tag: { en: 'Ecology', es: 'Ecología' }, text: { en: 'The characteristic green hue of the pools is caused by various species of freshwater algae that thrive in the calm, shaded waters.', es: 'El característico tono verde de las pozas es provocado por varias especies de algas de agua dulce que prosperan en las aguas tranquilas y sombreadas.' } }, // source: NPS Aquatic Ecology
      { tag: { en: 'Wow', es: 'Sorprendente' }, text: { en: 'The wet, shaded alcove cliffs support lush hanging gardens of ferns, wildflowers, and mosses that drink from constant seep springs.', es: 'Los acantilados húmedos y sombreados de los nichos albergan exuberantes jardines colgantes de helechos, flores silvestres y musgos que se nutren de manantiales de filtración constante.' } }, // source: NPS Zion Hanging Gardens
    ],
  },
  {
    id: 'checkerboard-mesa',
    name: { en: 'Checkerboard Mesa', es: 'Checkerboard Mesa' },
    region: { en: 'East Entrance', es: 'Entrada este' },
    coord: { en: '37.227°N · Elev. 6,670 ft', es: '37.227°N · Elev. 6,670 pies (2,033 m)' },
    accent: '#95A5A6',
    colorName: { en: 'Mesa Gray', es: 'Gris mesa' },
    teaser: { en: 'A massive sandstone dome scored with a unique checkerboard grid of fractures.', es: 'Un enorme domo de arenisca marcado con un patrón cuadricular único de fracturas similar a un tablero de ajedrez.' },
    facts: [
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'The horizontal lines are cross-bedding from Jurassic-era windblown sand dunes, while the vertical cracks are joints formed by expansion and contraction.', es: 'Las líneas horizontales son de estratificación cruzada de dunas de arena arrastradas por el viento de la era jurásica, mientras que las grietas verticales son diaclasas formadas por expansión y contracción.' } }, // source: USGS Zion Geomorphology
      { tag: { en: 'Wow', es: 'Sorprendente' }, text: { en: 'Unlike the sheer walls of Zion Canyon, Checkerboard Mesa has a rounded, dome-like shape caused by freezing and thawing cycles weathering the stone.', es: 'A diferencia de las paredes verticales del Cañón de Zion, Checkerboard Mesa tiene una forma redondeada similar a un domo, causada por los ciclos de congelación y descongelación que erosionan la piedra.' } }, // source: NPS Checkerboard Mesa Geology
      { tag: { en: 'Scale', es: 'Escala' }, text: { en: 'It rises to a summit elevation of 6,670 feet, dominating the slickrock country along the Zion-Mount Carmel Highway.', es: 'Se eleva a una altitud de 6,670 pies (2,033 metros) en su cima, dominando el paisaje de roca pulida a lo largo de la autopista Zion-Mount Carmel.' } }, // source: USGS Topographic Survey
    ],
  },
];

const animals: Subject[] = [
  {
    id: 'california-condor',
    name: { en: 'California Condor', es: 'Cóndor de California' },
    region: { en: 'Canyon Cliffs', es: 'Acantilados del cañón' },
    coord: { en: 'Wingspan to 9.5 ft · Endangered', es: 'Envergadura de hasta 9.5 pies (2.9 m) · En peligro' },
    accent: '#34495E',
    colorName: { en: 'Soot Black', es: 'Negro hollín' },
    teaser: { en: 'North America\'s largest land bird, brought back from the brink of extinction to soar over Zion.', es: 'El ave terrestre más grande de América del Norte, recuperada del borde de la extinción para planear sobre Zion.' },
    facts: [
      { tag: { en: 'Scale', es: 'Escala' }, text: { en: 'It is the largest land bird in North America, boasting a massive wingspan of up to 9.5 feet and weighing up to 25 pounds.', es: 'Es el ave terrestre más grande de América del Norte, con una envergadura de hasta 9.5 pies (2.9 metros) y un peso de hasta 25 libras (11 kg).' } }, // source: NPS California Condor Recovery Program
      { tag: { en: 'Wow', es: 'Sorprendente' }, text: { en: 'Critically endangered, the species went extinct in the wild in 1987. Captive-bred condors were reintroduced in Southern Utah and now nest in Zion.', es: 'En peligro crítico de extinción, la especie se extinguió en estado salvaje en 1987. Los cóndores criados en cautiverio fueron reintroducidos en el sur de Utah y ahora anidan en Zion.' } }, // source: USFWS Condor History
      { tag: { en: 'Ecology', es: 'Ecología' }, text: { en: 'Zion\'s high sandstone cliffs provide perfect nesting ledges and strong thermal wind updrafts that allow these heavy birds to soar without flapping.', es: 'Los altos acantilados de arenisca de Zion proporcionan repisas perfectas para anidar y fuertes corrientes de aire térmico ascendente que permiten a estas pesadas aves planear sin aletear.' } }, // source: NPS Zion Bird Conservation
      { tag: { en: 'Threat', es: 'Amenaza' }, text: { en: 'Lead poisoning, caused by ingesting fragments of lead ammunition left in animal carcasses, remains the leading cause of death for wild condors.', es: 'El envenenamiento por plomo, causado por la ingestión de fragmentos de munición de plomo que quedan en los cadáveres de animales, sigue siendo la principal causa de muerte de los cóndores salvajes.' } }, // source: USFWS Lead Hazards study
    ],
  },
  {
    id: 'desert-bighorn',
    name: { en: 'Desert Bighorn Sheep', es: 'Borrego cimarrón del desierto' },
    region: { en: 'Slickrock Slopes', es: 'Laderas de roca pulida' },
    coord: { en: '115–220 lb · Curved Horns', es: '115–220 libras (52–100 kg) · Cuernos curvos' },
    accent: '#8A7B6E',
    colorName: { en: 'Ram Horn', es: 'Cuerno de carnero' },
    teaser: { en: 'Cliff-dwelling survivalists with specialized hooves designed for climbing Zion\'s slickrock.', es: 'Supervivientes de los acantilados con pezuñas especializadas diseñadas para escalar la roca pulida de Zion.' },
    facts: [
      { tag: { en: 'Comeback', es: 'Retorno' }, text: { en: 'Reintroduced to Zion in 1973 with just 14 animals after local extirpation, the park\'s bighorn population has successfully grown to over 500 sheep today.', es: 'Reintroducido en Zion en 1973 con solo 14 animales tras su extirpación local, la población de borregos cimarrones del parque ha crecido con éxito hasta superar los 500 ejemplares en la actualidad.' } }, // source: NPS Zion Bighorn Sheep Survey
      { tag: { en: 'Adaptation', es: 'Adaptación' }, text: { en: 'Their specialized hooves have a hard, sharp outer rim for traction on tiny ledges and a soft, rubbery inner pad that grips slippery sandstone.', es: 'Sus pezuñas especializadas tienen un borde exterior duro y afilado para la tracción en pequeñas repisas y una almohadilla interior suave y gomosa que se adhiere a la arenisca resbaladiza.' } }, // source: NPS Animal Adaptations
      { tag: { en: 'Ecology', es: 'Ecología' }, text: { en: 'Unlike domestic sheep, desert bighorns can go for several days without visiting water sources, obtaining moisture from desert vegetation instead.', es: 'A diferencia de las ovejas domésticas, los borregos cimarrones del desierto pueden pasar varios días sin visitar fuentes de agua, obteniendo la humedad de la vegetación del desierto.' } }, // source: NPS Desert Biology
    ],
  },
  {
    id: 'mule-deer',
    name: { en: 'Mule Deer', es: 'Ciervo mulo' },
    region: { en: 'Canyon Meadows', es: 'Praderas del cañón' },
    coord: { en: 'Abundant · Mule-like Ears', es: 'Abundante · Orejas de mula' },
    accent: '#A0522D',
    colorName: { en: 'Sienna', es: 'Siena' },
    teaser: { en: 'The park\'s most visible large mammal, named for their oversized, rotatable ears.', es: 'El mamífero grande más visible del parque, llamado así por sus orejas de gran tamaño y giratorias.' },
    facts: [
      { tag: { en: 'Wildlife', es: 'Vida silvestre' }, text: { en: 'They are the most commonly spotted large mammals on Zion\'s canyon floor, identified by their large ears and small, black-tipped tails.', es: 'Son los mamíferos grandes que se avistan con más frecuencia en el suelo del Cañón de Zion, identificados por sus grandes orejas y su cola pequeña con punta negra.' } }, // source: NPS Zion Mammals Guide
      { tag: { en: 'Behavior', es: 'Comportamiento' }, text: { en: 'During hot summer months, many migrate to cool, forested high elevations like the Kolob Plateau, returning to Zion Canyon in winter.', es: 'Durante los calurosos meses de verano, muchos migran a zonas altas, boscosas y frescas como la meseta de Kolob, regresando al Cañón de Zion en invierno.' } }, // source: NPS Zion Wildlife Migration
      { tag: { en: 'Safety', es: 'Seguridad' }, text: { en: 'Feeding mule deer is strictly illegal; human food disrupts their complex digestive systems and can cause them to starve to death with full stomachs.', es: 'Alimentar a los ciervos mulos es estrictamente ilegal; la comida humana altera su complejo sistema digestivo y puede hacer que mueran de hambre con el estómago lleno.' } }, // source: NPS Wildlife Safety
    ],
  },
  {
    id: 'mexican-spotted-owl',
    name: { en: 'Mexican Spotted Owl', es: 'Búho manchado mexicano' },
    region: { en: 'Deep Slot Canyons', es: 'Cañones de ranura profundos' },
    coord: { en: 'Threatened · Nocturnal Hunter', es: 'Amenazado · Cazador nocturno' },
    accent: '#D2B48C',
    colorName: { en: 'Feather Tan', es: 'Marrón pluma' },
    teaser: { en: 'A threatened owl species that thrives in the cool, shaded microclimates of Zion\'s slot canyons.', es: 'Una especie de búho amenazada que prospera en los microclimas frescos y sombreados de los cañones de ranura de Zion.' },
    facts: [
      { tag: { en: 'Habitat', es: 'Hábitat' }, text: { en: 'Zion\'s deep, narrow slot canyons provide cool, shaded microclimates that mimic the dense, old-growth forests these owls normally prefer.', es: 'Los cañones de ranura profundos y estrechos de Zion proporcionan microclimas frescos y sombreados que imitan los bosques densos y antiguos que estos búhos suelen preferir.' } }, // source: USFWS Spotted Owl Recovery Plan
      { tag: { en: 'Threat', es: 'Amenaza' }, text: { en: 'Zion represents a critical refuge for this federally threatened species, which is highly sensitive to rising temperatures and habitat loss.', es: 'Zion representa un refugio crítico para esta especie amenazada a nivel federal, que es altamente sensible al aumento de las temperaturas y a la pérdida de hábitat.' } }, // source: NPS Slot Canyon Ecology
      { tag: { en: 'Behavior', es: 'Comportamiento' }, text: { en: 'They hunt strictly at night, using silently designed wing feathers to surprise prey like woodrats, bats, and pocket gophers.', es: 'Cazan estrictamente de noche, utilizando plumas de alas diseñadas para el vuelo silencioso para sorprender a presas como ratas de bosque, murciélagos y tuzas.' } }, // source: NPS Bird Profiles
    ],
  },
  {
    id: 'mountain-lion',
    name: { en: 'Mountain Lion', es: 'Puma' },
    region: { en: 'Rugged Backcountry', es: 'Territorio agreste y remoto' },
    coord: { en: 'Length to 8 ft · Apex Carnivore', es: 'Longitud de hasta 8 pies (2.4 m) · Superdepredador' },
    accent: '#E67E22',
    colorName: { en: 'Puma Tawny', es: 'Leonado puma' },
    teaser: { en: 'Zion\'s silent apex predator, hunting mule deer and bighorns across the sandstone cliffs.', es: 'El silencioso superdepredador de Zion, que caza ciervos mulos y borregos cimarrones a lo largo de los acantilados de arenisca.' },
    facts: [
      { tag: { en: 'Ecology', es: 'Ecología' }, text: { en: 'Also known as cougars, they are the top predators in Zion, crucial for keeping mule deer and bighorn sheep populations in balance.', es: 'También conocidos como pumas, son los principales depredadores en Zion, cruciales para mantener en equilibrio las poblaciones de ciervos mulos y borregos cimarrones.' } }, // source: NPS Zion Predators
      { tag: { en: 'Behavior', es: 'Comportamiento' }, text: { en: 'Extremely solitary and elusive, a single adult mountain lion requires a massive home range of up to 100 square miles to hunt.', es: 'Extremadamente solitario y esquivo, un solo puma adulto requiere un enorme territorio de caza de hasta 100 millas cuadradas.' } }, // source: Utah Division of Wildlife Resources
      { tag: { en: 'Safety', es: 'Seguridad' }, text: { en: 'In the rare event of an encounter, stand tall, make noise, wave arms, and never run—running triggers their instinct to chase and attack.', es: 'En el raro caso de un encuentro, mantén la postura erguida, haz ruido, agita los brazos y nunca corras; correr activa su instinto de persecución y ataque.' } }, // source: NPS Safety Guidelines
    ],
  },
  {
    id: 'canyon-wren',
    name: { en: 'Canyon Wren', es: 'Cucarachero de los cañones' },
    region: { en: 'Sandstone Walls', es: 'Paredes de arenisca' },
    coord: { en: 'Length 5 in · Cascading Song', es: 'Longitud de 5 in (13 cm) · Canto en cascada' },
    accent: '#CD7F32',
    colorName: { en: 'Bronze', es: 'Bronce' },
    teaser: { en: 'A small bird whose beautiful, cascading whistle is the signature soundtrack of Zion Canyon.', es: 'Un ave pequeña cuyo hermoso silbido en cascada es la banda sonora característica del Cañón de Zion.' },
    facts: [
      { tag: { en: 'Wow', es: 'Sorprendente' }, text: { en: 'They are famous for their musical song: a rapid series of clear, whistled notes that cascade down in pitch and echo loudly off canyon walls.', es: 'Son famosos por su canto musical: una serie rápida de notas claras y silbadas que descienden de tono y resuenan fuertemente en las paredes del cañón.' } }, // source: Cornell Lab of Ornithology
      { tag: { en: 'Adaptation', es: 'Adaptación' }, text: { en: 'They possess specialized long, slender, slightly decurved bills perfect for probing deep sandstone crevices for spiders and insects.', es: 'Poseen picos especializados largos, delgados y ligeramente curvados hacia abajo, perfectos para explorar grietas profundas en la arenisca en busca de arañas e insectos.' } }, // source: Audubon Guide to North American Birds
      { tag: { en: 'Behavior', es: 'Comportamiento' }, text: { en: 'Their flattened skull shape and low center of gravity allow them to easily squeeze and crawl into horizontal cracks in vertical cliffs.', es: 'Su forma de cráneo aplanada y su bajo centro de gravedad les permiten deslizarse e introducirse fácilmente en grietas horizontales en acantilados verticales.' } }, // source: Birds of Utah Survey
    ],
  },
  {
    id: 'zion-snail',
    name: { en: 'Zion Snail', es: 'Caracol de Zion' },
    region: { en: 'Hanging Gardens', es: 'Jardines colgantes' },
    coord: { en: 'Size 1.5–2 mm · Endemic', es: 'Tamaño 1.5–2 mm · Endémico' },
    accent: '#7E57C2',
    colorName: { en: 'Wet Slate', es: 'Pizarra húmeda' },
    teaser: { en: 'A tiny, endemic snail found nowhere else on Earth except Zion\'s vertical weeping walls.', es: 'Un caracol diminuto y endémico que no se encuentra en ningún otro lugar de la Tierra excepto en las paredes llorosas verticales de Zion.' },
    facts: [
      { tag: { en: 'Record', es: 'Récord' }, text: { en: 'This species is endemic to Zion National Park, meaning it lives in the park\'s wet hanging gardens and nowhere else on Earth.', es: 'Esta especie es endémica del Parque Nacional Zion, lo que significa que vive en los jardines colgantes húmedos del parque y en ningún otro lugar de la Tierra.' } }, // source: NPS Zion Snail Research
      { tag: { en: 'Scale', es: 'Escala' }, text: { en: 'They are exceptionally small; their mature spiral shells measure only about 1.5 to 2 millimeters (0.08 inches) wide.', es: 'Son excepcionalmente pequeños; sus conchas espirales maduras miden solo de 1.5 a 2 milímetros (0.08 pulgadas) de ancho.' } }, // source: Utah Division of Wildlife Resources Sensitive Species
      { tag: { en: 'Ecology', es: 'Ecología' }, text: { en: 'They survive on sheer, water-dripping cliffs, feeding on microscopic algae and decaying organic matter found in wet moss beds.', es: 'Sobreviven en acantilados verticales que gotean agua, alimentándose de algas microscópicas y materia orgánica en descomposición que se encuentra en los lechos de musgo húmedo.' } }, // source: NPS Hanging Gardens Biome
    ],
  },
];

const placesQuiz: QuizQuestion[] = [
  {
    subjectId: 'angels-landing',
    q: { en: 'What is required to hike the final chain-assisted section of Angels Landing?', es: '¿Qué se requiere para recorrer la última sección asistida por cadenas de Angels Landing?' },
    opts: [
      { en: 'A wilderness climbing harness and helmet', es: 'Un arnés de escalada y un casco para áreas silvestres' },
      { en: 'A seasonal permit from the lottery system', es: 'Un permiso de temporada obtenido mediante el sistema de lotería' },
      { en: 'An escort from a certified park ranger', es: 'El acompañamiento de un guardaparque certificado' },
      { en: 'Nothing, it is open to all visitors at all times', es: 'Nada, está abierto a todos los visitantes en todo momento' },
    ],
    a: 1,
    why: { en: 'A permit lottery system was introduced in 2022 to manage crowding and improve safety on the steep, narrow ridge.', es: 'En 2022 se introdujo un sistema de lotería de permisos para gestionar las multitudes y mejorar la seguridad en la cresta empinada y estrecha.' },
  },
  {
    subjectId: 'the-narrows',
    q: { en: 'Which river carved the deep canyon of The Narrows?', es: '¿Qué río esculpió el profundo cañón de The Narrows?' },
    opts: [
      { en: 'The Colorado River', es: 'El río Colorado' },
      { en: 'The Green River', es: 'El río Green' },
      { en: 'The Virgin River', es: 'El río Virgin' },
      { en: 'The Escalante River', es: 'El río Escalante' },
    ],
    a: 2,
    why: { en: 'The Virgin River carved the towering slot canyon over millions of years and still runs through it today.', es: 'El río Virgin esculpió el imponente cañón de ranura a lo largo de millones de años y todavía fluye por él hoy en día.' },
  },
  {
    subjectId: 'the-narrows',
    q: { en: 'What is the primary natural hazard hikers face inside The Narrows?', es: '¿Cuál es el principal peligro natural que enfrentan los excursionistas dentro de The Narrows?' },
    opts: [
      { en: 'Severe rockfalls', es: 'Desprendimientos severos de rocas' },
      { en: 'Sudden flash floods', es: 'Inundaciones repentinas y súbitas' },
      { en: 'Extreme dehydration', es: 'Deshidratación extrema' },
      { en: 'Slickrock wildfires', es: 'Incendios forestales en roca pulida' },
    ],
    a: 1,
    why: { en: 'Sudden storms miles away can quickly trigger catastrophic flash floods inside the narrow canyon walls with little warning.', es: 'Las tormentas repentinas a millas de distancia pueden desencadenar rápidamente inundaciones repentinas catastróficas dentro de las estrechas paredes del cañón con muy poco aviso.' },
  },
  {
    subjectId: 'the-subway',
    q: { en: 'What shape characterizes the Left Fork canyon known as The Subway?', es: '¿Qué forma caracteriza al cañón de la bifurcación izquierda conocido como The Subway?' },
    opts: [
      { en: 'A perfect step pyramid', es: 'Una pirámide escalonada perfecta' },
      { en: 'A tubular, curved sandstone passage', es: 'Un pasaje de arenisca curvo y tubular' },
      { en: 'A wide, sandy delta', es: 'Un delta amplio y arenoso' },
      { en: 'A deep spiraling volcanic chimney', es: 'Una chimenea volcánica profunda en espiral' },
    ],
    a: 1,
    why: { en: 'The Left Fork of North Creek has eroded the sandstone into a distinct, tube-like subterranean tunnel.', es: 'La bifurcación izquierda de North Creek ha erosionado la arenisca formando un distintivo túnel subterráneo similar a un tubo.' },
  },
  {
    subjectId: 'court-of-the-patriarchs',
    q: { en: 'Who are the three biblical figures the Court of the Patriarchs peaks are named after?', es: '¿Quiénes son los tres personajes bíblicos que dan nombre a los picos de la Corte de los Patriarcas?' },
    opts: [
      { en: 'Matthew, Mark, and Luke', es: 'Mateo, Marcos y Lucas' },
      { en: 'Abraham, Isaac, and Jacob', es: 'Abraham, Isaac y Jacob' },
      { en: 'Peter, Paul, and John', es: 'Pedro, Pablo y Juan' },
      { en: 'David, Solomon, and Samuel', es: 'David, Salomón y Samuel' },
    ],
    a: 1,
    why: { en: 'A Methodist minister named the three prominent monoliths Abraham, Isaac, and Jacob in 1916.', es: 'Un ministro metodista nombró a los tres prominentes monolitos Abraham, Isaac y Jacob en 1916.' },
  },
  {
    subjectId: 'great-white-throne',
    q: { en: 'What is the approximate height of the sheer cliff of the Great White Throne above the canyon floor?', es: '¿Cuál es la altura aproximada del acantilado vertical del Great White Throne sobre el suelo del cañón?' },
    opts: [
      { en: '500 feet', es: '500 pies (150 metros)' },
      { en: '1,200 feet', es: '1,200 pies (365 metros)' },
      { en: '2,400 feet', es: '2,400 pies (730 metros)' },
      { en: '5,000 feet', es: '5,000 pies (1,500 metros)' },
    ],
    a: 2,
    why: { en: 'The massive white monolith rises approximately 2,400 feet above the floor of Zion Canyon.', es: 'El enorme monolito blanco se eleva aproximadamente 2,400 pies (730 metros) sobre el suelo del Cañón de Zion.' },
  },
  {
    subjectId: 'emerald-pools',
    q: { en: 'What biological organisms give the Emerald Pools their green color?', es: '¿Qué organismos biológicos les dan a las Emerald Pools su color verde?' },
    opts: [
      { en: 'Copper mineral deposits', es: 'Depósitos minerales de cobre' },
      { en: 'Thriving algae species', es: 'Especies de algas prósperas' },
      { en: 'Spotted frog eggs', es: 'Huevos de rana manchada' },
      { en: 'Reflected pine forest canopy', es: 'El reflejo del dosel del bosque de pinos' },
    ],
    a: 1,
    why: { en: 'Algae growing in the slow-moving, sunlit pools give the water its characteristic emerald green color.', es: 'Las algas que crecen en las pozas de agua de movimiento lento y expuestas al sol le dan al agua su característico color verde esmeralda.' },
  },
  {
    subjectId: 'checkerboard-mesa',
    q: { en: 'What geological process caused the horizontal lines on Checkerboard Mesa?', es: '¿Qué proceso geológico causó las líneas horizontales en Checkerboard Mesa?' },
    opts: [
      { en: 'Glacial scraping', es: 'Raspado glacial' },
      { en: 'Horizontal cross-bedding from ancient dunes', es: 'Estratificación cruzada horizontal de dunas antiguas' },
      { en: 'Tectonic plate collisions', es: 'Colisiones de placas tectónicas' },
      { en: 'Ancient lake sediment deposits', es: 'Depósitos de sedimentos de un antiguo lago' },
    ],
    a: 1,
    why: { en: 'The horizontal lines are cross-bedding from Jurassic-era windblown sand dunes that fossilized over time.', es: 'Las líneas horizontales son de estratificación cruzada de dunas de arena arrastradas por el viento en la era jurásica que se fosilizaron con el tiempo.' },
  },
];

const animalsQuiz: QuizQuestion[] = [
  {
    subjectId: 'california-condor',
    q: { en: 'How wide is the maximum wingspan of a California Condor?', es: '¿Cuánto mide la envergadura máxima de un cóndor de California?' },
    opts: [
      { en: 'Up to 5 feet', es: 'Hasta 5 pies (1.5 m)' },
      { en: 'Up to 7 feet', es: 'Hasta 7 pies (2.1 m)' },
      { en: 'Up to 9.5 feet', es: 'Hasta 9.5 pies (2.9 m)' },
      { en: 'Up to 12 feet', es: 'Hasta 12 pies (3.7 m)' },
    ],
    a: 2,
    why: { en: 'The California Condor has a massive wingspan of up to 9.5 feet, the largest of any North American land bird.', es: 'El cóndor de California tiene una enorme envergadura de hasta 9.5 pies (2.9 metros), la más grande de cualquier ave terrestre norteamericana.' },
  },
  {
    subjectId: 'california-condor',
    q: { en: 'What is the leading cause of death for wild California Condors?', es: '¿Cuál es la principal causa de muerte de los cóndores de California salvajes?' },
    opts: [
      { en: 'Predation by mountain lions', es: 'Depredación por pumas' },
      { en: 'Lead poisoning from ingested ammunition fragments', es: 'Envenenamiento por plomo debido a fragmentos de munición ingeridos' },
      { en: 'Collisions with wind turbines', es: 'Colisiones con turbinas eólicas' },
      { en: 'Loss of sandstone nesting ledges', es: 'Pérdida de repisas de anidación en la arenisca' },
    ],
    a: 1,
    why: { en: 'Condors ingest toxic lead fragments when feeding on carcasses shot with lead ammunition.', es: 'Los cóndores ingieren fragmentos de plomo tóxicos al alimentarse de cadáveres de animales abatidos con munición de plomo.' },
  },
  {
    subjectId: 'desert-bighorn',
    q: { en: 'How do desert bighorn sheep safely navigate Zion\'s steep rock faces?', es: '¿Cómo navegan de manera segura los borregos cimarrones por las empinadas paredes rocosas de Zion?' },
    opts: [
      { en: 'They have sharp retractable claws', es: 'Tienen garras retráctiles afiladas' },
      { en: 'Their specialized hooves have a hard outer edge and rubbery core', es: 'Sus pezuñas especializadas tienen un borde exterior duro y un núcleo gomoso' },
      { en: 'They use magnetotactic alignment', es: 'Utilizan la alineación magnetotáctica' },
      { en: 'They only climb along vegetated ledge systems', es: 'Solo suben a lo largo de sistemas de repisas con vegetación' },
    ],
    a: 1,
    why: { en: 'Their hooves feature a hard outer rim for digging into cracks and a soft, spongy pad for gripping slick rock.', es: 'Sus pezuñas cuentan con un borde exterior duro para introducirse en las grietas y una almohadilla blanda y esponjosa para adherirse a la roca resbaladiza.' },
  },
  {
    subjectId: 'mule-deer',
    q: { en: 'Why are visitors strictly prohibited from feeding Zion\'s mule deer?', es: '¿Por qué está estrictamente prohibido que los visitantes alimenten a los ciervos mulos de Zion?' },
    opts: [
      { en: 'It causes them to shed their winter coats early', es: 'Hace que muden sus pelajes de invierno antes de tiempo' },
      { en: 'Human food disrupts their specialized gut bacteria, leading to starvation', es: 'La comida humana altera las bacterias intestinales especializadas que poseen, lo que les provoca la muerte por inanición' },
      { en: 'Deer will develop predatory hunting habits', es: 'Los ciervos desarrollarán hábitos de caza depredadores' },
      { en: 'It ruins their natural hibernation cycles', es: 'Arruina sus ciclos naturales de hibernación' },
    ],
    a: 1,
    why: { en: 'Mule deer have complex multi-chambered stomachs; human food disrupts their gut flora, causing starvation despite a full stomach.', es: 'Los ciervos mulos tienen estómagos complejos de varias cámaras; la comida humana altera su flora intestinal, provocando inanición a pesar de tener el estómago lleno.' },
  },
  {
    subjectId: 'mexican-spotted-owl',
    q: { en: 'Why do Mexican spotted owls in Zion seek out slot canyons?', es: '¿Por qué los búhos manchados mexicanos en Zion buscan los cañones de ranura?' },
    opts: [
      { en: 'They hunt aquatic cave insects', es: 'Cazan insectos acuáticos de cuevas' },
      { en: 'Slot canyons mimic cool, shaded forest microclimates', es: 'Los cañones de ranura imitan los microclimas de bosques frescos y sombreados' },
      { en: 'They require echoing canyon acoustics to call mates', es: 'Requieren la acústica resonante del cañón para llamar a sus parejas' },
      { en: 'To escape high-altitude mountain lion hunts', es: 'Para escapar de la caza de pumas en las alturas' },
    ],
    a: 1,
    why: { en: 'Slot canyons remain significantly cooler than the open desert, providing the shaded, temperate climate these owls require.', es: 'Los cañones de ranura se mantienen significativamente más frescos que el desierto abierto, proporcionando el clima sombreado y templado que estos búhos requieren.' },
  },
  {
    subjectId: 'mountain-lion',
    q: { en: 'What should you do if you encounter a mountain lion in Zion?', es: '¿Qué debes hacer si te encuentras con un puma en Zion?' },
    opts: [
      { en: 'Run away as fast as possible', es: 'Correr tan rápido como sea posible' },
      { en: 'Stand tall, make noise, throw rocks, and do not run', es: 'Mantenerse erguido, hacer ruido, lanzar piedras y no correr' },
      { en: 'Play dead on the ground', es: 'Hacerse el muerto en el suelo' },
      { en: 'Climb the nearest tall tree', es: 'Subir al árbol alto más cercano' },
    ],
    a: 1,
    why: { en: 'Running triggers a mountain lion\'s predatory chase reflex; standing tall and being aggressive deters them.', es: 'Correr activa el reflejo de caza depredadora de un puma; mantenerse erguido y mostrarse agresivo los disuade.' },
  },
  {
    subjectId: 'zion-snail',
    q: { en: 'Where is the tiny, endemic Zion snail found?', es: '¿Dónde se encuentra el diminuto y endémico caracol de Zion?' },
    opts: [
      { en: 'On dry desert sand dunes', es: 'En dunas de arena secas del desierto' },
      { en: 'On wet, weeping sandstone walls in hanging gardens', es: 'En paredes húmedas de arenisca filtrante en jardines colgantes' },
      { en: 'At the muddy bottom of the Virgin River', es: 'En el fondo fangoso del río Virgin' },
      { en: 'In hollow ponderosa logs on the Kolob Terrace', es: 'En troncos huecos de pino ponderosa en Kolob Terrace' },
    ],
    a: 1,
    why: { en: 'The Zion snail is endemic to Zion and lives entirely on wet, trickling hanging garden cliffs.', es: 'El caracol de Zion es endémico de Zion y vive por completo en los acantilados húmedos y goteantes de los jardines colgantes.' },
  },
];

export const zion: Park = {
  slug: 'zion',
  name: { en: 'Zion', es: 'Zion' },
  region: { en: 'Utah · Colorado Plateau', es: 'Utah · Meseta del Colorado' },
  tagline: { en: 'A sanctuary of towering sandstone cliffs, deep narrow slot canyons, and hanging gardens carved by the Virgin River.', es: 'Un santuario de imponentes acantilados de arenisca, profundos y estrechos cañones de ranura, y jardines colgantes esculpidos por el río Virgin.' },
  safetyNote: { en: 'Safety Note: Stay out of slot canyons if rain is forecast; flash floods are fast and deadly. Keep 100 yards from mountain lions, and 25 yards from bighorn sheep and other wildlife. Always remain on designated trails to protect fragile biological soil crusts.', es: 'Nota de seguridad: Mantente fuera de los cañones de ranura si se pronostica lluvia; las inundaciones repentinas son rápidas y mortales. Mantén una distancia de 100 yardas (90 m) de los pumas, y de 25 yardas (23 m) de los borregos cimarrones y otros animales salvajes. Permanece siempre en los senderos designados para proteger las frágiles costras biológicas del suelo.' },
  decks: [
    { id: 'places', label: { en: 'Places', es: 'Lugares' }, dotColor: '#CB5C39', subjects: places, quiz: placesQuiz },
    { id: 'animals', label: { en: 'Animals', es: 'Animales' }, dotColor: '#8CA352', subjects: animals, quiz: animalsQuiz },
  ],
};
