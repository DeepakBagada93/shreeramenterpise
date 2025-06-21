
export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export type ProductCategory = 'T-Shirts' | 'Shirts' | 'Pants' | 'Jackets' | 'Accessories' | 'Knitwear' | 'Shorts';
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
  vendorId?: string;
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

// Admin Panel Types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  phone: string;
  address: string;
  website?: string;
  commissionRate: number; // as a percentage
  joinedDate: string; // ISO date string
  status: 'Approved' | 'Pending' | 'Rejected';
  productsCount: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number; // Price at time of purchase
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string; // ISO date string
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  total: number;
}
