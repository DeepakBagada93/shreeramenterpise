
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts, PRODUCTS } from '@/lib/mock-data'; // Updated import
import { Award, ShoppingBag, Shirt, Sparkles, ShieldCheck, Users, ThumbsUp, Truck } from 'lucide-react'; // Added new icons
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  // For "Trending Now", let's pick a different set of products for variety
  const trendingProducts = PRODUCTS.slice(2, 6); 

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'T-Shirts': <Shirt className="w-12 h-12 text-white" />,
    'Pants': (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-white">
        <path d="M9 2v10.5A2.5 2.5 0 0 0 11.5 15h1A2.5 2.5 0 0 0 15 12.5V2"/>
        <path d="M9 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2"/>
        <path d="M15 2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2"/>
      </svg>
    ),
    'Jackets': (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-white">
        <path d="M20.38 3.46 16 2a4 4 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v7c0 2.21 1.79 4 4 4h4c2.21 0 4-1.79 4-4v-7h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
        <path d="M6 9h12"/>
        <path d="M12 9V2"/>
      </svg>
    ),
    'Accessories': <Sparkles className="w-12 h-12 text-white" />,
  };

  const categoryBackgrounds: { [key: string]: string } = {
    'T-Shirts': 'bg-primary/20',
    'Pants': 'bg-muted',
    'Jackets': 'bg-secondary',
    'Accessories': 'bg-accent/30',
  };

  const whyChooseUsItems = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />,
      title: "Premium Quality",
      description: "Crafted with the finest materials for lasting comfort and style.",
    },
    {
      icon: <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" />,
      title: "Modern Style",
      description: "Stay ahead of trends with our curated collection of contemporary designs.",
    },
    {
      icon: <Truck className="w-12 h-12 text-primary mx-auto mb-4" />,
      title: "Fast Shipping",
      description: "Get your new favorite outfits delivered to your door quickly and reliably.",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/40 via-accent/20 to-background p-8 md:p-16 rounded-lg shadow-lg overflow-hidden">
        <div className="container mx-auto text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 text-primary">
            Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover curated collections of premium men's clothing. Quality craftsmanship, timeless designs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto">
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 font-headline">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Trending Now Section */}
      {trendingProducts.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 font-headline">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action - Style Recommendations */}
      <section className="bg-card p-8 md:p-12 rounded-lg shadow-md text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">Need a Style Upgrade?</h2>
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

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 font-headline">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Object.keys(categoryIcons).map(category => (
            <Link key={category} href={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`} className="group">
              <div className={cn(
                "relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center justify-center p-4",
                categoryBackgrounds[category] || 'bg-gray-200' // Fallback background
              )}>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  {categoryIcons[category]}
                </div>
                 {/* Adding category name below icon for clarity, visible on hover too */}
                <span className="mt-2 text-center text-sm font-medium text-white z-10 group-hover:text-white transition-colors">
                  {category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 font-headline">Why Choose {process.env.NEXT_PUBLIC_APP_NAME || "Us"}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {whyChooseUsItems.map((item) => (
              <div key={item.title} className="text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2 font-headline">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
