/* ============================================================
   ROLL CALL — The Kolkata Food Atlas
   Every visible word lives in this file. Edit freely and reload.
   Spot pin positions: x/y are percentages on the illustrated map.
   Photography for spot 1–10 lives in assets/spot-01.jpg … spot-10.jpg
   ============================================================ */

window.ROLL_CALL = {
  meta: {
    title: "Roll Call — A Kolkata Street-Food Atlas",
    description:
      "Ten legendary Kolkata street-food stops, mapped and photographed: what to order, where to find it, when to go, and where to eat it.",
    themeColorLight: "#F5EBDD",
    themeColorDark: "#171916"
  },

  brand: {
    name: "Roll Call",
    sub: "Kolkata Food Atlas"
  },

  nav: [
    { label: "Explore", href: "#guide" },
    { label: "Food Map", href: "#map" },
    { label: "The Ten Stops", href: "#stops" },
    { label: "About", href: "#about" }
  ],

  ui: {
    skip: "Skip to the food map",
    north: "N",
    order: "What to order",
    directions: "Get directions",
    maps: "Open in maps",
    showOnMap: "View on map",
    prev: "Previous stop",
    next: "Next stop",
    pin: "Stop",
    themeToDark: "Night mode",
    themeToLight: "Daylight",
    themeAriaToDark: "Switch to night mode",
    themeAriaToLight: "Switch to daylight mode",
    menu: "Menu",
    menuClose: "Close",
    backToMap: "Back to the map",
    browseHint: "Use the arrows to browse",
    scrollHint: "Scroll to explore",
    selected: "Selected stop"
  },

  hero: {
    kicker: "A hungry person's field guide to Kolkata",
    issue: "Field guide · Issue 01",
    titleLines: ["Kolkata is best", "served on the", "streets."],
    intro:
      "Ten legendary stops. A thousand unforgettable flavours. One city worth exploring.",
    primaryCta: "Explore the map",
    secondaryCta: "Discover the ten",
    stats: [
      { value: "10", label: "stops worth the queue" },
      { value: "07", label: "neighbourhoods to wander" },
      { value: "1690", label: "a city built for eating" }
    ],
    image: "assets/hero-kolkata.jpg",
    imageAlt:
      "A Kolkata street-food vendor wrapping a kathi roll at a glowing dusk cart, with a yellow taxi and tram in the background.",
    place: "Kolkata, West Bengal",
    coordinates: "22.5726° N · 88.3639° E",
    badgeRing: "TEN STOPS · KOLKATA FOOD ATLAS · EAT THE STREETS · ",
    badgeCenter: "10",
    badgeAria: "Ten-stop Kolkata food atlas seal"
  },

  ticker: [
    "Kathi roll",
    "Phuchka",
    "Mughlai paratha",
    "Rosogolla",
    "Chicken stew",
    "Biryani",
    "Telebhaja",
    "Kesar sharbat",
    "Changezi",
    "Mishti doi",
    "Jhalmuri"
  ],

  map: {
    kicker: "The food map",
    title: "Ten pins. One hungry city.",
    lede:
      "Every stop in this guide, pinned across the city. Choose a number to see what to order, when to go, and where to eat it.",
    hint: "Select a numbered pin to open the stop",
    plate: "Plate 01 · The food map",
    ariaLabel: "Stylised illustrated street map of Kolkata with ten numbered food pins",
    stamp: "KOLKATA\n22.5726° N · 88.3639° E",
    note:
      "A stylised map drawn for appetite, not navigation. Every stop links to real directions.",
    legend: [
      { label: "Food stop", kind: "stop" },
      { label: "Water", kind: "water" },
      { label: "Park", kind: "park" }
    ],
    labels: [
      { text: "HOOGHLY RIVER", x: 62, y: 540, rotate: -90, size: 14 },
      { text: "BURRABAZAR", x: 330, y: 66, size: 15 },
      { text: "TIRETTA", x: 420, y: 300, size: 13 },
      { text: "ESPLANADE", x: 626, y: 372, size: 15 },
      { text: "NEW MARKET", x: 322, y: 490, size: 13 },
      { text: "MAIDAN", x: 468, y: 720, size: 17 },
      { text: "PARK CIRCUS", x: 706, y: 542, rotate: 90, size: 13 },
      { text: "BALLYGUNGE", x: 690, y: 782, size: 13 },
      { text: "SOUTHERN AVENUE", x: 560, y: 936, size: 12 }
    ]
  },

  spotlight: {
    eyebrow: "Selected stop",
    labels: {
      price: "Price",
      time: "Best time",
      eat: "Eat it here"
    }
  },

  guide: {
    kicker: "The field guide",
    title: "The whole atlas, on one page.",
    lede:
      "What to order, what it costs, when to turn up, and the exact corner worth eating it on. Ten stops, no guesswork.",
    note:
      "Prices are editorial estimates in rupees; street counters move with the season. When in doubt, ask what came out of the kadai last.",
    columns: {
      number: "No.",
      stop: "Stop",
      order: "Order",
      price: "Price",
      time: "Best time",
      eat: "Eat it here",
      open: "Map"
    }
  },

  list: {
    kicker: "The ten stops",
    title: "A crawl through the city's appetite.",
    lede:
      "From a 1932 roll counter to a ring of phuchka carts after sundown. Ten places that explain Kolkata better than any guidebook.",
    priceNote:
      "Street prices wobble — treat these as friendly ballparks, not menu promises."
  },

  about: {
    kicker: "About this atlas",
    title: "A city best understood bite by bite.",
    body: [
      "Kolkata eats on its feet. The city's best meals are handed over counters, through car windows, and across the rims of steel plates — no reservation, no ceremony, just a queue that knows exactly what it is waiting for.",
      "Roll Call began as a list passed between friends: the roll you detour for, the sharbat that ends an afternoon, the biryani worth crossing the city for. We photographed the plates, mapped the corners, and wrote down the details that matter — what to order, when to go, and where to stand.",
      "This is not a ranking. It is an invitation. Take the long way home, keep small change in your pocket, and eat standing up."
    ],
    quote: "Kolkata doesn't do small portions — of food, opinions, or feeling.",
    quoteAttribution: "The Roll Call editors",
    facts: [
      { label: "Founded", value: "1690" },
      { label: "Stops", value: "10" },
      { label: "Neighbourhoods", value: "07" }
    ],
    image: "assets/about-kolkata.jpg",
    imageAlt:
      "A golden-hour Kolkata street with a yellow taxi, a tram, colonial facades, and a crowd gathered at a roadside food stall.",
    imageCaption:
      "Tramlines, yellow taxis, and a city that eats on its feet."
  },

  footer: {
    marquee: "Eat well · Walk it off · ",
    big: "See you on the street.",
    blurb:
      "An independent field guide to the food corners that make Kolkata worth wandering.",
    madeWith: "Researched on foot. Written between snacks.",
    smallPrint:
      "A stylised map. Prices are ballpark. Appetite is non-negotiable.",
    copyright: "© 2026 Roll Call",
    coordinates: "22.5726° N · 88.3639° E"
  },

  spots: [
    {
      name: "Nizam's",
      area: "New Market",
      since: "since 1932",
      order: "Chicken kathi roll",
      orderNote: "extra onions, a hard squeeze of lime, zero cutlery",
      blurb:
        "Kolkata's roll royalty. The legend goes that a hurried diner wanted his kebab wrapped for the road — and the kathi roll was born. Still flaky, still fiery, still the benchmark.",
      tags: ["Non-veg", "Legend"],
      price: "₹80–160",
      bestTime: "Evenings, 5–9 pm",
      eatAt: "At the counter, roll in hand",
      image: "assets/spot-01.jpg",
      imageAlt:
        "A chicken kathi roll wrapped in paper with lime and onions on a worn steel counter.",
      x: 43,
      y: 41,
      accent: "clay",
      mapsQuery: "Nizam's Restaurant New Market Kolkata"
    },
    {
      name: "Dacres Lane",
      area: "Esplanade",
      since: "Raj-era lunch alley",
      order: "Fish fry + chicken stew",
      orderNote: "with buttered bread, eaten standing",
      blurb:
        "A skinny office alley where every doorway hides a steaming pot. Chitto Babu's is the loudest argument for a long lunch: crisp fish fry, peppery stew, and bread to mop it all up.",
      tags: ["Lunch", "Old-school"],
      price: "₹70–150",
      bestTime: "Lunch, noon–4 pm",
      eatAt: "On a stool in the lane",
      image: "assets/spot-02.jpg",
      imageAlt:
        "Fish fry, chicken stew, and buttered bread on an enamel plate in a narrow Kolkata alley.",
      x: 50,
      y: 56,
      accent: "ochre",
      mapsQuery: "Dacres Lane Chitto Babu Kolkata"
    },
    {
      name: "Anadi Cabin",
      area: "Esplanade",
      since: "since 1926",
      order: "Mughlai paratha",
      orderNote: "add aloor dom; bring a friend, it's enormous",
      blurb:
        "A creaky old cabin of a room near Esplanade, all wood, waiters and clatter. The Mughlai paratha arrives crisp-edged, egg-stuffed and bigger than your face. Do not attempt alone.",
      tags: ["Iconic", "Non-veg"],
      price: "₹90–140",
      bestTime: "Breakfast, 8–11 am",
      eatAt: "At a table in the old cabin",
      image: "assets/spot-03.jpg",
      imageAlt:
        "Mughlai paratha cut open to reveal egg and spiced mince, served with aloo dom curry.",
      x: 59,
      y: 35,
      accent: "olive",
      mapsQuery: "Anadi Cabin Esplanade Kolkata"
    },
    {
      name: "Paramount",
      area: "Esplanade",
      since: "since 1918",
      order: "Kesar sharbat",
      orderNote: "green mango in season; sip slowly, no straw needed",
      blurb:
        "A tiny sharbat counter that has cooled down Kolkata for over a century. Ask for kesar, watch the glass turn gold, and join the long line of students, office folks and romantics.",
      tags: ["Drink", "Veg"],
      price: "₹40–80",
      bestTime: "Afternoons, noon–6 pm",
      eatAt: "At the marble counter",
      image: "assets/spot-04.jpg",
      imageAlt:
        "A tall glass of golden kesar sharbat with crushed ice on a marble counter.",
      x: 70,
      y: 24,
      accent: "ochre",
      mapsQuery: "Paramount Sherbet Esplanade Kolkata"
    },
    {
      name: "K.C. Das",
      area: "Esplanade",
      since: "since 1868",
      order: "Rosogolla",
      orderNote: "then a mishti doi you didn't plan on",
      blurb:
        "The shop that insists it invented the rosogolla — and honestly, one bite and you'll stop arguing. Order the classic, then a nolen-gur version if winter is being generous.",
      tags: ["Sweet", "Veg"],
      price: "₹30–80",
      bestTime: "All day, 9 am–9 pm",
      eatAt: "Standing by the sweet counter",
      image: "assets/spot-05.jpg",
      imageAlt:
        "Rosogolla in syrup in a clay bowl on the counter of a heritage Kolkata sweet shop.",
      x: 64,
      y: 47,
      accent: "clay",
      mapsQuery: "KC Das Sweets Esplanade Kolkata"
    },
    {
      name: "Zakaria Street",
      area: "Burrabazar",
      since: "a nightly ritual",
      order: "Chicken changezi",
      orderNote: "haleem in Ramadan; arrive with a serious appetite",
      blurb:
        "When the shutters come down, this lane near Nakhoda Masjid turns into a full-blown feast. Kebabs smoke, biryani bubbles, and changezi comes out rich and tangy. Ramadan here is another level entirely.",
      tags: ["Dinner", "Non-veg"],
      price: "₹100–250",
      bestTime: "After dark; Ramadan is peak",
      eatAt: "Walking the lane",
      image: "assets/spot-06.jpg",
      imageAlt:
        "Chicken changezi in a blackened karahi, lit by the firelight of a night street stall.",
      x: 38,
      y: 11,
      accent: "olive",
      mapsQuery: "Zakaria Street Nakhoda Masjid Kolkata"
    },
    {
      name: "Tiretta Bazaar",
      area: "Tiretta",
      since: "mornings only",
      order: "Chinese breakfast",
      orderNote: "fish-ball soup, steamed buns, strong sweet tea",
      blurb:
        "Kolkata's Chinese community has been serving breakfast in these lanes for generations. Come early, follow the steam, and order by pointing at whatever the next table is having.",
      tags: ["Breakfast", "Rare find"],
      price: "₹50–120",
      bestTime: "Early morning, 6–9 am",
      eatAt: "At a shared lane table",
      image: "assets/spot-07.jpg",
      imageAlt:
        "Steamed buns in a bamboo basket beside fish-ball soup at a Kolkata Chinese breakfast stall.",
      x: 50,
      y: 20,
      accent: "clay",
      mapsQuery: "Tiretta Bazaar Chinese breakfast Kolkata"
    },
    {
      name: "Radhu Babu'r Telebhaja",
      area: "Maidan",
      since: "the evening shift",
      order: "Mochar chop + beguni",
      orderNote: "eat in rounds, straight from the kadai",
      blurb:
        "As the Maidan cools, the oil starts singing. Banana-flower chops, batter-fried brinjal and a queue that knows exactly what it's doing. This is the snack stop that makes the walk home longer.",
      tags: ["Snack", "Veg"],
      price: "₹20–50",
      bestTime: "Evening, 4–8 pm",
      eatAt: "Roadside, by the kadai",
      image: "assets/spot-08.jpg",
      imageAlt:
        "Telebhaja fritters on newspaper beside a bowl of green chutney at an evening Maidan stall.",
      x: 40,
      y: 67,
      accent: "ochre",
      mapsQuery: "Radhu Babu telebhaja Maidan Kolkata"
    },
    {
      name: "Arsalan",
      area: "Park Circus",
      since: "a biryani institution",
      order: "Mutton biryani",
      orderNote: "add a chaap; yes, the potato absolutely counts",
      blurb:
        "Kolkata biryani is gentler and sweeter than its cousins, and it comes with a whole potato — a hill some will die on. Arsalan's plate is the easiest way to understand the fuss.",
      tags: ["Dinner", "Biryani"],
      price: "₹150–320",
      bestTime: "Dinner, 7–11 pm",
      eatAt: "Upstairs in the dining room",
      image: "assets/spot-09.jpg",
      imageAlt:
        "Kolkata mutton biryani with a whole potato and boiled egg on a brass thali.",
      x: 76,
      y: 60,
      accent: "olive",
      mapsQuery: "Arsalan Restaurant Park Circus Kolkata"
    },
    {
      name: "Vivekananda Park Phuchka",
      area: "Southern Avenue",
      since: "after sundown",
      order: "Phuchka",
      orderNote: "less tetul jol if you're sensible; more if you're brave",
      blurb:
        "A ring of carts, a mob of regulars, and the city's sourest, spiciest phuchka. The trick is to eat standing up, keep count with the vendor, and never admit defeat.",
      tags: ["Snack", "Veg"],
      price: "₹30–60",
      bestTime: "After sundown, 4–8 pm",
      eatAt: "By the park railings",
      image: "assets/spot-10.jpg",
      imageAlt:
        "A phuchka being filled with spiced potato and tamarind water at a park-side Kolkata cart.",
      x: 54,
      y: 81,
      accent: "clay",
      mapsQuery: "Vivekananda Park phuchka Southern Avenue Kolkata"
    }
  ]
};
