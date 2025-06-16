export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export type ProductCategory = 'T-Shirts' | 'Shirts' | 'Pants' | 'Jackets' | 'Accessories';
export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[]; // URLs
  category: ProductCategory;
  sizes: ProductSize[];
  colors: string[]; // e.g., ['Blue', 'White', 'Patterned']
  stock: number;
  reviews?: Review[];
  tags?: string[];
  dateAdded?: string; // ISO date string
  featured?: boolean;
  rating?: number; // Average rating
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: ProductSize;
  selectedColor: string;
}

// For AI Style Recommendations
export interface UserProfile {
  id: string;
  name: string;
  purchaseHistory: string[]; // Array of product IDs
}
