
export interface Ingredient {
  name: string;
  source: string;
  location: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  tagline: string;
  ingredients: Ingredient[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Fixed: Added missing Artist interface required by components/ArtistCard.tsx
export interface Artist {
  id: string;
  name: string;
  image: string;
  day: string;
  genre: string;
}
