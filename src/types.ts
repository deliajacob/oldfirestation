export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'bakery' | 'breakfast' | 'lunch' | 'drinks';
  tags?: string[];
  freshHour?: string; // e.g. "08:30"
}

export interface Beer {
  id: string;
  name: string;
  style: string;
  abv: number;
  ibu: number;
  colorHex: string;
  colorName: string;
  hops: string[];
  description: string;
  onTap: boolean;
  notes: string;
}

export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  vibe: string;
  avatarSeed: string; // for cute pixelated dog profile generator
  addedByUser?: boolean;
}

export interface BakingProgress {
  id: string;
  name: string;
  stage: 'mixing' | 'proofing' | 'baking' | 'fresh';
  progress: number; // 0 to 100
  startTime: string;
  readyTime: string;
}

export interface TimeState {
  isOpen: boolean;
  statusText: string;
  nextEventText: string;
}
