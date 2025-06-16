
// This should be [slug]/page.tsx to match mock data structure
// For now, using [id] as a placeholder. Will adjust if slug routing is implemented.
// For this example, assuming `id` is the `slug`.

import Image from 'next/image';
import { getProductBySlug, PRODUCTS } from '@/lib/mock-data'; // Assuming getProductBySlug exists
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Heart, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from '@/components/product/ProductCard';

// This is to make the page dynamic and revalidate on demand (ISR or SSR like)
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductBySlug(params.id);

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg mb-4">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              layout="fill" 
              objectFit="cover"
              priority
              data-ai-hint="product detail"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0,4).map((img, index) => (
              <button key={index} className="aspect-square relative rounded-md overflow-hidden border-2 border-transparent hover:border-primary focus:border-primary transition">
                <Image src={img} alt={`${product.name} thumbnail ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="product thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline">{product.category}</Badge>
                {product.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating! as number) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                    ))}
                    <span className="ml-1 text-muted-foreground">({product.reviews?.length || 0} reviews)</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-3xl lg:text-4xl font-bold font-headline mt-2">{product.name}</CardTitle>
              <p className="text-3xl font-semibold text-primary mt-1">₹{product.price.toFixed(2)}</p>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">{product.description}</CardDescription>
              
              <Separator className="my-6" />

              {/* Size Selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Size:</h4>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <Button key={size} variant="outline" size="sm" className="w-12 h-12 text-base">{size}</Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Color:</h4>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(color => (
                    <Button key={color} variant="outline" size="sm" className="h-12 px-4 text-base">
                      <span className="w-4 h-4 rounded-full mr-2 border" style={{ backgroundColor: color.toLowerCase() === 'white' ? '#eee' : color.toLowerCase().replace(' ', '') }}></span>
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button size="lg" className="flex-1 shadow hover:shadow-md">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="shadow hover:shadow-md">
                  <Heart className="mr-2 h-5 w-5" /> Wishlist
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
              </p>

            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for Description, Reviews, Shipping */}
      <Tabs defaultValue="reviews" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-4">
          <TabsTrigger value="description_long">Full Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="description_long" className="prose max-w-none p-6 bg-card rounded-lg shadow">
          <p>{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </TabsContent>
        <TabsContent value="reviews" className="p-6 bg-card rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map(review => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                    <p className="ml-2 text-sm font-semibold">{review.author}</p>
                    <p className="ml-auto text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet for this product.</p>
          )}
          <Button variant="outline" className="mt-6">
            <MessageCircle className="mr-2 h-4 w-4" /> Write a Review
          </Button>
        </TabsContent>
        <TabsContent value="shipping" className="prose max-w-none p-6 bg-card rounded-lg shadow">
          <h4>Shipping Information</h4>
          <p>We offer standard and express shipping options. Standard shipping usually takes 3-5 business days. Express shipping is 1-2 business days. Shipping costs are calculated at checkout.</p>
          <h4>Returns Policy</h4>
          <p>We accept returns within 30 days of purchase for unworn items with tags attached. Please visit our returns page for more details or to initiate a return.</p>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 font-headline">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
