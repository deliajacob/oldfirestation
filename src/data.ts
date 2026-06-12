import { MenuItem, Beer, DogProfile, BakingProgress, TimeState } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Artisan Country Sourdough Loaf',
    description: 'Slow-fermented for 24 hours, wild natural yeast starter, dark crusty exterior with a beautifully moist, chewy crumb.',
    price: 4.50,
    category: 'bakery',
    tags: ['Vegan', 'House Speciality'],
    freshHour: '07:30'
  },
  {
    id: 'm2',
    name: 'Cardamom Bun',
    description: 'Freshly baked Swedish-style braided rich dough infused with ground cardamom, brushed with sugar syrup and pearl sugar.',
    price: 3.50,
    category: 'bakery',
    tags: ['Vegetarian', 'Bestseller'],
    freshHour: '08:00'
  },
  {
    id: 'm3',
    name: 'Almond Croissant',
    description: 'Twice-baked butter croissant loaded with luscious house almond frangipane, topped with toasted flaked almonds and powdered sugar.',
    price: 3.80,
    category: 'bakery',
    tags: ['Vegetarian'],
    freshHour: '08:30'
  },
  {
    id: 'm4',
    name: 'Vegan Pain au Chocolat',
    description: 'Light, flaky laminated vegan pastry layers with organic single-origin dark chocolate batons.',
    price: 3.60,
    category: 'bakery',
    tags: ['Vegan'],
    freshHour: '08:15'
  },
  {
    id: 'm5',
    name: 'Seasonal Fruit Galette',
    description: 'Rustic flaky pastry casing filled with stewed Salford plum or orchard fruits, sprinkled with demersal sugar.',
    price: 4.00,
    category: 'bakery',
    tags: ['Vegetarian'],
    freshHour: '09:00'
  },
  {
    id: 'm6',
    name: 'Firehouse Benedict',
    description: 'Our toasted country sourdough crusts, poached local free-range eggs, house-made brown-butter tarragon hollandaise, and crispy dry-cured Lancashire bacon.',
    price: 9.50,
    category: 'breakfast',
    tags: ['Local Sourced']
  },
  {
    id: 'm7',
    name: 'Garlic Wild Mushrooms on Toast',
    description: 'Locally-foraged wood mushrooms pan-seared with wild garlic, fresh tarragon cream, resting on charred sourdough.',
    price: 8.50,
    category: 'breakfast',
    tags: ['Vegetarian', 'Vegan Option']
  },
  {
    id: 'm8',
    name: 'Spiced Fire-Red Shakshuka',
    description: 'Poached eggs nestled in a simmered cast iron pan of bell peppers, fire-roasted tomatoes, North African spices, served with soft sourdough chunks.',
    price: 9.00,
    category: 'breakfast',
    tags: ['Vegetarian', 'Spicy']
  },
  {
    id: 'm9',
    name: 'University Sourdough Pancakes',
    description: 'Fluffy sourdough hybrid pancakes served with organic maple syrup, salted organic butter, and fresh seasonal berries.',
    price: 7.80,
    category: 'breakfast',
    tags: ['Vegetarian']
  },
  {
    id: 'm10',
    name: 'Lark Hill Beef IPA Carbonnade',
    description: 'Slow-braised British beef in Lark Hill Red IPA gravy, loaded with heritage root vegetables, served with a giant slab of toasted rye bread.',
    price: 12.50,
    category: 'lunch',
    tags: ['Contains Beer', 'Hearty']
  },
  {
    id: 'm11',
    name: 'Firehouse Hot-Smashed Club Toastie',
    description: 'Double cheese sourdough melt with roasted free-range turkey, local cheddar, vine tomatoes, and house fermented chili-garlic mayo.',
    price: 8.90,
    category: 'lunch',
    tags: ['Bestseller', 'Warm']
  },
  {
    id: 'm12',
    name: 'Warm Beetroot & Vegan Feta Salad',
    description: 'Oven-roasted salt bark beetroots, organic vegan feta, toasted walnuts, crispy sourdough croutons, home-grown micro herby vinaigrette.',
    price: 8.20,
    category: 'lunch',
    tags: ['Vegan', 'Gluten-Free Option']
  },
  {
    id: 'm13',
    name: 'Speciality Single-Origin Espresso',
    description: 'Rotating single-origin coffee roasted by our Salford local partner. Floral notes of stone fruit, shifting to rich chocolate.',
    price: 3.00,
    category: 'drinks',
    tags: ['Eco-Sourced', 'Caffeine']
  },
  {
    id: 'm14',
    name: 'Double-Shot Flat White',
    description: 'Perfectly balanced ristretto double-shot of speciality espresso with dense, silky micro-foamed pasture milk.',
    price: 3.40,
    category: 'drinks',
    tags: ['Bestseller']
  },
  {
    id: 'm15',
    name: 'Lark Hill Mint Iced Matcha',
    description: 'Cold ceremonial Japanese Uji matcha shaken with home-made organic mint syrup and chilled creamy oat milk.',
    price: 4.00,
    category: 'drinks',
    tags: ['Vegan', 'Refreshing']
  },
  {
    id: 'm16',
    name: 'Traditional Loose-Leaf Fire Blend',
    description: 'Our customized smoky Earl Grey and Assam tea blend, perfect with a splash of milk or a slice of fresh lemon.',
    price: 2.80,
    category: 'drinks',
    tags: ['Eco-Sourced']
  }
];

export const BEERS: Beer[] = [
  {
    id: 'b1',
    name: 'Engine No. 9',
    style: 'Citrus Pale Ale',
    abv: 4.2,
    ibu: 30,
    colorHex: '#f39c12',
    colorName: 'Amber Gold',
    hops: ['Citra', 'Mosaic', 'Simcoe'],
    description: 'Superbly bright session pale ale with vibrant aromas of grapefruit, passionfruit, and pine. Perfectly clean finish.',
    onTap: true,
    notes: 'Named after Salford’s historical vintage 1903 firefighting engines that operated on this exact floor.'
  },
  {
    id: 'b2',
    name: 'Salford Red',
    style: 'Heritage Red IPA',
    abv: 5.6,
    ibu: 45,
    colorHex: '#a04000',
    colorName: 'Copper Crimson',
    hops: ['Chinook', 'Cascade', 'Centennial'],
    description: 'Malty, caramel-heavy base balanced by old-school piney hops. A solid, deep-bodied ale with a rich resin finish.',
    onTap: true,
    notes: 'Brewed using 100% certified renewable electric power from Lark Hill Brewery vaults.'
  },
  {
    id: 'b3',
    name: 'Hose Down Stout',
    style: 'Dry Irish Stout',
    abv: 4.5,
    ibu: 35,
    colorHex: '#1a1a1a',
    colorName: 'Midnight Black',
    hops: ['Fuggles', 'East Kent Goldings'],
    description: 'Velvety dry stout boasting aromas of wood-roasted local espresso beans and single-origin dark cocoa.',
    onTap: true,
    notes: 'A thick, rich, creamy finish that keeps you warm on crisp Salford afternoons.'
  },
  {
    id: 'b4',
    name: 'Station Vaults Pils',
    style: 'Cold-Conditioned Lager',
    abv: 4.8,
    ibu: 22,
    colorHex: '#fcf3cf',
    colorName: 'Straw Yellow',
    hops: ['Saaz', 'Hallertau Mittelfruh'],
    description: 'Remarkably clean, crisp, Bohemian-style lager, matured for full six weeks under the brick vaults of our converted station.',
    onTap: true,
    notes: 'Provides a light floral and herbal aroma. Exceptionally crisp and refreshing mouthfeel.'
  },
  {
    id: 'b5',
    name: 'Lark Hill Siren Sour',
    style: 'Raspberry Gose',
    abv: 3.8,
    ibu: 12,
    colorHex: '#e06666',
    colorName: 'Blushing Rose',
    hops: ['Hallertau Blanc'],
    description: 'A tart, lactic fermentation beer brewed with hand-crushed wild raspberries and a delicate pinch of pink sea salt.',
    onTap: false,
    notes: 'Seasonal release. Brewed to sound the alarm on commercial taste-alike artificial syrups.'
  }
];

export const INITIAL_DOGS: DogProfile[] = [
  {
    id: 'd1',
    name: 'Barnaby',
    breed: 'Pug',
    vibe: 'Voted "Most likely to snatch a sourdough crust when you look away."',
    avatarSeed: 'pug'
  },
  {
    id: 'd2',
    name: 'Luna',
    breed: 'Golden Retriever',
    vibe: 'Lark Hill Brewery’s unofficial quality manager. Professional tail-wagger.',
    avatarSeed: 'retriever'
  },
  {
    id: 'd3',
    name: 'Winston',
    breed: 'English Bulldog',
    vibe: 'Specialist sleeper under Table 4. Master of organic snoring sounds.',
    avatarSeed: 'bulldog'
  },
  {
    id: 'd4',
    name: 'Pip',
    breed: 'Jack Russell',
    vibe: 'Cardamom bun enthusiast and barista morale cheer captain.',
    avatarSeed: 'terrier'
  }
];

export const INITIAL_BAKING_ITEMS: BakingProgress[] = [
  {
    id: 'bp1',
    name: '100% Natural Artisan Sourdough',
    stage: 'fresh',
    progress: 100,
    startTime: '02:00',
    readyTime: '07:30'
  },
  {
    id: 'bp2',
    name: 'Swedish Cardamom Buns',
    stage: 'baking',
    progress: 80,
    startTime: '06:30',
    readyTime: '08:00'
  },
  {
    id: 'bp3',
    name: 'Vegan Pain au Chocolat',
    stage: 'proofing',
    progress: 45,
    startTime: '05:30',
    readyTime: '08:15'
  },
  {
    id: 'bp4',
    name: 'Twice-Baked Almond Croissants',
    stage: 'mixing',
    progress: 15,
    startTime: '07:00',
    readyTime: '08:45'
  }
];

export const TIMELINE_EVENTS = [
  {
    year: '1903',
    title: 'The Foundation Stone',
    description: 'Built as Salford’s original premier fire station in mock-Tudor brick, serving as the frontline safety shield for the bustling industrial canal district.'
  },
  {
    year: '1950s',
    title: 'Motorized Engines Era',
    description: 'Modified steam pumps retired for classic post-war fire trucks. The engine room floor was reinforced to hold Salford’s heaviest Leyland pumper trucks.'
  },
  {
    year: '1980',
    title: 'Decommissioning',
    description: 'The fire station retired its sirens as modern emergency service coverage centralized, leaving the architectural gem dormant and preserved.'
  },
  {
    year: '2023',
    title: 'The Great Salford Awakening',
    description: 'Acquired and lovingly restored by the University of Salford, repurposing the engine bays as a hub for artisan baking, workspace, and a community focus.'
  },
  {
    year: 'Now',
    title: 'A Flourishing Craft Hub',
    description: 'Fusing artisan sourdough bakery, community coffee culture, and our miniature on-site Lark Hill Brewery in a dog-friendly, climate-focused atmosphere.'
  }
];

// Calculate if the station is currently open
// Tue-Wed: 8am - 4pm
// Thu: 8am - 8pm
// Fri: 8am - 9pm
// Sat: 9am - 4pm
// Sun-Mon: Closed
export function getStationStatus(date: Date): TimeState {
  const day = date.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  // Day check
  if (day === 0 || day === 1) { // Sun, Mon
    return {
      isOpen: false,
      statusText: 'Closed',
      nextEventText: 'Opens Tuesday at 8:00 AM'
    };
  }

  let openTime = 8 * 60; // 8:00 AM
  let closeTime = 16 * 60; // 4:00 PM standard (Tue, Wed)

  if (day === 4) { // Thu
    closeTime = 20 * 60; // 8:00 PM
  } else if (day === 5) { // Fri
    closeTime = 21 * 60; // 9:00 PM
  } else if (day === 6) { // Sat
    openTime = 9 * 60; // 9:00 AM
    closeTime = 16 * 60; // 4:00 PM
  }

  const isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;

  if (isOpen) {
    const formatCloseTime = (closeTime: number) => {
      const pmH = Math.floor(closeTime / 60);
      return `${pmH > 12 ? pmH - 12 : pmH}:${String(closeTime % 60).padStart(2, '0')} PM`;
    };
    return {
      isOpen: true,
      statusText: 'Open',
      nextEventText: `Serving until ${formatCloseTime(closeTime)} today`
    };
  } else {
    // If before opening
    if (currentTimeInMinutes < openTime) {
      const formatOpenTime = (openTime: number) => {
        const amH = Math.floor(openTime / 60);
        return `${amH}:00 AM`;
      };
      return {
        isOpen: false,
        statusText: 'Closed',
        nextEventText: `Opens today at ${formatOpenTime(openTime)}`
      };
    } else {
      // After closing
      const nextDayStr = getNextOpeningDayStr(day);
      return {
        isOpen: false,
        statusText: 'Closed After Hours',
        nextEventText: `We are closed. Opens ${nextDayStr}`
      };
    }
  }
}

function getNextOpeningDayStr(currentDay: number): string {
  if (currentDay === 2 || currentDay === 3) {
    return 'tomorrow at 8:00 AM';
  }
  if (currentDay === 4) {
    return 'tomorrow (Friday) at 8:00 AM';
  }
  if (currentDay === 5) {
    return 'tomorrow (Saturday) at 9:00 AM';
  }
  if (currentDay === 6) {
    return 'Tuesday at 8:00 AM';
  }
  return 'Tuesday at 8:00 AM';
}
