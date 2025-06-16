
import type { Product, UserProfile, Review, ProductCategory, ProductSize } from './types';

const COMMON_SIZES: ProductSize[] = ['S', 'M', 'L', 'XL'];
const COMMON_COLORS = ['White', 'Muted Blue', 'Charcoal', 'Off-white'];

const MOCK_REVIEWS: Review[] = [
  { id: 'review1', author: 'Alex P.', rating: 5, comment: 'Great quality and fit!', date: '2023-10-15' },
  { id: 'review2', author: 'Ben C.', rating: 4, comment: 'Comfortable and stylish.', date: '2023-10-20' },
  { id: 'review3', author: 'Chris D.', rating: 5, comment: 'Love the color and material.', date: '2023-11-01' },
];

// Prices updated to reflect INR values (example conversion, adjust as needed)
export const PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    slug: 'classic-crew-neck-tee',
    name: 'Classic Crew Neck Tee',
    description: 'A timeless essential, this crew neck t-shirt is crafted from soft, breathable cotton for all-day comfort. Perfect for layering or wearing on its own.',
    price: 2499.00, // Approx 29.99 USD
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    category: 'T-Shirts',
    sizes: COMMON_SIZES,
    colors: ['White', 'Muted Blue', 'Black'],
    stock: 150,
    reviews: MOCK_REVIEWS.slice(0,2),
    tags: ['cotton', 'basic', 'crew-neck'],
    dateAdded: '2023-01-15T10:00:00Z',
    featured: true,
    rating: 4.5,
  },
  {
    id: 'prod_002',
    slug: 'slim-fit-chino-pants',
    name: 'Slim Fit Chino Pants',
    description: 'Versatile and stylish, these slim-fit chinos are made from a comfortable stretch-cotton blend. Ideal for both casual and smart-casual occasions.',
    price: 5799.00, // Approx 69.99 USD
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    category: 'Pants',
    sizes: ['S', 'M', 'L'],
    colors: ['Charcoal', 'Khaki', 'Navy'],
    stock: 80,
    reviews: [MOCK_REVIEWS[1]],
    tags: ['chino', 'slim-fit', 'smart-casual'],
    dateAdded: '2023-02-20T11:00:00Z',
    featured: true,
    rating: 4.2,
  },
  {
    id: 'prod_003',
    slug: 'oxford-button-down-shirt',
    name: 'Oxford Button-Down Shirt',
    description: 'A wardrobe staple, this Oxford shirt features a classic button-down collar and a crisp, clean look. Made from durable and soft Oxford cotton.',
    price: 4999.00, // Approx 59.99 USD
    images: ['https://placehold.co/600x800.png'],
    category: 'Shirts',
    sizes: COMMON_SIZES,
    colors: ['White', 'Light Blue', 'Striped Muted Blue'],
    stock: 120,
    reviews: MOCK_REVIEWS.slice(1,3),
    tags: ['oxford', 'button-down', 'formal'],
    dateAdded: '2023-03-10T09:30:00Z',
    rating: 4.8,
  },
  {
    id: 'prod_004',
    slug: 'lightweight-bomber-jacket',
    name: 'Lightweight Bomber Jacket',
    description: 'Transition through seasons with ease in this lightweight bomber jacket. Features a sleek design with ribbed cuffs and hem for a modern fit.',
    price: 7499.00, // Approx 89.99 USD
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    category: 'Jackets',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Olive Green', 'Muted Blue'],
    stock: 60,
    tags: ['bomber', 'lightweight', 'spring-fall'],
    dateAdded: '2023-04-05T14:15:00Z',
    featured: true,
    rating: 4.6,
  },
  {
    id: 'prod_005',
    slug: 'premium-leather-belt',
    name: 'Premium Leather Belt',
    description: 'Complete your look with this premium leather belt, featuring a classic metal buckle and durable construction. A timeless accessory for any wardrobe.',
    price: 3750.00, // Approx 45.00 USD
    images: ['https://placehold.co/400x400.png'],
    category: 'Accessories',
    sizes: ['S', 'M', 'L'], // Belt sizes
    colors: ['Black', 'Brown'],
    stock: 200,
    reviews: [MOCK_REVIEWS[0]],
    tags: ['leather', 'belt', 'accessory'],
    dateAdded: '2023-05-01T16:00:00Z',
    rating: 4.9,
  },
  {
    id: 'prod_006',
    slug: 'modern-fit-denim-jeans',
    name: 'Modern Fit Denim Jeans',
    description: 'Crafted for comfort and style, these modern-fit jeans offer a versatile look for everyday wear. Made with a hint of stretch for flexibility.',
    price: 6699.00, // Approx 79.99 USD
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    category: 'Pants',
    sizes: COMMON_SIZES,
    colors: ['Dark Wash Blue', 'Black', 'Light Wash Blue'],
    stock: 90,
    tags: ['denim', 'jeans', 'modern-fit'],
    dateAdded: '2023-06-12T10:45:00Z',
    rating: 4.3,
  },
   {
    id: 'prod_007',
    slug: 'merino-wool-sweater',
    name: 'Merino Wool Sweater',
    description: 'Luxuriously soft and warm, this merino wool sweater is perfect for cooler days. Features a classic crew neck and ribbed trim.',
    price: 8299.00, // Approx 99.50 USD
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png'],
    category: 'Shirts', // or a new 'Knitwear' category
    sizes: COMMON_SIZES,
    colors: ['Charcoal', 'Navy', 'Heather Grey'],
    stock: 75,
    reviews: MOCK_REVIEWS,
    tags: ['merino-wool', 'sweater', 'warm'],
    dateAdded: '2023-09-01T12:00:00Z',
    featured: false,
    rating: 4.7,
  },
  {
    id: 'prod_008',
    slug: 'linen-blend-shorts',
    name: 'Linen Blend Shorts',
    description: 'Stay cool and comfortable in these breathable linen-blend shorts. Perfect for warm weather, featuring a relaxed fit and drawstring waist.',
    price: 4199.00, // Approx 49.99 USD
    images: ['https://placehold.co/600x800.png'],
    category: 'Pants', // or 'Shorts'
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Off-white', 'Light Blue', 'Khaki Stripe'],
    stock: 110,
    tags: ['linen', 'shorts', 'summer'],
    dateAdded: '2023-07-15T15:30:00Z',
    rating: 4.1,
  },
];

export const USER_PROFILES: UserProfile[] = [
  {
    id: 'user_001',
    name: 'John Doe',
    purchaseHistory: ['prod_001', 'prod_002'], // Bought a T-Shirt and Chinos
  },
  {
    id: 'user_002',
    name: 'Jane Smith',
    purchaseHistory: ['prod_003', 'prod_005', 'prod_001'], // Bought an Oxford Shirt, Belt, and T-shirt
  },
  {
    id: 'user_003',
    name: 'Mike Brown',
    purchaseHistory: ['prod_004', 'prod_006', 'prod_007'], // Bought a Bomber Jacket, Jeans, and Sweater
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return PRODUCTS.filter(p => p.featured).slice(0, 4);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return PRODUCTS.filter(p => p.category === category);
}

export const getAllCategories = (): ProductCategory[] => {
  const categories = new Set(PRODUCTS.map(p => p.category));
  return Array.from(categories);
}

export const getAllSizes = (): ProductSize[] => {
  const sizes = new Set(PRODUCTS.flatMap(p => p.sizes));
  return Array.from(sizes);
}

export const getAllColors = (): string[] => {
  const colors = new Set(PRODUCTS.flatMap(p => p.colors));
  return Array.from(colors);
}
