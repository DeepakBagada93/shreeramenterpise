
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`} aria-label={`View details for ${product.name}`}>
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzaGlydHxlbnwwfHx8fDE3NTAwOTY0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
              data-ai-hint="tshirt"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Badge variant="secondary" className="text-xs">{product.category}</Badge>
          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-lg font-semibold hover:text-primary transition-colors leading-tight">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
        <Button size="sm" variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
