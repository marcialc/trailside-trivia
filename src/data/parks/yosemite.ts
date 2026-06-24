import type { Park, Subject, QuizQuestion } from '../types';

const places: Subject[] = [
  {
    id: 'yosemite-valley',
    name: { en: 'Yosemite Valley', es: 'Valle de Yosemite' },
    region: { en: 'Valley Floor', es: 'Fondo del valle' },
    coord: { en: '37.745°N · 4,000 ft elevation', es: '37.745°N · 4,000 pies de altitud' },
    accent: '#4D7C59',
    colorName: { en: 'Glacial Green', es: 'Verde glacial' },
    teaser: { en: 'The world-famous heart of the park, sculpted by ice and framed by towering cliffs.', es: 'El mundialmente famoso corazón del parque, esculpido por el hielo y enmarcado por imponentes acantilados.' },
    facts: [
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'Glaciers carved this seven-mile-long canyon from solid granite, leaving behind flat meadows and sheer walls.', es: 'Los glaciares tallaron este cañón de siete millas de largo en granito sólido, dejando a su paso praderas planas y paredes verticales.' } }, // source: NPS
      { tag: { en: 'Water', es: 'Agua' }, text: { en: 'The Merced River flows through the valley floor, fed by high alpine snowpack and massive spring runoff.', es: 'El río Merced fluye por el fondo del valle, alimentado por la capa de nieve de alta montaña y el gran deshielo de primavera.' } }, // source: NPS
      { tag: { en: 'History', es: 'Historia' }, text: { en: 'It was first set aside for protection by President Abraham Lincoln in the landmark 1864 Yosemite Grant.', es: 'Fue protegido por primera vez por el presidente Abraham Lincoln en la histórica Subvención de Yosemite de 1864.' } }, // source: NPS
      { tag: { en: 'Sightseeing', es: 'Turismo' }, text: { en: 'Iconic viewpoints like Tunnel View frame El Capitan, Half Dome, and Bridalveil Fall in a single panorama.', es: 'Puntos de observación icónicos como Tunnel View enmarcan El Capitán, Half Dome y la cascada Bridalveil en un solo panorama.' } }, // source: NPS
    ],
  },
  {
    id: 'el-capitan',
    name: { en: 'El Capitan', es: 'El Capitán' },
    region: { en: 'Yosemite Valley', es: 'Valle de Yosemite' },
    coord: { en: '3,000 ft vertical rise', es: '3,000 pies de ascenso vertical' },
    accent: '#8E8E93',
    colorName: { en: 'Granite Gray', es: 'Gris granito' },
    teaser: { en: 'The ultimate rock-climbing wall — a single massive block of exposed granite.', es: 'La pared de escalada en roca definitiva: un solo bloque enorme de granito expuesto.' },
    facts: [
      { tag: { en: 'Record', es: 'Récord' }, text: { en: 'It is one of the world’s largest exposed monoliths of granite, rising more than 3,000 feet from the valley floor.', es: 'Es uno de los monolitos de granito expuesto más grandes del mundo, elevándose a más de 3,000 pies desde el fondo del valle.' } }, // source: NPS
      { tag: { en: 'Climbing', es: 'Escalada' }, text: { en: 'In 2017, Alex Honnold completed the first-ever free solo climb of El Capitan via the Freerider route without ropes.', es: 'En 2017, Alex Honnold completó la primera escalada en solitario libre de El Capitán a través de la ruta Freerider sin cuerdas.' } }, // source: Yosemite Climbing Association
      { tag: { en: 'Climbing', es: 'Escalada' }, text: { en: 'Most traditional climbers take three to five days to scale the sheer face, sleeping on hanging portaledges.', es: 'La mayoría de los escaladores tradicionales tardan de tres a cinco días en escalar la empinada pared, durmiendo en hamacas de escalada colgantes.' } }, // source: NPS
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'The monolith is composed primarily of extremely hard, joint-free granite that resisted glacial erosion.', es: 'El monolito está compuesto principalmente de granito extremadamente duro y sin fisuras que resistió la erosión glaciar.' } }, // source: USGS
    ],
  },
  {
    id: 'half-dome',
    name: { en: 'Half Dome', es: 'Half Dome' },
    region: { en: 'Yosemite Valley', es: 'Valle de Yosemite' },
    coord: { en: '8,839 ft elevation', es: '8,839 pies de altitud' },
    accent: '#7A8B99',
    colorName: { en: 'Sheer Slate', es: 'Pizarra vertical' },
    teaser: { en: 'Yosemite’s most distinctive silhouette and the challenge of the famous cable route.', es: 'La silueta más distintiva de Yosemite y el desafío de la famosa ruta de los cables.' },
    facts: [
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'Its unique shape is the result of glacial scraping at its base and exfoliation shedding curved rock sheets.', es: 'Su forma única es el resultado del desgaste glaciar en su base y de la exfoliación que desprende placas de roca curvas.' } }, // source: USGS
      { tag: { en: 'Climbing', es: 'Escalada' }, text: { en: 'The sheer northwest face is an 1,800-foot vertical wall, first climbed in 1957 by Royal Robbins.', es: 'La empinada cara noroeste es una pared vertical de 1,800 pies, escalada por primera vez en 1957 por Royal Robbins.' } }, // source: NPS
      { tag: { en: 'Hiking', es: 'Senderismo' }, text: { en: 'The Cable Route allows hikers to scale the final 400 feet of 45-degree granite without traditional climbing gear.', es: 'La ruta de los cables permite a los senderistas escalar los últimos 400 pies de granito con una inclinación de 45 grados sin equipo de escalada tradicional.' } }, // source: NPS
      { tag: { en: 'Safety', es: 'Seguridad' }, text: { en: 'Permits are strictly required for the Cables hike to prevent dangerous overcrowding on the steep slope.', es: 'Se requieren permisos estrictamente para la caminata por los cables para evitar peligrosas aglomeraciones en la empinada pendiente.' } }, // source: NPS
    ],
  },
  {
    id: 'yosemite-falls',
    name: { en: 'Yosemite Falls', es: 'Cascadas de Yosemite' },
    region: { en: 'Yosemite Valley', es: 'Valle de Yosemite' },
    coord: { en: '2,425 ft · Tallest in North America', es: '2,425 pies · La más alta de Norteamérica' },
    accent: '#2B6CB0',
    colorName: { en: 'Torrent Blue', es: 'Azul torrente' },
    teaser: { en: 'One of the world’s tallest waterfalls, thundering down three dramatic drops.', es: 'Una de las cascadas más altas del mundo, que desciende con estruendo en tres caídas espectaculares.' },
    facts: [
      { tag: { en: 'Record', es: 'Récord' }, text: { en: 'At 2,425 feet, it is the tallest waterfall in Yosemite and ranks among the tallest on Earth.', es: 'Con 2,425 pies, es la cascada más alta de Yosemite y se encuentra entre las más altas del planeta.' } }, // source: NPS
      { tag: { en: 'Structure', es: 'Estructura' }, text: { en: 'It consists of three sections: Upper Yosemite Fall (1,430 ft), the Middle Cascades (675 ft), and Lower Yosemite Fall (320 ft).', es: 'Consta de tres secciones: la cascada superior de Yosemite (1,430 pies), las cascadas medias (675 pies) y la cascada inferior de Yosemite (320 pies).' } }, // source: NPS
      { tag: { en: 'Seasons', es: 'Estaciones' }, text: { en: 'It is highly seasonal, roaring from spring snowmelt in May and shrinking to a trickle or drying up by August.', es: 'Es muy estacional; ruge con el deshielo de primavera en mayo y se reduce a un hilo de agua o se seca por completo en agosto.' } }, // source: NPS
      { tag: { en: 'Winter', es: 'Invierno' }, text: { en: 'In freezing winters, a massive ice cone up to several hundred feet tall forms at the base of the upper fall.', es: 'En inviernos helados, se forma un enorme cono de hielo de hasta varios cientos de pies de altura en la base de la cascada superior.' } }, // source: NPS
    ],
  },
  {
    id: 'mariposa-grove',
    name: { en: 'Mariposa Grove', es: 'Mariposa Grove' },
    region: { en: 'Southern Yosemite', es: 'Sur de Yosemite' },
    coord: { en: 'Over 500 mature Sequoias', es: 'Más de 500 secuoyas maduras' },
    accent: '#9C5B43',
    colorName: { en: 'Sequoia Red', es: 'Rojo secuoya' },
    teaser: { en: 'The park’s largest grove of giant sequoias, containing some of the oldest living things on Earth.', es: 'El bosque de secuoyas gigantes más grande del parque, que alberga algunos de los seres vivos más antiguos de la Tierra.' },
    facts: [
      { tag: { en: 'Flora', es: 'Flora' }, text: { en: 'It contains about 500 mature giant sequoias, which can live for over 3,000 years and grow bark up to two feet thick.', es: 'Contiene unas 500 secuoyas gigantes maduras, que pueden vivir más de 3,000 años y desarrollar una corteza de hasta dos pies de espesor.' } }, // source: NPS
      { tag: { en: 'Oldest', es: 'El más antiguo' }, text: { en: 'The Grizzly Giant is the grove’s oldest tree, estimated to be around 2,700 years old.', es: 'El Grizzly Giant es el árbol más antiguo del bosque, con una edad estimada de unos 2,700 años.' } }, // source: NPS
      { tag: { en: 'Ecology', es: 'Ecología' }, text: { en: 'Giant sequoias rely on natural, low-intensity forest fires to release seeds from their cones and clear competing foliage.', es: 'Las secuoyas gigantes dependen de incendios forestales naturales de baja intensidad para liberar las semillas de sus piñas y despejar el follaje competidor.' } }, // source: NPS
      { tag: { en: 'Conservation', es: 'Conservación' }, text: { en: 'A massive $40 million restoration completed in 2018 removed asphalt roads to protect the trees’ shallow root systems.', es: 'Una restauración masiva de 40 millones de dólares completada en 2018 eliminó las carreteras de asfalto para proteger las raíces poco profundas de los árboles.' } }, // source: NPS
    ],
  },
  {
    id: 'glacier-point',
    name: { en: 'Glacier Point', es: 'Glacier Point' },
    region: { en: 'South Wall Overlook', es: 'Mirador de la pared sur' },
    coord: { en: '7,214 ft elevation', es: '7,214 pies de altitud' },
    accent: '#D69E2E',
    colorName: { en: 'Sunset Amber', es: 'Ámbar del atardecer' },
    teaser: { en: 'A breathtaking overlook offering panoramic views of Half Dome and the high country.', es: 'Un mirador impresionante que ofrece vistas panorámicas de Half Dome y las tierras altas.' },
    facts: [
      { tag: { en: 'Elevation', es: 'Altitud' }, text: { en: 'It sits 3,200 feet directly above the Yosemite Valley floor, offering unmatched aerial views of the canyon.', es: 'Se encuentra a 3,200 pies directamente sobre el fondo del valle de Yosemite, ofreciendo vistas aéreas inigualables del cañón.' } }, // source: NPS
      { tag: { en: 'History', es: 'Historia' }, text: { en: 'From 1872 to 1968, hotel operators pushed glowing embers off the cliff in a famous spectacle known as the Firefall.', es: 'De 1872 a 1968, los operadores hoteleros arrojaban brasas ardientes por el acantilado en un famoso espectáculo conocido como la Cascada de Fuego.' } }, // source: NPS
      { tag: { en: 'Seasons', es: 'Estaciones' }, text: { en: 'It is accessible by car from late spring to fall, but in winter it is only reachable via a 10.5-mile cross-country ski trip.', es: 'Es accesible en auto desde finales de primavera hasta el otoño, pero en invierno solo se puede llegar mediante una excursión de esquí de fondo de 10.5 millas.' } }, // source: NPS
    ],
  },
  {
    id: 'tuolumne-meadows',
    name: { en: 'Tuolumne Meadows', es: 'Praderas de Tuolumne' },
    region: { en: 'Tuolumne River Basin', es: 'Cuenca del río Tuolumne' },
    coord: { en: '8,600 ft elevation', es: '8,600 pies de altitud' },
    accent: '#5A6F3D',
    colorName: { en: 'Subalpine Green', es: 'Verde subalpino' },
    teaser: { en: 'A vast, pristine subalpine meadow surrounded by high granite domes.', es: 'Una pradera subalpina vasta e inmaculada rodeada de altos domos de granito.' },
    facts: [
      { tag: { en: 'Geography', es: 'Geografía' }, text: { en: 'It is one of the largest high-elevation meadows in the Sierra Nevada, situated along the wild Tuolumne River.', es: 'Es una de las praderas de gran altitud más grandes de Sierra Nevada, situada a lo largo del salvaje río Tuolumne.' } }, // source: NPS
      { tag: { en: 'Backcountry', es: 'Zonas agrestes' }, text: { en: 'The area serves as a major trailhead for the John Muir Trail and the Pacific Crest Trail.', es: 'La zona sirve como un punto de partida importante para el sendero John Muir y el sendero de la cresta del Pacífico (Pacific Crest Trail).' } }, // source: NPS
      { tag: { en: 'Geology', es: 'Geología' }, text: { en: 'The landscape features Lembert Dome, a classic Roche Moutonnée sheared smooth on one side by glaciers.', es: 'El paisaje cuenta con el domo Lembert, una roca aborregada (roche moutonnée) clásica, pulida por un lado por los glaciares.' } }, // source: USGS
      { tag: { en: 'Weather', es: 'Clima' }, text: { en: 'Heavy winter snow keeps the high-elevation Tioga Road closed for roughly half the year, typically from November to May.', es: 'Las fuertes nevadas invernales mantienen cerrada la carretera Tioga, de gran altitud, aproximadamente la mitad del año, normalmente de noviembre a mayo.' } }, // source: NPS
    ],
  },
];

const animals: Subject[] = [
  {
    id: 'black-bear',
    name: { en: 'American Black Bear', es: 'Oso negro americano' },
    region: { en: 'Forests & Meadows', es: 'Bosques y praderas' },
    coord: { en: '200–500 lb · ~300–500 in park', es: '200–500 lb · ~300–500 en el parque' },
    accent: '#2D3748',
    colorName: { en: 'Charcoal Forager', es: 'Recolector color carbón' },
    teaser: { en: 'Yosemite’s largest mammalian omnivores, though they eat mostly plants and insects.', es: 'Los omnívoros mamíferos más grandes de Yosemite, aunque comen principalmente plantas e insectos.' },
    facts: [
      { tag: { en: 'Myth', es: 'Mito' }, text: { en: 'Despite their name, most black bears in Yosemite actually have brown, blonde, or cinnamon-colored coats.', es: 'A pesar de su nombre, la mayoría de los osos negros de Yosemite en realidad tienen pelaje marrón, rubio o color canela.' } }, // source: NPS
      { tag: { en: 'Intelligence', es: 'Inteligencia' }, text: { en: 'They have an incredible sense of smell and are clever foragers, requiring the use of metal bear-proof lockers.', es: 'Tienen un sentido del olfato increíble y son buscadores de comida astutos, lo que requiere el uso de casilleros metálicos a prueba de osos.' } }, // source: NPS
      { tag: { en: 'Management', es: 'Gestión' }, text: { en: 'Yosemite’s bear management program has successfully reduced food-stealing incidents by over 95% since the late 1990s.', es: 'El programa de gestión de osos de Yosemite ha reducido con éxito los incidentes de robo de comida en más del 95% desde finales de la década de 1990.' } }, // source: NPS
      { tag: { en: 'Behavior', es: 'Comportamiento' }, text: { en: 'Yosemite bears do not experience true hibernation; they enter a light sleep state called torpor but can wake if disturbed.', es: 'Los osos de Yosemite no experimentan una verdadera hibernación; entran en un estado de sueño ligero llamado letargo, pero pueden despertarse si se les molesta.' } }, // source: NPS
    ],
  },
  {
    id: 'sierra-bighorn',
    name: { en: 'Sierra Nevada Bighorn Sheep', es: 'Borrego cimarrón de Sierra Nevada' },
    region: { en: 'High Peaks & Cliffs', es: 'Picos altos y acantilados' },
    coord: { en: 'Endangered · Elev. to 14,000 ft', es: 'En peligro de extinción · Altitud hasta 14,000 pies' },
    accent: '#A08575',
    colorName: { en: 'Crest Climber', es: 'Escalador de crestas' },
    teaser: { en: 'An endangered mountaineer that thrives on the steepest, most rugged alpine cliffs.', es: 'Un montañero en peligro de extinción que prospera en los acantilados alpinos más empinados y escarpados.' },
    facts: [
      { tag: { en: 'Status', es: 'Estado' }, text: { en: 'This subspecies is one of the most endangered mammals in North America, adapted to elevations up to 14,000 feet.', es: 'Esta subespecie es uno de los mamíferos más amenazados de Norteamérica, adaptada a altitudes de hasta 14,000 pies.' } }, // source: NPS
      { tag: { en: 'History', es: 'Historia' }, text: { en: 'They were wiped out from Yosemite by 1914 due to hunting and domestic sheep diseases, but were reintroduced in 1986.', es: 'Fueron diezmados en Yosemite hacia 1914 debido a la caza y a enfermedades de ovejas domésticas, pero fueron reintroducidos en 1986.' } }, // source: NPS
      { tag: { en: 'Anatomy', es: 'Anatomía' }, text: { en: 'Their specialized hooves have a hard outer edge and a rubbery center, giving them traction on vertical granite walls.', es: 'Sus pezuñas especializadas tienen un borde exterior duro y un centro gomoso, lo que les da tracción en las paredes verticales de granito.' } }, // source: NPS
      { tag: { en: 'Ruts', es: 'Celo' }, text: { en: 'Rams grow massive, coiled horns that can weigh up to 30 pounds, used in head-butting battles during the autumn rut.', es: 'Los carneros desarrollan cuernos enormes y en espiral que pueden pesar hasta 30 libras, utilizados en combates a cabezazos durante el celo de otoño.' } }, // source: NPS
    ],
  },
  {
    id: 'bobcat',
    name: { en: 'Bobcat', es: 'Lince rojo' },
    region: { en: 'Oak Woodlands & Meadows', es: 'Bosques de robles y praderas' },
    coord: { en: '15–30 lb · Secretive hunter', es: '15–30 lb · Cazador sigiloso' },
    accent: '#B7791F',
    colorName: { en: 'Tawny Stalker', es: 'Acechador leonado' },
    teaser: { en: 'A solitary, nocturnal cat that stalks rodents across the meadows.', es: 'Un felino solitario y nocturno que acecha roedores en las praderas.' },
    facts: [
      { tag: { en: 'Anatomy', es: 'Anatomía' }, text: { en: 'They get their name from their short, "bobbed" tail, which is only about four to seven inches long.', es: 'Reciben su nombre en inglés por su cola corta y "recortada" (bobbed), que mide solo de cuatro a siete pulgadas de largo.' } }, // source: NPS
      { tag: { en: 'Diet', es: 'Dieta' }, text: { en: 'Bobcats are highly adaptable predators, hunting rabbits, mice, and squirrels along meadow edges.', es: 'Los linces rojos son depredadores muy adaptables que cazan conejos, ratones y ardillas a lo largo de los límites de las praderas.' } }, // source: NPS
      { tag: { en: 'Sightings', es: 'Avistamientos' }, text: { en: 'While primarily nocturnal, they are occasionally spotted hunting in the early morning or dusk in Yosemite Valley.', es: 'Aunque son principalmente nocturnos, ocasionalmente se les ve cazando temprano en la mañana o al atardecer en el valle de Yosemite.' } }, // source: NPS
    ],
  },
  {
    id: 'stellers-jay',
    name: { en: 'Steller’s Jay', es: 'Chara de Steller' },
    region: { en: 'Conifer Forests', es: 'Bosques de coníferas' },
    coord: { en: 'Bold mimics · Blue crest', es: 'Imitadores audaces · Cresta azul' },
    accent: '#1A365D',
    colorName: { en: 'Cobalt Sentry', es: 'Centinela cobalto' },
    teaser: { en: 'The bold, blue-crested bird of the pine forests, known for its intelligence and noisy calls.', es: 'El audaz pájaro de cresta azul de los bosques de pinos, conocido por su inteligencia y cantos ruidosos.' },
    facts: [
      { tag: { en: 'Anatomy', es: 'Anatomía' }, text: { en: 'They are easily recognized by their striking blue bodies, black heads, and prominent feathered head crests.', es: 'Se reconocen fácilmente por sus llamativos cuerpos azules, cabezas negras y destacadas crestas de plumas en la cabeza.' } }, // source: NPS
      { tag: { en: 'Intelligence', es: 'Inteligencia' }, text: { en: 'As members of the crow family, they are incredibly smart and can mimic other birds, including red-tailed hawks.', es: 'Como miembros de la familia de los cuervos, son increíblemente inteligentes y pueden imitar a otras aves, incluidos los gavilanes colirrojos.' } }, // source: NPS
      { tag: { en: 'Behavior', es: 'Comportamiento' }, text: { en: 'They are notorious camp thieves, quickly swooping down to snatch unattended picnic food.', es: 'Son conocidos ladrones de campamentos, que bajan rápidamente en picada para arrebatar comida de picnic desatendida.' } }, // source: NPS
      { tag: { en: 'Safety', es: 'Seguridad' }, text: { en: 'Please do not feed them; human food harms their health and makes them aggressively dependent on visitors.', es: 'Por favor, no los alimente; la comida humana daña su salud y los hace agresivamente dependientes de los visitantes.' } }, // source: NPS
    ],
  },
  {
    id: 'mule-deer',
    name: { en: 'Mule Deer', es: 'Ciervo mulo' },
    region: { en: 'Valley Meadows', es: 'Praderas del valle' },
    coord: { en: 'Large ears · Forked antlers', es: 'Orejas grandes · Astas bifurcadas' },
    accent: '#718096',
    colorName: { en: 'Buckskin Browser', es: 'Ramoneador color ante' },
    teaser: { en: 'The valley’s most common large mammal, named for their oversized ears.', es: 'El mamífero grande más común del valle, llamado así por sus orejas de gran tamaño.' },
    facts: [
      { tag: { en: 'Anatomy', es: 'Anatomía' }, text: { en: 'Named for their large, mule-like ears, which help them detect predators and dissipate heat in summer.', es: 'Llamados así por sus orejas grandes similares a las de una mula, que les ayudan a detectar depredadores y disipar el calor en verano.' } }, // source: NPS
      { tag: { en: 'Diet', es: 'Dieta' }, text: { en: 'They are browsers, feeding on a wide variety of meadow grasses, woody plants, and acorns.', es: 'Son ramoneadores que se alimentan de una amplia variedad de pastos de pradera, plantas leñosas y bellotas.' } }, // source: NPS
      { tag: { en: 'Antlers', es: 'Astas' }, text: { en: 'Bucks grow antlers under a fuzzy layer of blood-rich skin called velvet, which they rub off on trees in late summer.', es: 'Los machos desarrollan astas bajo una capa aterciopelada de piel rica en sangre, que se frotan contra los árboles a finales del verano.' } }, // source: NPS
      { tag: { en: 'Food Web', es: 'Cadena alimenticia' }, text: { en: 'They are a vital prey source for Yosemite’s mountain lions, the park’s secretive apex predators.', es: 'Son una fuente de presa vital para los pumas de Yosemite, los sigilosos superdepredadores del parque.' } }, // source: NPS
    ],
  },
  {
    id: 'peregrine-falcon',
    name: { en: 'Peregrine Falcon', es: 'Halcón peregrino' },
    region: { en: 'Granite Cliffs', es: 'Acantilados de granito' },
    coord: { en: 'Speeds over 200 mph', es: 'Velocidades de más de 200 mph' },
    accent: '#4A5568',
    colorName: { en: 'Apex Flyer', es: 'Volador supremo' },
    teaser: { en: 'The fastest creature on Earth, nesting high on Yosemite’s granite cliffs.', es: 'La criatura más rápida de la Tierra, que anida en lo alto de los acantilados de granito de Yosemite.' },
    facts: [
      { tag: { en: 'Speed', es: 'Velocidad' }, text: { en: 'During high-speed hunting dives, called stoops, peregrine falcons can reach speeds of over 200 miles per hour.', es: 'Durante las inmersiones de caza a alta velocidad, el halcón peregrino puede alcanzar velocidades de más de 200 millas por hora.' } }, // source: NPS
      { tag: { en: 'Recovery', es: 'Recuperación' }, text: { en: 'Once nearly extinct due to DDT pesticide poisoning, their recovery is a major success story, with pairs nesting on El Capitan.', es: 'Alguna vez casi extinto debido al envenenamiento por el pesticida DDT, su recuperación es una gran historia de éxito, con parejas que anidan en El Capitán.' } }, // source: NPS
      { tag: { en: 'Protection', es: 'Protección' }, text: { en: 'To protect nesting pairs, the park temporarily closes specific climbing routes on El Capitan and Half Dome in spring.', es: 'Para proteger a las parejas en anidación, el parque cierra temporalmente rutas de escalada específicas en El Capitán y Half Dome en primavera.' } }, // source: NPS
    ],
  },
];

const placesQuiz: QuizQuestion[] = [
  {
    subjectId: 'el-capitan',
    q: { en: 'How high does the sheer face of El Capitan rise from Yosemite Valley?', es: '¿Qué altura tiene la pared vertical de El Capitán sobre el valle de Yosemite?' },
    opts: [
      { en: '1,000 feet', es: '1,000 pies' },
      { en: '3,000 feet', es: '3,000 pies' },
      { en: '5,000 feet', es: '5,000 pies' },
      { en: '8,000 feet', es: '8,000 pies' }
    ],
    a: 1,
    why: { en: 'El Capitan rises over 3,000 feet from the valley floor, making it one of the largest exposed granite monoliths in the world.', es: 'El Capitán se eleva más de 3,000 pies sobre el fondo del valle, lo que lo convierte en uno de los monolitos de granito expuesto más grandes del mundo.' },
  },
  {
    subjectId: 'yosemite-valley',
    q: { en: 'Which historic document first protected Yosemite Valley and Mariposa Grove?', es: '¿Qué documento histórico protegió por primera vez el valle de Yosemite y Mariposa Grove?' },
    opts: [
      { en: 'The National Parks Act of 1916', es: 'La Ley de Parques Nacionales de 1916' },
      { en: 'The Wilderness Act', es: 'La Ley de Áreas Silvestres (Wilderness Act)' },
      { en: 'The Yosemite Grant of 1864', es: 'La Subvención de Yosemite de 1864' },
      { en: 'The Antiquities Act', es: 'La Ley de Antigüedades' }
    ],
    a: 2,
    why: { en: 'Signed by Abraham Lincoln, the 1864 Yosemite Grant was the first time the federal government set aside land specifically for preservation.', es: 'Firmada por Abraham Lincoln, la Subvención de Yosemite de 1864 fue la primera vez que el gobierno federal reservó tierras específicamente para su preservación.' },
  },
  {
    subjectId: 'half-dome',
    q: { en: 'What is the most famous route for non-climbers to reach the top of Half Dome?', es: '¿Cuál es la ruta más famosa para que los no escaladores lleguen a la cima de Half Dome?' },
    opts: [
      { en: 'The Cable Route', es: 'La ruta de los cables' },
      { en: 'The Ledge Trail', es: 'El sendero de la cornisa (Ledge Trail)' },
      { en: 'The Mist Trail Ascent', es: 'El ascenso por el sendero Mist' },
      { en: 'The Dome Elevator', es: 'El ascensor del domo' }
    ],
    a: 0,
    why: { en: 'The Cable Route allows hikers to scale the final 400 feet of near-vertical granite using steel cables anchored into the rock.', es: 'La ruta de los cables permite a los senderistas escalar los últimos 400 pies de granito casi vertical usando cables de acero anclados a la roca.' },
  },
  {
    subjectId: 'yosemite-falls',
    q: { en: 'Why does Yosemite Falls often dry up or shrink to a trickle by late summer?', es: '¿Por qué la cascada de Yosemite a menudo se seca o se reduce a un hilo a finales del verano?' },
    opts: [
      { en: 'The park diverts the water', es: 'El parque desvía el agua' },
      { en: 'It is fed entirely by seasonal snowmelt', es: 'Se alimenta completamente del deshielo estacional' },
      { en: 'Invasive trees absorb the water', es: 'Los árboles invasores absorben el agua' },
      { en: 'It flows underground in summer', es: 'Fluye bajo tierra en verano' }
    ],
    a: 1,
    why: { en: 'Yosemite Falls relies almost entirely on winter snowpack, meaning its flow peaks in spring and dramatically drops by August.', es: 'La cascada de Yosemite depende casi por completo de la acumulación de nieve invernal, lo que significa que su caudal alcanza su punto máximo en primavera y cae drásticamente en agosto.' },
  },
  {
    subjectId: 'mariposa-grove',
    q: { en: 'Which tree is the oldest giant sequoia in Yosemite’s Mariposa Grove?', es: '¿Qué árbol es la secuoya gigante más antigua en Mariposa Grove de Yosemite?' },
    opts: [
      { en: 'The Pioneer Cabin Tree', es: 'El Pioneer Cabin Tree' },
      { en: 'The Wawona Tree', es: 'El árbol de Wawona' },
      { en: 'The Grizzly Giant', es: 'El Grizzly Giant' },
      { en: 'The General Sherman', es: 'El General Sherman' }
    ],
    a: 2,
    why: { en: 'The Grizzly Giant is estimated to be around 2,700 years old, making it the oldest tree in the grove.', es: 'Se estima que el Grizzly Giant tiene alrededor de 2,700 años, lo que lo convierte en el árbol más antiguo del bosque.' },
  },
  {
    subjectId: 'glacier-point',
    q: { en: 'What was the Yosemite Firefall, a historical spectacle at Glacier Point?', es: '¿Qué fue la Cascada de Fuego de Yosemite (Firefall), un espectáculo histórico en Glacier Point?' },
    opts: [
      { en: 'A natural volcanic vent', es: 'Una chimenea volcánica natural' },
      { en: 'A wildfire control technique', es: 'Una técnica de control de incendios forestales' },
      { en: 'Glowing embers pushed off the cliff', es: 'Brasas ardientes arrojadas por el acantilado' },
      { en: 'A laser light show', es: 'Un espectáculo de luces láser' }
    ],
    a: 2,
    why: { en: 'From 1872 to 1968, hotel owners pushed glowing fir embers off Glacier Point to create a spectacular glowing "waterfall" of fire.', es: 'De 1872 a 1968, los propietarios de hoteles arrojaban brasas ardientes de abeto desde Glacier Point para crear una espectacular "cascada" brillante de fuego.' },
  },
  {
    subjectId: 'tuolumne-meadows',
    q: { en: 'What type of geological feature is Lembert Dome in Tuolumne Meadows?', es: '¿Qué tipo de característica geológica es Lembert Dome en las praderas de Tuolumne?' },
    opts: [
      { en: 'A volcanic cinder cone', es: 'Un cono de escoria volcánica' },
      { en: 'A fault-block mountain', es: 'Una montaña de bloques de falla' },
      { en: 'A Roche Moutonnée', es: 'Una roca aborregada (roche moutonnée)' },
      { en: 'A tectonic rift', es: 'Una fosa tectónica' }
    ],
    a: 2,
    why: { en: 'Lembert Dome is a Roche Moutonnée, a granite dome carved and smoothed on one side by a passing glacier.', es: 'Lembert Dome es una roca aborregada, un domo de granito tallado y pulido por un lado por el paso de un glaciar.' },
  },
  {
    subjectId: 'el-capitan',
    q: { en: 'Who completed the first free solo climb (without ropes) of El Capitan in 2017?', es: '¿Quién completó la primera escalada en solitario libre (sin cuerdas) de El Capitán en 2017?' },
    opts: [
      { en: 'Tommy Caldwell', es: 'Tommy Caldwell' },
      { en: 'Royal Robbins', es: 'Royal Robbins' },
      { en: 'Alex Honnold', es: 'Alex Honnold' },
      { en: 'John Muir', es: 'John Muir' }
    ],
    a: 2,
    why: { en: 'Alex Honnold scaled the Freerider route in just under four hours without any safety ropes, a feat chronicled in the documentary Free Solo.', es: 'Alex Honnold escaló la ruta Freerider en poco menos de cuatro horas sin cuerdas de seguridad, una hazaña registrada en el documental Free Solo.' },
  },
];

const animalsQuiz: QuizQuestion[] = [
  {
    subjectId: 'black-bear',
    q: { en: 'What is true about the coat colors of black bears in Yosemite?', es: '¿Qué es verdad sobre los colores del pelaje de los osos negros en Yosemite?' },
    opts: [
      { en: 'They are always pitch black', es: 'Siempre son de color negro azabache' },
      { en: 'Most are actually brown, blonde, or cinnamon', es: 'La mayoría son en realidad marrones, rubios o de color canela' },
      { en: 'They change color based on the season', es: 'Cambian de color según la estación' },
      { en: 'They have black and white stripes', es: 'Tienen rayas blancas y negras' }
    ],
    a: 1,
    why: { en: 'Despite being the species "black bear," true black-colored bears are rare in Yosemite; most are shades of brown, blonde, or cinnamon.', es: 'A pesar de pertenecer a la especie "oso negro", los osos de color verdaderamente negro son raros en Yosemite; la mayoría son de tonos marrones, rubios o canela.' },
  },
  {
    subjectId: 'sierra-bighorn',
    q: { en: 'How did Sierra Nevada bighorn sheep return to Yosemite after being wiped out?', es: '¿Cómo regresaron los borregos cimarrones de Sierra Nevada a Yosemite después de haber sido extinguidos?' },
    opts: [
      { en: 'They migrated from Canada', es: 'Migraron desde Canadá' },
      { en: 'They were reintroduced by wildlife rangers', es: 'Fueron reintroducidos por guardabosques de vida silvestre' },
      { en: 'They were bred in captivity and released', es: 'Fueron criados en cautiverio y liberados' },
      { en: 'They never actually left', es: 'En realidad nunca se fueron' }
    ],
    a: 1,
    why: { en: 'They were completely extirpated from Yosemite by 1914 but were successfully reintroduced to the high country in 1986.', es: 'Fueron erradicados por completo de Yosemite para 1914, pero se reintrodujeron con éxito en las tierras altas en 1986.' },
  },
  {
    subjectId: 'bobcat',
    q: { en: 'How did the bobcat get its name?', es: '¿Cómo obtuvo su nombre en inglés el lince rojo (bobcat)?' },
    opts: [
      { en: 'Its bobbing walking motion', es: 'Por su movimiento de balanceo al caminar' },
      { en: 'Its short, "bobbed" tail', es: 'Por su cola corta y "recortada" (bobbed)' },
      { en: 'The naturalist Bob who discovered it', es: 'Por el naturalista Bob que lo descubrió' },
      { en: 'Its habit of bobbing for fish', es: 'Por su hábito de atrapar peces con la cabeza' }
    ],
    a: 1,
    why: { en: 'Bobcats are named for their short, stubby tails, which measure only four to seven inches in length.', es: 'Los linces rojos reciben su nombre en inglés por sus colas cortas y gruesas, que miden solo de cuatro a siete pulgadas de largo.' },
  },
  {
    subjectId: 'stellers-jay',
    q: { en: 'Steller’s Jays are famous for mimicking which other bird of prey?', es: '¿La chara de Steller es famosa por imitar a qué otra ave de rapiña?' },
    opts: [
      { en: 'Bald Eagle', es: 'Águila calva' },
      { en: 'Peregrine Falcon', es: 'Halcón peregrino' },
      { en: 'Red-tailed Hawk', es: 'Gavilán colirrojo' },
      { en: 'Great Horned Owl', es: 'Búho cornudo' }
    ],
    a: 2,
    why: { en: 'They frequently mimic red-tailed hawks to warn other jays or scare rival birds away from food sources.', es: 'Con frecuencia imitan a los gavilanes colirrojos para advertir a otras charas o ahuyentar a las aves rivales de las fuentes de alimento.' },
  },
  {
    subjectId: 'mule-deer',
    q: { en: 'What is the main predator of mule deer in Yosemite National Park?', es: '¿Cuál es el principal depredador del ciervo mulo en el Parque Nacional Yosemite?' },
    opts: [
      { en: 'Coyotes', es: 'Coyotes' },
      { en: 'Mountain Lions', es: 'Pumas' },
      { en: 'Black Bears', es: 'Osos negros' },
      { en: 'Golden Eagles', es: 'Águilas reales' }
    ],
    a: 1,
    why: { en: 'Mountain lions are secretive, solitary hunters that rely on mule deer as their primary source of food.', es: 'Los pumas son cazadores solitarios y sigilosos que dependen del ciervo mulo como su principal fuente de alimento.' },
  },
  {
    subjectId: 'peregrine-falcon',
    q: { en: 'What diving speed can a peregrine falcon reach when hunting?', es: '¿Qué velocidad en picada puede alcanzar un halcón peregrino al cazar?' },
    opts: [
      { en: 'Over 50 mph', es: 'Más de 50 mph' },
      { en: 'Over 100 mph', es: 'Más de 100 mph' },
      { en: 'Over 200 mph', es: 'Más de 200 mph' },
      { en: 'Over 300 mph', es: 'Más de 300 mph' }
    ],
    a: 2,
    why: { en: 'During a high-velocity hunting dive called a stoop, the peregrine falcon can exceed 200 mph, making it the fastest animal on Earth.', es: 'Durante un clavado de caza a alta velocidad, el halcón peregrino puede superar las 200 mph, lo que lo convierte en el animal más rápido de la Tierra.' },
  },
  {
    subjectId: 'black-bear',
    q: { en: 'What sleep state do Yosemite’s black bears enter during the winter?', es: '¿En qué estado de sueño entran los osos negros de Yosemite durante el invierno?' },
    opts: [
      { en: 'True deep hibernation', es: 'Hibernación profunda verdadera' },
      { en: 'A light sleep called torpor', es: 'Un sueño ligero llamado letargo' },
      { en: 'They do not sleep during winter', es: 'No duermen durante el invierno' },
      { en: 'Estivation', es: 'Estivación' }
    ],
    a: 1,
    why: { en: 'Black bears enter torpor, a lighter state of sleep where body temperature drops slightly, allowing them to wake up quickly if threatened.', es: 'Los osos negros entran en letargo, un estado de sueño más ligero donde la temperatura corporal desciende levemente, lo que les permite despertarse rápidamente si se sienten amenazados.' },
  },
  {
    subjectId: 'peregrine-falcon',
    q: { en: 'How does Yosemite protect nesting peregrine falcons in spring?', es: '¿Cómo protege Yosemite a los halcones peregrinos en anidación durante la primavera?' },
    opts: [
      { en: 'By feeding them artificial prey', es: 'Alimentándolos con presas artificiales' },
      { en: 'By closing specific climbing routes on granite cliffs', es: 'Cerrando rutas de escalada específicas en acantilados de granito' },
      { en: 'By keeping helicopters out of the park', es: 'Manteniendo los helicópteros fuera del parque' },
      { en: 'By moving nests to tree groves', es: 'Trasladando los nidos a arboledas' }
    ],
    a: 1,
    why: { en: 'The park closes specific vertical routes on walls like El Capitan to prevent climbers from disturbing nesting falcons.', es: 'El parque cierra rutas verticales específicas en paredes como El Capitán para evitar que los escaladores molesten a los halcones que están anidando.' },
  },
];

export const yosemite: Park = {
  slug: 'yosemite',
  name: { en: 'Yosemite', es: 'Yosemite' },
  region: { en: 'California', es: 'California' },
  tagline: { en: 'A sanctuary of towering granite, thundering waterfalls, and ancient giant trees.', es: 'Un santuario de granito imponente, cascadas estruendosas y árboles gigantes ancestrales.' },
  safetyNote: { en: 'Always store food in steel bear lockers; feeding wildlife is illegal. Keep a safe distance from cliff edges. Stay on trails and boardwalks near water. Facts sourced from the National Park Service, USGS, and Yosemite Climbing Association.', es: 'Guarde siempre los alimentos en casilleros de acero a prueba de osos; alimentar a la fauna silvestre es ilegal. Mantenga una distancia segura de los bordes de los acantilados. Permanezca en los senderos y pasarelas cerca del agua. Datos obtenidos del Servicio de Parques Nacionales, USGS y Yosemite Climbing Association.' },
  decks: [
    {
      id: 'places',
      label: { en: 'Places', es: 'Lugares' },
      dotColor: '#E08E45',
      subjects: places,
      quiz: placesQuiz,
    },
    {
      id: 'animals',
      label: { en: 'Animals', es: 'Animales' },
      dotColor: '#9C5B43',
      subjects: animals,
      quiz: animalsQuiz,
    },
  ],
};
