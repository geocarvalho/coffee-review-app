export interface CoffeeReview {
  id: string;
  beanName: string;
  origin: string;
  roaster: string;
  roastLevel: string;
  brewingMethod: string;
  aroma: number;
  acidity: number;
  body: number;
  sweetness: number;
  aftertaste: number;
  balance: number;
  generalScore?: number; // Calculated mean of all ratings
  overallComment: string;
  imageUrl?: string;
  createdAt: string;
}

export type RoastLevel = 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';

export type BrewingMethod = 'V60' | 'AeroPress' | 'Espresso' | 'French Press' | 'Chemex' | 'Kalita Wave' | 'Moka Pot' | 'Pour Over' | 'Cold Brew' | 'Other';

export const ROAST_LEVELS: RoastLevel[] = [
  'Light',
  'Medium-Light', 
  'Medium',
  'Medium-Dark',
  'Dark'
];

export const BREWING_METHODS: BrewingMethod[] = [
  'V60',
  'AeroPress',
  'Espresso',
  'French Press',
  'Chemex',
  'Kalita Wave',
  'Moka Pot',
  'Pour Over',
  'Cold Brew',
  'Other'
]; 