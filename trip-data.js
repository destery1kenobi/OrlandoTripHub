/* ============================================================
   Orlando Trip Hub — shared data layer
   ------------------------------------------------------------
   Single source of truth for BOTH surfaces:
     - trip-hub.html  (the phone PWA)
     - xr/index.html  (the Quest 3 spatial dashboard)

   Plain classic script, no build step. Top-level const/let land
   in the global lexical scope, so every declaration here is
   visible to any other classic script on the page.
   Load this BEFORE the page's own script.
   ============================================================ */


/* ---- the parks ---- */
const PARKS = [
  {
    id:'epic', group:'universal', theme:'theme-epic', icon:'🌌', name:'Epic Universe',
    tagline:'The new one — food and secrets are a whole event here.',
    snacks:[
      {emoji:'🍌', name:'DK Crush Float', location:'The Bubbly Barrel · SUPER NINTENDO WORLD', desc:'Banana-pineapple soft serve float with pineapple soda, caramel popcorn & toffee in a waffle bowl.', tags:['kid','pesc']},
      {emoji:'🧀', name:'Mac & Cheese Cone (PB&J)', location:'Hooligan\'s Grog & Gruel · Isle of Berk', desc:'Pork, bacon & jam pulled pork with creamy mac & cheese, cone-style. Most-talked-about bite at Epic.', tags:['must']},
      {emoji:'🥞', name:'Bièraubeurre Crêpe', location:'Café L\'air De La Sirène · Ministry of Magic', desc:'A Butterbeer crepe — cookie butter, Bavarian cream, strawberries, shortbread garnish.', tags:['must','pesc']},
      {emoji:'🌶️', name:'Burning Cheddar Bites', location:'Burning Blade Tavern · Dark Universe', desc:'Fried jalapeño-pimento cheddar bites with sriracha ranch.', tags:['classic','pesc']},
      {emoji:'🌕', name:'Pizza Lunare', location:'Pizza Moon · Celestial Park', desc:'Purple ube crust, roasted garlic béchamel, ricotta & pancetta. Locals rate this the best park pizza in Orlando.', tags:['new']},
      {emoji:'🍰', name:'Princess Peach\'s Cake', location:'Toadstool Cafe · SUPER NINTENDO WORLD', desc:'Yellow cake, berries, sprinkles, topped with a Princess Peach cookie.', tags:['kid','pesc']},
    ],
    layout:{
      intro:'Hub-and-spoke design: you enter into Celestial Park at the center, and four worlds branch off through themed portals. There\'s no direct path between worlds — everything routes back through the hub, and each portal transit takes 3–7 minutes. Walking to the farthest world takes 10–15 minutes.',
      closure:null,
      lands:[
        {name:'Celestial Park (hub)', blurb:'Entrance and crossroads. Not just a walkthrough — holds Stardust Racers, Constellation Carousel, and a big share of the park\'s best food.'},
        {name:'Super Nintendo World', blurb:'Multi-level with elevated walkways. Mario Kart & Donkey Kong\'s Mine-Cart Madness live here — expect the longest waits in the park.'},
        {name:'Wizarding World — Ministry of Magic', blurb:'Paris-themed streets, interactive wand spell spots, Battle at the Ministry.'},
        {name:'How to Train Your Dragon — Isle of Berk', blurb:'Viking village theming, Fyre Drill and Dragon Racer\'s Rally.'},
        {name:'Dark Universe', blurb:'Classic monster-movie land — Curse of the Werewolf, Monsters Unchained, Darkmoor Village.'},
      ]
    },
    bestTimes:{
      intro:'Counter-flow is the whole game here: most guests sprint to Super Nintendo World and Ministry of Magic at open, so go the opposite direction first.',
      tips:[
        {emoji:'🔄', text:'Start at Dark Universe and Isle of Berk at rope drop. Save Super Nintendo World for early afternoon once the morning rush clears.'},
        {emoji:'🏆', text:'Battle at the Ministry: ride it first if you have Early Park Admission — it stays busiest 2–8pm. Crowds here have trended lighter since spring 2026 overall, but day-to-day swings are big (some days near-empty, others slammed) — don\'t skip rope drop banking on a quiet day.'},
        {emoji:'🏎️', text:'Mario Kart: Bowser\'s Challenge sweet spot is 11am–12pm before waits climb past 100 min. A second good window opens after 9pm.'},
        {emoji:'🦍', text:'Mine-Cart Madness (Donkey Kong) is the single hottest ticket in Orlando right now — ride at rope drop or use single rider.'},
        {emoji:'⏱️', text:'Budget the 3–7 minute portal walk time between worlds when planning your day — it adds up with a family of 5.'},
        {emoji:'🎆', text:'Celestial Goodnight — the park\'s brand-new nighttime fountains-fireworks show — debuted July 7, one week before your trip. Stake out a spot near the Celestial Park fountains before close; most guests don\'t know it exists yet.'},
      ]
    },
    secrets:[
      {emoji:'🪄', name:'Hidden spell locations', location:'Ministry of Magic streets', desc:'Interactive wands trigger effects at several secret spots tucked around the Parisian streets — a scavenger hunt if you buy an interactive wand.', who:['kid9','teen13'], interactive:true},
      {emoji:'🌙', name:'Celestial Park at night', desc:'Fountain shows and lighting give the Chronos tower a completely different glow after dark. Worth a lap after fireworks-equivalent hours.', location:'Celestial Park', who:['everyone','parents']},
      {emoji:'🥚', name:'Power-Up Band mini-games + hidden golden egg', location:'Super Nintendo World ($45 wristband, required for gameplay)', desc:'Unlocks dozens of mini-games across the multi-level land and tracks digital coins/stamps. One well-known hunt: a golden egg hidden somewhere in Yoshi\'s Island. Worth it if the 9 and 13 year old are into collecting; skip if you\'d rather just ride.', who:['kid9','teen13'], interactive:true},
      {emoji:'🎻', name:'The roaming violinist', location:'Darkmoor Village, Dark Universe', desc:'A wandering violinist plays haunting melodies and shares monster legends — easy to miss if you\'re rushing to the rides.', who:['teen13','adult22','parents']},
      {emoji:'🚗', name:'Flux Capacitor easter egg', location:'Stardust Racers ride vehicles', desc:'A Back to the Future nod on the rear of the ride vehicles — good one for the parents to point out.', who:['parents','everyone']},
    ],
    coolSpots:[
      {emoji:'🎪', name:'Le Cirque Arcanus', location:'Ministry of Magic · scheduled showtimes', desc:'A ~20-minute indoor circus show — catch it during the 1–4pm heat peak instead of standing in a ride line.', type:'show'},
      {emoji:'🐉', name:'The Untrainable Dragon', location:'Isle of Berk · scheduled showtimes', desc:'Indoor, air-conditioned stage show in the Viking village — another good midday sit-down break.', type:'show'},
      {emoji:'⚔️', name:'Battle at the Ministry', location:'Ministry of Magic', desc:'Indoor dark ride, fully air-conditioned building — the park\'s consensus best ride and a genuine AC break, just budget for the wait.', type:'ride'},
      {emoji:'🐺', name:'Curse of the Werewolf', location:'Dark Universe', desc:'Indoor dark ride through Darkmoor Village — enclosed and air-conditioned start to finish.', type:'ride'},
      {emoji:'🧟', name:'Monsters Unchained: The Frankenstein Experiment', location:'Dark Universe', desc:'Indoor dark ride, fully enclosed and air-conditioned — one of the park\'s top-rated attractions.', type:'ride'},
      {emoji:'🏎️', name:'Mario Kart: Bowser\'s Challenge', location:'Super Nintendo World', desc:'Indoor ride blending physical sets with VR headsets — enclosed and air-conditioned, though it\'s also the hottest-ticket queue in the park.', type:'ride'},
      {emoji:'🍽️', name:'Any table-service restaurant', location:'Across all 4 worlds', desc:'All indoor dining at Epic Universe is air-conditioned — book a sit-down lunch to fully reset instead of grabbing a quick snack.', type:'dining'},
      {emoji:'⛲', name:'Celestial Park fountains', location:'Central hub, in front of Universal Helios Grand Hotel', desc:'Not AC, but shaded seating near the fountains is the best outdoor cool-down if indoor spots are packed — this area now anchors the new "Celestial Goodnight" nighttime fireworks show too.', type:'shade'},
    ]
  },
  {
    id:'ioa', group:'universal', theme:'theme-ioa', icon:'🌋', name:'Islands of Adventure',
    tagline:'The classics you already love.',
    snacks:[
      {emoji:'🍺', name:'Butterbeer', location:'Hogsmeade', desc:'Cold, frozen, or hot — the original theme park obsession. Dairy-free version now available too.', tags:['must','pesc']},
      {emoji:'🍗', name:'Giant Turkey Leg', location:'Near Three Broomsticks, Hogsmeade', desc:'Smoky, oversized, and a genuine Orlando theme-park rite of passage.', tags:['classic']},
      {emoji:'🥚', name:'Green Eggs and Ham', location:'Circus McGurkus Café · Seuss Landing', desc:'Literally green eggs and ham. Novelty win for the kids, guaranteed photo.', tags:['kid']},
      {emoji:'🍽️', name:'Mythos Restaurant', location:'Lost Continent', desc:'Repeat "Best Theme Park Restaurant" winner. Sit-down, mixed menu — has non-meat options if you ask.', tags:['classic']},
    ],
    layout:{
      intro:'Eight themed islands ringed around a central lagoon — one big loop, no shortcuts across the middle. Walking the full loop without stopping takes 15–20 minutes.',
      closure:'Two to know: Poseidon\'s Fury has closed permanently in Lost Continent (now mostly a walkthrough plus Mythos Restaurant), and Jurassic Park River Adventure is closed for a major refurbishment until November 20, 2026 — no water ride in Jurassic Park this trip, so plan Popeye\'s Bilge-Rat Barges in Toon Lagoon for your get-soaked fix.',
      lands:[
        {name:'Port of Entry', blurb:'Main entrance, shops and services.'},
        {name:'Marvel Super Hero Island', blurb:'Right off Port of Entry — Hulk Coaster, Spider-Man, Doctor Doom\'s Fearfall.'},
        {name:'Toon Lagoon', blurb:'Water rides — Popeye & Bluto\'s Bilge-Rat Barges, Ripsaw Falls.'},
        {name:'Skull Island', blurb:'Reign of Kong dark ride.'},
        {name:'Jurassic Park', blurb:'VelociCoaster and the Discovery Center — River Adventure is closed for refurb until Nov 20, 2026.'},
        {name:'Wizarding World — Hogsmeade', blurb:'Forbidden Journey, Hagrid\'s, Hogwarts Express to Diagon Alley (park-to-park ticket required).'},
        {name:'The Lost Continent', blurb:'Slimmed down since Poseidon\'s Fury closed — now mostly Mythos Restaurant.'},
        {name:'Seuss Landing', blurb:'Completes the loop back to entrance — gentle rides for younger kids.'},
      ]
    },
    bestTimes:{
      intro:'Most guests beeline straight to Hogsmeade at open — go the opposite way around the loop to dodge them.',
      tips:[
        {emoji:'🔄', text:'Walk counterclockwise: Marvel → Toon Lagoon → Skull Island → Jurassic Park → Hogsmeade, arriving at the busiest land last instead of first.'},
        {emoji:'🦖', text:'VelociCoaster and Hagrid\'s/Forbidden Journey are the highest-demand rides — hit them early or use single rider where offered.'},
        {emoji:'🚂', text:'If you have park-to-park tickets, the Hogwarts Express is a fun way to reset the day by riding over to Diagon Alley at USF.'},
      ]
    },
    secrets:[
      {emoji:'🦉', name:'Send real mail from the Owlery', location:'Hogsmeade', desc:'You can actually send postcards through Owl Post — they arrive with a special Hogsmeade postmark. Great souvenir for grandparents.', who:['kid9','everyone']},
      {emoji:'🍽️', name:'Confisco Grille', location:'Port of Entry', desc:'Eclectic global menu (Asian, Turkish, Mediterranean, Greek) that most guests walk past — a nice change of pace from theme park food.', who:['parents','adult22']},
      {emoji:'🪄', name:'Interactive wand spell spots', location:'Hogsmeade', desc:'Marked locations throughout the village trigger spell effects with an interactive wand — a built-in scavenger hunt.', who:['kid9','teen13'], interactive:true},
    ],
    coolSpots:[
      {emoji:'🦖', name:'Jurassic Park Discovery Center', location:'Jurassic Park', desc:'Free, indoor, air-conditioned, and interactive — dino eggs, DNA scanners. Usually walk-in with no wait, and genuinely fun for the 9-year-old.', type:'show'},
      {emoji:'🏰', name:'Harry Potter and the Forbidden Journey', location:'Hogsmeade', desc:'The whole experience — queue through Hogwarts\' indoor corridors plus the ride itself — is enclosed and air-conditioned start to finish.', type:'ride'},
      {emoji:'🦍', name:'Skull Island: Reign of Kong', location:'Skull Island', desc:'Indoor trackless dark ride through a jungle temple — fully enclosed, air-conditioned, and has a single-rider line to cut the wait.', type:'ride'},
      {emoji:'🕷️', name:'The Amazing Adventures of Spider-Man', location:'Marvel Super Hero Island', desc:'Indoor 3D dark ride, fully air-conditioned — a classic that holds up.', type:'ride'},
      {emoji:'🍽️', name:'Mythos Restaurant / Confisco Grille', location:'Lost Continent / Port of Entry', desc:'Both are full air-conditioned sit-down dining — a real reset over a quick-service stop.', type:'dining'},
      {emoji:'💦', name:'If I Ran the Zoo play area', location:'Seuss Landing', desc:'Not AC, but shaded tunnels and a splash pad give the 9-year-old somewhere to burn energy while staying cool.', type:'shade'},
    ]
  },
  {
    id:'usf', group:'universal', theme:'theme-usf', icon:'🎬', name:'Universal Studios FL',
    tagline:'Diagon Alley + Hollywood classics.',
    snacks:[
      {emoji:'🍺', name:'Butterbeer', location:'Diagon Alley', desc:'Same magic, other side of the Wizarding World — grab the frozen version if it\'s hot out.', tags:['must','pesc']},
      {emoji:'🐟', name:'Fish & Chips', location:'Leaky Cauldron · Diagon Alley', desc:'Genuine British pub food — the best sit-down option in the Wizarding World.', tags:['classic','pesc']},
      {emoji:'🍩', name:'Voodoo Doll Doughnut', location:'Voodoo Doughnut · near CityWalk/USF entrance', desc:'Raspberry jelly, chocolate frosting, pretzel stake. The Portland legend, Orlando outpost.', tags:['must','pesc']},
      {emoji:'🍦', name:'Butterbeer Ice Cream', location:'Florean Fortescue\'s · Diagon Alley', desc:'Butterbeer, but frozen and scoopable. Great heat-of-the-day option.', tags:['kid','pesc']},
      {emoji:'🍔', name:'Krusty Burger + Duff Beer', location:'Springfield, U.S.A.', desc:'Full Simpsons bit — burger, Duff for the grown-ups, Buzz Cola for the kids.', tags:['adult']},
    ],
    layout:{
      intro:'A working-studio-style layout organized in loosely connected zones rather than a strict loop. Diagon Alley sits at one end and connects via the Hogwarts Express to Islands of Adventure (park-to-park ticket required).',
      closure:null,
      lands:[
        {name:'Production Central', blurb:'Near the main entrance — Transformers: The Ride-3D.'},
        {name:'New York', blurb:'Race Through New York, Revenge of the Mummy.'},
        {name:'San Francisco', blurb:'Fast & Furious – Supercharged.'},
        {name:'Wizarding World — Diagon Alley', blurb:'Escape from Gringotts, Ollivanders, Hogwarts Express station.'},
        {name:'World Expo', blurb:'MEN IN BLACK Alien Attack, The Simpsons Ride.'},
        {name:'Illumination\'s Minion Land', blurb:'Despicable Me Minion Mayhem, Villain-Con Minion Blast.'},
        {name:'DreamWorks Land', blurb:'Trolls Trollercoaster.'},
        {name:'Hollywood', blurb:'E.T. Adventure.'},
      ]
    },
    bestTimes:{
      intro:'Diagon Alley is the draw — visit early before park-hoppers arrive from Islands of Adventure via the Hogwarts Express.',
      tips:[
        {emoji:'🏰', text:'Ride Escape from Gringotts and explore Diagon Alley in the first hour or two, before IOA guests hop over.'},
        {emoji:'🚂', text:'Use the Hogwarts Express as a scenic "commute" between USF and IOA instead of walking — it doubles as a mini-attraction.'},
      ]
    },
    secrets:[
      {emoji:'🍸', name:'600 Block Speakeasy', location:'Inside Pat O\'Brien\'s, CityWalk', desc:'A hidden Prohibition-era bar — get a membership card from Pat O\'Brien\'s with a clue to the secret password, follow green signs to a disguised door, knock and give the password. Live jazz Thu–Sat. Adults-only, running through August 23, 2026 — covers your whole trip.', who:['adult22','parents']},
      {emoji:'🪄', name:'Interactive wand spell spots', location:'Diagon Alley', desc:'Same idea as Hogsmeade — marked spots around the alley trigger spell effects with an interactive wand.', who:['kid9','teen13'], interactive:true},
    ],
    coolSpots:[
      {emoji:'🚂', name:'King\'s Cross Station', location:'Diagon Alley entrance', desc:'Fully indoor and heavily air-conditioned, with a food and drink stand partway through — linger here even if you\'re not riding the Hogwarts Express.', type:'ride'},
      {emoji:'🪄', name:'Ollivanders', location:'Diagon Alley', desc:'Small indoor wand-choosing show — air-conditioned with a shaded queue.', type:'show'},
      {emoji:'🏦', name:'Harry Potter and the Escape from Gringotts', location:'Diagon Alley', desc:'Indoor dark ride/coaster hybrid, fully enclosed and air-conditioned.', type:'ride'},
      {emoji:'🎬', name:'MIB Alien Attack / Revenge of the Mummy', location:'World Expo / New York', desc:'Both rides have fully indoor, air-conditioned queues and ride buildings.', type:'ride'},
      {emoji:'🗽', name:'Race Through New York Starring Jimmy Fallon', location:'New York', desc:'Indoor simulator ride, fully air-conditioned and usually a shorter wait than the headliners.', type:'ride'},
      {emoji:'🏎️', name:'Fast & Furious – Supercharged', location:'San Francisco', desc:'Indoor simulator ride, fully enclosed and air-conditioned.', type:'ride'},
      {emoji:'🤖', name:'Transformers: The Ride-3D', location:'Production Central', desc:'Indoor simulator ride, fully air-conditioned.', type:'ride'},
      {emoji:'🍌', name:'Despicable Me Minion Mayhem', location:'Illumination\'s Minion Land', desc:'Indoor simulator ride, fully air-conditioned — gentle enough for the whole family.', type:'ride'},
      {emoji:'👽', name:'E.T. Adventure', location:'Hollywood', desc:'Classic indoor dark ride, fully enclosed and air-conditioned — an easy-to-miss quiet option.', type:'ride'},
      {emoji:'🍩', name:'The Simpsons Ride', location:'World Expo', desc:'Indoor simulator ride, fully air-conditioned.', type:'ride'},
      {emoji:'🍽️', name:'Leaky Cauldron', location:'Diagon Alley', desc:'Air-conditioned British pub dining — a good excuse for a longer sit-down break.', type:'dining'},
    ],
    coolClosedNote:'The Universal Horror Make-Up Show closed May 12, 2026 for a full reimagining and isn\'t expected back until winter 2026 at the earliest (possibly not until 2027) — it will NOT be running during your trip.'
  },
  {
    id:'mk', group:'disney', theme:'theme-mk', icon:'🏰', name:'Magic Kingdom',
    tagline:'The classics, plus new Cool Kid Summer treats.',
    snacks:[
      {emoji:'🥟', name:'Cheeseburger Spring Rolls', location:'Adventureland Spring Roll Cart', desc:'Crispy shell, beef, cheese, pickle tang inside. Sells out fast.', tags:['must']},
      {emoji:'🚀', name:'Space Ranger Float', location:'Auntie Gravity\'s Galactic Goodies · Tomorrowland', desc:'Dole Whip Lime + vanilla swirl, Sprite, green apple pearls. New for Cool Kid Summer, running through your dates.', tags:['new','pesc']},
      {emoji:'🥓', name:'Bacon on a Stick', location:'Westward Ho · Frontierland', desc:'Thick-cut, brown-sugar coated. A genuine cult favorite.', tags:['classic']},
      {emoji:'🍍', name:'Dole Whip', location:'Aloha Isle · Adventureland', desc:'The original. Non-negotiable, still the gold standard.', tags:['must','pesc']},
      {emoji:'🎂', name:'Mickey Premium Ice Cream Bar', location:'Carts throughout the park', desc:'Easiest win in the whole resort — always nearby when someone melts down from heat.', tags:['kid','pesc']},
      {emoji:'🌪️', name:'Sleepy Hollow Funnel Cake', location:'Sleepy Hollow Refreshments · Liberty Square', desc:'Fresh-fried and worth every step to Liberty Square — classic powdered sugar or loaded up. Grab the patio tables for a straight-on castle view while you eat.', tags:['must','classic','pesc']},
    ],
    layout:{
      intro:'Classic hub-and-spoke: six lands radiate out from the central hub in front of Cinderella Castle. About 107 acres total.',
      closure:'Frontierland is under active construction — Rivers of America and Tom Sawyer Island have permanently closed to make way for Piston Peak, a new Cars-themed land. Expect walkway changes in that corner. Also: Mickey\'s Magical Friendship Faire (the castle stage show) is down for maintenance through July 14 — if MK is your day one, it may not be running; it should be back from July 15 on.',
      lands:[
        {name:'Main Street, U.S.A.', blurb:'Entrance corridor leading to the central hub.'},
        {name:'Adventureland', blurb:'Pirates of the Caribbean, Jungle Cruise, Dole Whip.'},
        {name:'Frontierland', blurb:'Big Thunder Mountain, Tiana\'s Bayou Adventure — under construction for Piston Peak (Cars land).'},
        {name:'Liberty Square', blurb:'Haunted Mansion, Hall of Presidents.'},
        {name:'Fantasyland', blurb:'Seven Dwarfs Mine Train, Peter Pan\'s Flight, "it\'s a small world".'},
        {name:'Tomorrowland', blurb:'TRON Lightcycle Run, Space Mountain, Buzz Lightyear.'},
      ]
    },
    bestTimes:{
      intro:'Arrive 45–60 minutes before official opening. Two rides define your morning.',
      tips:[
        {emoji:'⚡', text:'TRON Lightcycle Run is priority #1 — it can hit 60–90 min waits by 9am despite an 8-min wait at rope drop. Ride it first.'},
        {emoji:'⛏️', text:'Seven Dwarfs Mine Train is priority #2 — high capacity but fills fast since families with young kids head there first too.'},
        {emoji:'☀️', text:'The mid-morning lull (about 1 hour after opening, lasting ~2 hours) is your second sweet spot for major attractions.'},
      ]
    },
    secrets:[
      {emoji:'🌹', name:'Enchanted Tales with Belle', location:'Fantasyland', desc:'An intimate, interactive story experience where guests become part of the "Beauty and the Beast" retelling inside Belle\'s cottage — often overlooked in favor of the coasters.', who:['kid9','everyone']},
      {emoji:'🗺️', name:'A Pirate\'s Adventure: Treasures of the Seven Seas', location:'Cartography Shop near Golden Oak Outpost, Adventureland', desc:'Free treasure-hunt game — tap a MagicBand to get assigned one of 5 missions (~20 min each, pausable, no time limit). Only runs 12pm–6pm daily, so don\'t plan for it at rope drop.', who:['kid9','teen13','everyone'], interactive:true},
      {emoji:'🚻', name:'Quiet restrooms', location:'Between Enchanted Tales with Belle and Pinocchio Village Haus', desc:'Tucked off the main path and rarely busy — good regroup spot when the 9-year-old needs a reset.', who:['parents']},
      {emoji:'🚌', name:'Double-decker Omnibus ride', location:'Main Street Vehicles · Town Square, Main Street U.S.A.', desc:'The vintage double-decker bus (plus jitney, fire engine and horse trolley) is a real ride you can board free — Town Square to the castle hub. Mornings only, usually done by late morning, and most guests never realize you can hop on. Ride it up top on your way in at rope drop.', who:['everyone','kid9']},
    ],
    coolSpots:[
      {emoji:'🎤', name:'Hall of Presidents', location:'Liberty Square', desc:'23-minute seated, air-conditioned show — one of the longest AC breaks in the park.', type:'show'},
      {emoji:'🐻', name:'Country Bear Musical Jamboree', location:'Frontierland', desc:'A shorter, high-energy AC show with a new set list — good if the little one can\'t sit still for 20+ minutes.', type:'show'},
      {emoji:'🌍', name:'"it\'s a small world"', location:'Fantasyland', desc:'A slow, air-conditioned boat ride — the easiest way to cool down without waiting in a long line.', type:'ride'},
      {emoji:'🎪', name:'Pete\'s Silly Sideshow', location:'Storybook Circus, Fantasyland', desc:'Indoor, air-conditioned character meet-and-greet tent with Minnie, Daisy, Donald and Goofy — reopened summer 2026 after refurbishment.', type:'show'},
      {emoji:'🦜', name:'Walt Disney\'s Enchanted Tiki Room', location:'Sunshine Pavilion, Adventureland', desc:'15-minute indoor animatronic bird show with strong AC — a classic, often-skipped attraction that\'s an easy sit-down reset. Exterior roof work is underway but the show stays open throughout.', type:'show'},
      {emoji:'🏴‍☠️', name:'Pirates of the Caribbean', location:'Adventureland', desc:'Indoor boat ride, fully air-conditioned and dark — a slow, easy reset.', type:'ride'},
      {emoji:'👻', name:'Haunted Mansion', location:'Liberty Square', desc:'Indoor "Omnimover" dark ride, fully enclosed and air-conditioned.', type:'ride'},
      {emoji:'🧚', name:'Peter Pan\'s Flight', location:'Fantasyland', desc:'Indoor dark ride, fully air-conditioned — short but a genuine break from the sun.', type:'ride'},
      {emoji:'🧜', name:'Under the Sea: Journey of the Little Mermaid', location:'Fantasyland', desc:'Indoor dark ride, fully air-conditioned and gentle enough for every age.', type:'ride'},
      {emoji:'🎻', name:'Mickey\'s PhilharMagic', location:'Fantasyland', desc:'Indoor 3D theater show, fully air-conditioned — gives everyone a real seat and a break off their feet.', type:'show'},
      {emoji:'🌹', name:'Enchanted Tales with Belle', location:'Fantasyland', desc:'Indoor interactive storytelling experience inside Belle\'s cottage, fully air-conditioned — also listed under Secrets since it\'s easy to miss.', type:'show'},
      {emoji:'😂', name:'Monsters, Inc. Laugh Floor', location:'Tomorrowland', desc:'Indoor interactive comedy show, fully air-conditioned — audience texts in jokes, seated the whole time.', type:'show'},
      {emoji:'🚀', name:'Buzz Lightyear\'s Space Ranger Spin', location:'Tomorrowland', desc:'Indoor dark ride, fully air-conditioned.', type:'ride'},
      {emoji:'🌌', name:'Space Mountain', location:'Tomorrowland', desc:'Indoor coaster in the dark, fully enclosed — AC quality varies but it\'s out of direct sun.', type:'ride'},
    ],
    coolClosedNote:'Carousel of Progress is closed for a full refurbishment that began July 6, 2026 and won\'t reopen until 2027 — it will NOT be running during your trip, so it\'s left off this list.'
  },
  {
    id:'epcot', group:'disney', theme:'theme-epcot', icon:'🌐', name:'EPCOT',
    tagline:'No festival in July — World Showcase staples instead.',
    snacks:[
      {emoji:'🍞', name:'School Bread', location:'Kringla Bakeri Og Kafe · Norway Pavilion', desc:'Cardamom bun, vanilla custard, coconut. A World Showcase institution.', tags:['classic','pesc']},
      {emoji:'🥨', name:'Pretzel Nuggets with Beer Cheese', location:'Block & Hans · American Adventure', desc:'Garlic-butter pretzel bites, smoky beer cheese sauce.', tags:['must','pesc']},
      {emoji:'🧀', name:'Chicken Goof-Ups', location:'Grab-n-Goof · new Cool Kid Summer stand', desc:'Breaded chicken bites, fried cheese curds, Goofy sauce.', tags:['new']},
      {emoji:'🥞', name:'Giant Crepe', location:'Crêpes À Emporter · France Pavilion', desc:'Cheese, mushroom, ham, arugula, stuffed full.', tags:['classic']},
      {emoji:'🎣', name:'Goofy\'s Gone Fishing', location:'Grab-n-Goof · new Cool Kid Summer stand', desc:'Blue raspberry lemonade, fruit pearls, fish or shark gummy candy. Kid magnet.', tags:['kid','pesc']},
    ],
    layout:{
      intro:'Split into four neighborhoods. The front half (World Celebration, World Discovery, World Nature) is ride-focused; the back half (World Showcase) wraps 11 country pavilions around a lagoon. World Showcase doesn\'t open until 11am — two hours after the rest of the park.',
      closure:null,
      lands:[
        {name:'World Celebration', blurb:'Central hub at the entrance — Spaceship Earth.'},
        {name:'World Discovery', blurb:'Guardians of the Galaxy: Cosmic Rewind, Test Track, Mission: SPACE.'},
        {name:'World Nature', blurb:'Journey of Water, Living with the Land, The Seas with Nemo & Friends.'},
        {name:'World Showcase', blurb:'11 countries around the lagoon — Mexico, Norway, China, Germany, Italy, USA, Japan, Morocco, France, UK, Canada.'},
      ]
    },
    bestTimes:{
      intro:'No festival during your visit means smaller crowds than a fall or spring trip — but the schedule quirk still matters.',
      tips:[
        {emoji:'🌅', text:'Ride Cosmic Rewind and Test Track first thing — World Showcase isn\'t open yet anyway, so front-load the thrill rides.'},
        {emoji:'🌍', text:'Head to World Showcase right at 11am open — the first 30–60 minutes there are noticeably quieter.'},
      ]
    },
    secrets:[
      {emoji:'🦆', name:'DuckTales World Showcase Adventure', location:'Free via Play Disney Parks app, across World Showcase', desc:'Join Scrooge McDuck hunting 7 Lost Magic Treasures hidden in the Mexico, Norway, China, Germany, Japan, France & UK pavilions. Free, self-paced, and genuinely the best way to make World Showcase interesting for a 9 and 13 year old.', who:['kid9','teen13','everyone'], interactive:true},
      {emoji:'🌸', name:'Japanese Secret Garden', location:'Japan Pavilion', desc:'Koi pond, waterfalls, manicured plants, with quick-service ramen or sushi you can eat right there in the garden seating.', who:['parents','adult22','everyone']},
      {emoji:'🌹', name:'The Rose Garden', location:'United Kingdom Pavilion', desc:'A quiet photo and rest spot most guests walk straight past on their way to the next pavilion.', who:['parents','adult22']},
      {emoji:'🥐', name:'Les Halles Boulangerie-Patisserie', location:'Back of the France Pavilion', desc:'Get there early for coffee and pastries with actual seating — a nice quiet start before the crowds build.', who:['parents','everyone']},
    ],
    coolSpots:[
      {emoji:'🕺', name:'GoofyCore', location:'CommuniCore Hall, World Celebration', desc:'New for 2026 — a free, indoor, air-conditioned dance-and-play space with Goofy-themed games. Genuinely built for kids to burn energy indoors.', type:'show'},
      {emoji:'🌍', name:'Spaceship Earth', location:'World Celebration', desc:'A slow-moving, fully air-conditioned dark ride — an easy, low-stimulation cooldown.', type:'ride'},
      {emoji:'🪂', name:'Soarin\' Across America', location:'World Nature', desc:'Indoor hang-gliding simulator, fully air-conditioned — the new 2026 version of Soarin\'.', type:'ride'},
      {emoji:'🚀', name:'Mission: SPACE', location:'World Discovery', desc:'Indoor simulator ride, fully air-conditioned — the Green (mild) side is calmer than the Orange (intense) side.', type:'ride'},
      {emoji:'🏁', name:'Test Track', location:'World Discovery', desc:'Indoor design studio and queue with most of the ride enclosed and air-conditioned — only the final loop briefly goes outdoors.', type:'ride'},
      {emoji:'🐠', name:'The Seas with Nemo & Friends', location:'World Nature', desc:'Slow indoor "clammobile" ride, fully air-conditioned, ending at a real aquarium — good for a very low-key reset.', type:'ride'},
      {emoji:'🎨', name:'Journey Into Imagination with Figment', location:'World Celebration', desc:'Indoor dark ride, fully air-conditioned and gentle.', type:'ride'},
      {emoji:'🌎', name:'Awesome Planet', location:'The Land Pavilion, World Nature', desc:'10-minute indoor film on a big screen, fully air-conditioned — easy seated break.', type:'show'},
      {emoji:'🐢', name:'Turtle Talk with Crush', location:'The Seas Pavilion, World Nature', desc:'Interactive indoor AC show where Crush "talks" live to kids in the audience — a hit with the 9-year-old.', type:'show'},
      {emoji:'🎭', name:'The American Adventure', location:'American Adventure Pavilion, World Showcase', desc:'A ~30-minute indoor, air-conditioned show — the longest sit-down break in World Showcase.', type:'show'},
      {emoji:'💃', name:'Gran Fiesta Tour', location:'Mexico Pavilion, World Showcase', desc:'Indoor boat ride inside the Mexico pyramid, fully air-conditioned and usually walk-on.', type:'ride'},
      {emoji:'❄️', name:'Frozen Ever After', location:'Norway Pavilion, World Showcase', desc:'Indoor boat ride, fully air-conditioned — expect a real wait, but it\'s a genuine cooldown once inside.', type:'ride'},
      {emoji:'🐭', name:'Remy\'s Ratatouille Adventure', location:'France Pavilion, World Showcase', desc:'Indoor trackless dark ride, fully air-conditioned.', type:'ride'},
      {emoji:'🎬', name:'Reflections of China', location:'China Pavilion, World Showcase', desc:'Indoor 360-degree film, fully air-conditioned — standing room but genuinely cool and quiet.', type:'show'},
      {emoji:'🎥', name:'Impressions de France', location:'France Pavilion, World Showcase', desc:'Indoor film in a traditional seated theater, fully air-conditioned.', type:'show'},
      {emoji:'🍁', name:'Canada Far and Wide (O Canada!)', location:'Canada Pavilion, World Showcase', desc:'Indoor 360-degree standing film, fully air-conditioned.', type:'show'},
    ],
    coolClosedNote:'Living with the Land (The Land Pavilion) was unexpectedly and permanently closed in early February 2026 and is being demolished — it will NOT be running during your trip, even though older guides still list it.'
  },
  {
    id:'hs', group:'disney', theme:'theme-hs', icon:'🎬', name:'Hollywood Studios',
    tagline:'Toy Story Land + new summer sipper.',
    snacks:[
      {emoji:'🌮', name:'Totchos', location:'Woody\'s Lunch Box · Toy Story Land', desc:'Tater tots loaded with chili, cheese, sour cream. Messy, nostalgic, perfect.', tags:['must']},
      {emoji:'🍪', name:'Jack-Jack Cookie Num Nums', location:'Woody\'s Lunch Box · Toy Story Land', desc:'Chocolate chip cookie sandwich, an Incredibles-era classic.', tags:['classic','pesc']},
      {emoji:'🥕', name:'Carrot Cake Cookie', location:'Trolley Car Café', desc:'Two spiced carrot cake cookies, cream cheese frosting center.', tags:['classic','pesc']},
      {emoji:'🐿️', name:'Chip \'n\' Dale Animade', location:'Snack cart near Walt Disney Studios Lot', desc:'Lemonade, pineapple juice, watermelon syrup in a keepsake sipper. Limit 2 per order — new for summer.', tags:['new','pesc']},
    ],
    layout:{
      intro:'Enter via Hollywood Boulevard toward the Chinese Theatre. Echo Lake and Commissary Lane branch left, Sunset Boulevard branches right (dead-ends — you walk back the way you came), and Toy Story Land / Galaxy\'s Edge sit at the back.',
      closure:'The former Muppets Courtyard/Grand Avenue area is closed for construction of Monsters, Inc. Land (Monstropolis), which will include Disney\'s first vertical lift suspended coaster.',
      lands:[
        {name:'Hollywood Boulevard', blurb:'Main entrance street — Mickey & Minnie\'s Runaway Railway inside the Chinese Theatre.'},
        {name:'Sunset Boulevard', blurb:'Tower of Terror, Rock \'n\' Roller Coaster, Fantasmic — no through-exit.'},
        {name:'Echo Lake', blurb:'Indiana Jones Epic Stunt Spectacular, Frozen Sing-Along.'},
        {name:'Toy Story Land', blurb:'Slinky Dog Dash, Alien Swirling Saucers.'},
        {name:'Star Wars: Galaxy\'s Edge', blurb:'Rise of the Resistance, Millennium Falcon: Smugglers Run.'},
        {name:'Monstropolis (under construction)', blurb:'New Monsters, Inc. land replacing the old Muppets Courtyard/Grand Avenue.'},
      ]
    },
    bestTimes:{
      intro:'Rise of the Resistance and Slinky Dog Dash are the two headliners to prioritize.',
      tips:[
        {emoji:'🌟', text:'Ride Rise of the Resistance at rope drop — it\'s the single longest line in the park most days.'},
        {emoji:'🐕', text:'Slinky Dog Dash next — also fills fast once Toy Story Land opens for the day.'},
        {emoji:'🚶', text:'Use the path near Alien Swirling Saucers as your shortcut between Toy Story Land and Galaxy\'s Edge (4–6 min) instead of looping through the park center.'},
      ]
    },
    secrets:[
      {emoji:'📱', name:'Star Wars Datapad', location:'Galaxy\'s Edge, via Play Disney Parks app', desc:'Turns your phone into an in-world Datapad — hack droids, scan crates, translate Aurebesh, and run a bounty-hunting scavenger hunt with MagicBand+. Choices carry over if you visit again later in the week. Great for the 13 and 22 year old especially.', who:['teen13','adult22','everyone'], interactive:true},
      {emoji:'🚪', name:'The Alien Swirling Saucers shortcut', location:'Between Toy Story Land & Galaxy\'s Edge', desc:'A fast connector path most guests don\'t know about — saves real time crossing the park with tired kids.', who:['parents','everyone']},
    ],
    coolSpots:[
      {emoji:'❄️', name:'Frozen Sing-Along Celebration', location:'Echo Lake', desc:'A ~25-minute seated, air-conditioned sing-along — one of the best full breaks in the park.', type:'show'},
      {emoji:'🎥', name:'Walt Disney Presents', location:'Mickey Avenue, Walt Disney Studios Lot', desc:'A quiet, indoor, air-conditioned walk-through museum of Disney history — relocated here when this new land opened May 26, 2026. Easy to linger, rarely crowded.', type:'show'},
      {emoji:'🐭', name:'Mickey & Minnie\'s Runaway Railway', location:'Hollywood Boulevard, inside the Chinese Theatre', desc:'Fully indoor, air-conditioned dark ride — a fun break that doubles as an attraction.', type:'ride'},
      {emoji:'🧸', name:'Toy Story Mania!', location:'Toy Story Land', desc:'Indoor, air-conditioned 4D shooting-gallery ride — gentle enough for a real break and a genuine crowd favorite.', type:'ride'},
      {emoji:'✨', name:'Rise of the Resistance', location:'Star Wars: Galaxy\'s Edge', desc:'Mostly indoor trackless dark ride and simulator, fully air-conditioned — the longest line in the park, but a real cooldown once you\'re in the queue building.', type:'ride'},
      {emoji:'🚀', name:'Millennium Falcon: Smugglers Run', location:'Star Wars: Galaxy\'s Edge', desc:'Indoor simulator ride, fully air-conditioned.', type:'ride'},
      {emoji:'🏨', name:'Tower of Terror', location:'Sunset Boulevard', desc:'Indoor drop ride through the Hollywood Tower Hotel, fully air-conditioned — plenty of AC in the queue too.', type:'ride'},
      {emoji:'🎸', name:'Rock \'n\' Roller Coaster Starring the Muppets', location:'Sunset Boulevard', desc:'Indoor launch coaster in the dark, fully enclosed — reopened under this name May 26, 2026.', type:'ride'},
      {emoji:'😈', name:'Disney Villains: Unfairly Ever After', location:'Sunset Showcase theater, Sunset Boulevard', desc:'Indoor stage show, fully air-conditioned, seated the whole time.', type:'show'},
      {emoji:'🧜', name:'The Little Mermaid – A Musical Adventure', location:'Walt Disney Studios Lot', desc:'Indoor stage show, fully air-conditioned — stays open even while nearby construction continues.', type:'show'},
    ],
    coolClosedNote:'Star Wars Launch Bay permanently closed in 2025. Its replacement, The Magic of Disney Animation, is targeted for late summer 2026 but has no confirmed opening date yet — don\'t plan around it being open during your trip.'
  },
  {
    id:'ak', group:'disney', theme:'theme-ak', icon:'🌳', name:'Animal Kingdom',
    tagline:'Jungle heat calls for churros and frozen treats.',
    snacks:[
      {emoji:'🥨', name:'Churros with Dual Dipping Sauces', location:'Nomad Lounge', desc:'Vanilla crema plus a rotating seasonal mystery sauce.', tags:['must','pesc']},
      {emoji:'🫓', name:'Cheese-Stuffed Arepas', location:'Smiling Crocodile', desc:'The arepa itself is cheese-stuffed (pescatarian-friendly); pulled pork or chicken are separate add-on options. Only served 11am–3pm.', tags:['classic','pesc']},
      {emoji:'🍹', name:'Bluey\'s Berry Lemonade', location:'Eight Spoon Cafe & Pizzafari', desc:'Frozen lemonade with blueberry, blackberry, raspberry. New for summer.', tags:['new','pesc']},
      {emoji:'🍨', name:'Wackadoo Fruit Freeze', location:'Pizzafari', desc:'Frozen fruit punch twist on Bluey\'s Fruit Salad, garnished with fruit.', tags:['kid','pesc']},
      {emoji:'🍍', name:'Tamu Tamu Pineapple Soft-Serve', location:'Tamu Tamu Refreshments · Africa', desc:'Old-school Animal Kingdom favorite, easy to miss if you don\'t know to look.', tags:['classic','pesc']},
    ],
    layout:{
      intro:'The Oasis (winding garden paths, not a straight boulevard) leads into Discovery Island at the center, with lands branching off it.',
      closure:'DinoLand U.S.A. closed permanently on February 1, 2026, taking DINOSAUR, The Boneyard, and Restaurantosaurus with it. That corner of the map is now future-home space for Tropical Americas (Indiana Jones & Encanto attractions), targeted for 2027 — not open during your visit.',
      lands:[
        {name:'The Oasis', blurb:'First area past the gates — tropical garden paths with animal habitats tucked along the way.'},
        {name:'Discovery Island', blurb:'Central hub — Tree of Life.'},
        {name:'Pandora — The World of Avatar', blurb:'Avatar Flight of Passage (park\'s longest standby), Na\'vi River Journey.'},
        {name:'Africa', blurb:'Harambe village, Kilimanjaro Safaris, Festival of the Lion King.'},
        {name:'Asia', blurb:'Expedition Everest, Kali River Rapids.'},
        {name:'Rafiki\'s Planet Watch', blurb:'Reached via Wildlife Express Train from Africa — now home to Bluey\'s Wild World.'},
      ]
    },
    bestTimes:{
      intro:'This park runs on animal activity and heat, not just crowd flow — timing matters more here than anywhere else.',
      tips:[
        {emoji:'🦁', text:'Ride Kilimanjaro Safaris first thing in the morning — animals are most active in the cool early hours.'},
        {emoji:'🌏', text:'Avatar Flight of Passage in Pandora is the park\'s longest standby — rope drop priority if you\'re not using Lightning Lane.'},
      ]
    },
    secrets:[
      {emoji:'🎖️', name:'Wilderness Explorers', location:'HQ at Discovery Island, past the bridge near Tree of Life', desc:'Free self-paced badge scavenger hunt — over 20 badges across Discovery Island, Pandora, Africa, Rafiki\'s Planet Watch and Asia. Genuinely fun for a 9-year-old to "collect," light enough the 13 and 22 year old won\'t roll their eyes.', who:['kid9','everyone'], interactive:true},
      {emoji:'🐅', name:'Maharajah Jungle Trek', location:'Behind Kali River Rapids, Asia', desc:'Tigers, deer, komodo dragons, water buffalo, and 50+ bird species — usually much quieter than the headline rides nearby.', who:['everyone','kid9']},
      {emoji:'🐶', name:'Bluey\'s Wild World', location:'Conservation Station, Rafiki\'s Planet Watch', desc:'New as of May 26, 2026 — reached by the Wildlife Express Train from Harambe. A great lower-key stop for the 9-year-old.', who:['kid9']},
    ],
    coolSpots:[
      {emoji:'🦁', name:'Festival of the Lion King', location:'Africa', desc:'A ~30-minute indoor, air-conditioned musical and acrobatic show — high-energy but a real sit-down break.', type:'show'},
      {emoji:'🐟', name:'Finding Nemo: The Big Blue…and Beyond!', location:'Discovery Island', desc:'A ~25-minute indoor, air-conditioned musical in a large theater — good midday reset.', type:'show'},
      {emoji:'🦊', name:'Zootopia: Better Zoogether!', location:'Tree of Life Theater, Discovery Island', desc:'Indoor, air-conditioned show that replaced "It\'s Tough to Be a Bug" in late 2025 — same cool theater, new show.', type:'show'},
      {emoji:'🔬', name:'Conservation Station', location:'Rafiki\'s Planet Watch (via Wildlife Express Train)', desc:'Indoor, air-conditioned building with animal exhibits and windows into the vet area — a calm, cool stop off the main path.', type:'show'},
      {emoji:'💧', name:'Na\'vi River Journey', location:'Pandora – The World of Avatar', desc:'Slow indoor boat ride, fully air-conditioned — one of the gentlest rides in the park.', type:'ride'},
      {emoji:'🦅', name:'Avatar Flight of Passage', location:'Pandora – The World of Avatar', desc:'Indoor simulator ride, fully air-conditioned — the park\'s longest standby line, but a genuine cooldown once you\'re moving through the queue building.', type:'ride'},
    ]
  },
];

/* ---- label + class maps (shared vocabulary) ---- */
const TAG_LABEL = { must:'Must Try', kid:'Kid Fave', new:'New 2026', adult:'Adults', classic:'Classic', pesc:'Pescatarian OK' };
const TAG_CLASS = { must:'tag-must', kid:'tag-kid', new:'tag-new', adult:'tag-adult', classic:'tag-classic', pesc:'tag-pesc' };
const WHO_LABEL = { kid9:'9YO Pick', teen13:'13YO Pick', adult22:'22YO Pick', parents:'Parents', everyone:'Everyone' };
const WHO_CLASS = { kid9:'who-kid9', teen13:'who-teen13', adult22:'who-adult22', parents:'who-parents', everyone:'who-everyone' };
const COOL_TYPE_LABEL = { show:'AC Show', ride:'AC Ride', dining:'AC Dining', shade:'Shade / Fans' };
const COOL_TYPE_CLASS = { show:'cool-type-show', ride:'cool-type-ride', dining:'cool-type-dining', shade:'cool-type-shade' };

/* ---- snack progress (localStorage, per-device) ---- */
function getTried(){
  try{ return JSON.parse(localStorage.getItem('tripTried') || '{}'); }catch(e){ return {}; }
}
function setTried(obj){
  try{ localStorage.setItem('tripTried', JSON.stringify(obj)); }catch(e){}
}
const TRIP_DAYS = [];
for(let d=14; d<=22; d++){
  const date = new Date(2026, 6, d); // July = month 6
  TRIP_DAYS.push({
    key:`2026-07-${d}`,
    dayNum:d,
    dow:date.toLocaleDateString('en-US',{weekday:'short'}).toUpperCase(),
    label:`Jul ${d}`
  });
}
function todayKeyPadded(){
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
}
/* the fixed family itinerary — the single source of truth for every day */
const ITINERARY = {
  '2026-07-14': { icon:'🚐', title:'Travel day', parks:[], events:[
      'Land in Orlando & grab the rental van',
      'Check into the Marriott',
      'Tonight: grocery run + Primark Disney haul'
    ], note:'Primark\'s Disney merch is a fraction of park prices — stock up tonight so nobody begs for $40 tees later.' },
  '2026-07-15': { icon:'🌌', title:'Epic Universe — open to close', parks:['epic'], events:[
      'Rope drop: Dark Universe & Isle of Berk first (everyone else sprints to Nintendo)',
      'Early afternoon: Super Nintendo World once the rush clears',
      'Stay to close: Celestial Goodnight fireworks over the fountains'
    ] },
  '2026-07-16': { icon:'🎢', title:'Universal hop day 1 — IOA + USF', parks:['ioa','usf','epic'], events:[
      'Rope drop IOA: VelociCoaster or Hagrid\'s first',
      'Hogwarts Express to Diagon Alley (park-to-park)',
      'Epic return trip if the crew votes yes'
    ] },
  '2026-07-17': { icon:'🎡', title:'Universal hop day 2 — catch-up', parks:['ioa','usf','epic'], events:[
      'Second swing at whatever got missed or demands a re-ride',
      'Adults: 600 Block Speakeasy at CityWalk (password required 🤫)'
    ] },
  '2026-07-18': { icon:'🏨', title:'Hotel switch day', parks:[], events:[
      'Check out of the Marriott',
      'Check into Disney\'s Caribbean Beach Resort',
      'Pool afternoon — recover for the Disney leg'
    ], note:'Caribbean Beach is on the Skyliner (direct gondola to EPCOT & Hollywood Studios), and staying on-property unlocks 30-min early entry at every Disney park starting tomorrow.' },
  '2026-07-19': { icon:'💃', title:'Dance performance + EPCOT', parks:['epcot'], events:[
      '9:00 AM — dance performance at Disney Springs 💃',
      '~1:00 PM — EPCOT via Skyliner to International Gateway (drops you at France, steps from Remy\'s)',
      'World Showcase side first — it\'s right where you enter'
    ], note:'Arriving at 1pm skips the morning rush; use the DuckTales adventure to keep the kids engaged around World Showcase.' },
  '2026-07-20': { icon:'🏰', title:'Magic Kingdom — full day', parks:['mk'], events:[
      'Early entry: TRON first, Seven Dwarfs second',
      'Storm window = AC circuit (❄️ list on the park page)',
      'Stay for the fireworks'
    ] },
  '2026-07-21': { icon:'🎬', title:'Hollywood Studios — full day', parks:['hs'], events:[
      'Early entry: Rise of the Resistance, then Slinky Dog',
      'Skyliner there and back — no car needed',
      'Last full park day — finish those snack lists 🏆'
    ] },
  '2026-07-22': { icon:'👋', title:'Travel home', parks:[], events:[
      'Check out of Caribbean Beach',
      'Return the rental van',
      'Home 🏁'
    ], note:'Final snack scoreboard is on the dashboard — settle the family championship on the drive.' }
};
function snackTotals(){
  const tried = getTried();
  let total = 0, done = 0;
  PARKS.forEach(p=>{
    total += p.snacks.length;
    p.snacks.forEach((s,i)=>{ if(tried[`${p.id}::${i}`]) done++; });
  });
  return {total, done};
}

/* ---- live wait times (Queue-Times.com free API) ---- */
const QT_IDS = { mk:6, epcot:5, hs:7, ak:8, ioa:64, usf:65, epic:334 };
const QT_NOTE = {};
const qtCache = {};

async function fetchQT(parkId){
  const qid = QT_IDS[parkId];
  if(!qid) return null;
  const cached = qtCache[parkId];
  if(cached && Date.now() - cached.t < 300000) return cached.data;
  const r = await fetch(`https://queue-times.com/parks/${qid}/queue_times.json`);
  if(!r.ok) throw new Error(r.status);
  const data = await r.json();
  qtCache[parkId] = { t: Date.now(), data };
  return data;
}

/* ---- Orlando weather (Open-Meteo, free, no key) ---- */
const WX_URL = 'https://api.open-meteo.com/v1/forecast?latitude=28.45&longitude=-81.50&daily=temperature_2m_max,precipitation_probability_max,weather_code&hourly=precipitation_probability&forecast_days=14&timezone=America%2FNew_York&temperature_unit=fahrenheit';
let WX = null;
try{
  const c = JSON.parse(localStorage.getItem('tripWx') || 'null');
  if(c && c.data) WX = c.data;
}catch(e){}

/* Refresh WX from cache or network. Pure data — callers do their own painting. */
async function fetchWeather(){
  try{
    const c = JSON.parse(localStorage.getItem('tripWx') || 'null');
    if(c && Date.now() - c.t < 1800000){ WX = c.data; }
    else{
      const r = await fetch(WX_URL);
      if(!r.ok) throw new Error(r.status);
      WX = await r.json();
      try{ localStorage.setItem('tripWx', JSON.stringify({t: Date.now(), data: WX})); }catch(e){}
    }
  }catch(e){ /* keep whatever WX we already have */ }
  return WX;
}

function wxFor(dateKey){
  if(!WX || !WX.daily || !WX.daily.time) return null;
  const i = WX.daily.time.indexOf(dateKey);
  if(i < 0) return null;
  return {
    hi: Math.round(WX.daily.temperature_2m_max[i]),
    pp: WX.daily.precipitation_probability_max[i],
    code: WX.daily.weather_code[i]
  };
}
function wxIcon(code){
  if(code == null) return '☀️';
  if(code <= 1) return '☀️';
  if(code <= 3) return '⛅';
  if(code <= 48) return '🌫️';
  if(code <= 67) return '🌦️';
  if(code <= 82) return '🌧️';
  return '⛈️';
}
function stormWindow(dateKey){
  if(!WX || !WX.hourly || !WX.hourly.time) return null;
  let first = null, last = null;
  WX.hourly.time.forEach((h,i)=>{
    if(h.startsWith(dateKey)){
      const hour = +h.slice(11,13);
      if(hour >= 10 && hour <= 21 && WX.hourly.precipitation_probability[i] >= 50){
        if(first === null) first = hour;
        last = hour;
      }
    }
  });
  if(first === null) return null;
  const f = (h)=> h === 12 ? '12pm' : h > 12 ? (h-12)+'pm' : h+'am';
  return `${f(first)}–${f(last+1)}`;
}

/* ---- whose device is this? ---- */
const WHO_OPTS = [['kid9','🧒 9YO'],['teen13','🧑 13YO'],['adult22','🎓 22YO'],['parents','👨‍👩 Parents'],['all','👪 Shared']];
function getWho(){ try{ return localStorage.getItem('tripWho') || ''; }catch(e){ return ''; } }
