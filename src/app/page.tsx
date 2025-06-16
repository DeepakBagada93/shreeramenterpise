import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/mock-data';
import { Award, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/40 via-accent/20 to-background p-8 md:p-16 rounded-lg shadow-lg overflow-hidden">
        <div className="container mx-auto text-center z-10 relative">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-primary">
            Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover curated collections of premium men's clothing. Quality craftsmanship, timeless designs.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/recommendations">
                <Award className="mr-2 h-5 w-5" />
                Get Style Advice
              </Link>
            </Button>
          </div>
        </div>
         <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Stylish men's fashion banner" 
            layout="fill"
            objectFit="cover"
            className="opacity-5 absolute inset-0 z-0"
            data-ai-hint="mens fashion"
            priority
          />
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 font-headline">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action - Style Recommendations */}
      <section className="bg-card p-8 md:p-12 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-4 font-headline">Need a Style Upgrade?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Let our AI-powered Style Hub craft personalized recommendations based on your unique taste and purchase history.
        </p>
        <Button asChild size="lg" variant="secondary" className="shadow hover:shadow-md transition-shadow">
          <Link href="/recommendations">
            <Award className="mr-2 h-5 w-5" />
            Discover Your Style
          </Link>
        </Button>
      </section>

      {/* Categories Section - Example */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 font-headline">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['T-Shirts', 'Pants', 'Jackets', 'Accessories'].map(category => (
            <Link key={category} href={`/products?category=${category.toLowerCase()}`} className="group">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <Image 
                  src={`https://placehold.co/400x400.png`} 
                  alt={category} 
                  layout="fill" 
                  objectFit="cover" 
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={`${category.toLowerCase()} clothing`}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
