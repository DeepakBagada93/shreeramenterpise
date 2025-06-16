
'use client'; // For potential client-side cart management

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PRODUCTS } from '@/lib/mock-data';
import type { CartItem as CartItemType } from '@/lib/types';
import { Trash2, ShoppingBag, PlusCircle, MinusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock cart state for now
const initialCartItems: CartItemType[] = [
  { ...PRODUCTS[0], quantity: 1, selectedSize: 'M', selectedColor: PRODUCTS[0].colors[0] },
  { ...PRODUCTS[1], quantity: 2, selectedSize: 'L', selectedColor: PRODUCTS[1].colors[0] },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
    // Assuming shipping is fixed or calculated elsewhere
    const shippingCost = cartItems.length > 0 ? 150 : 0; // Example shipping cost in INR
    setTotal(newSubtotal + shippingCost);
  }, [cartItems]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      ).filter(item => item.quantity > 0) // Remove if quantity becomes 0 or less
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex flex-col md:flex-row items-center p-4 gap-4 shadow-sm">
              <div className="relative w-24 h-32 md:w-28 md:h-36 rounded-md overflow-hidden shrink-0">
                <Image src={item.images[0]} alt={item.name} layout="fill" objectFit="cover" data-ai-hint="cart item" />
              </div>
              <div className="flex-grow">
                <Link href={`/products/${item.slug}`} className="hover:text-primary">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Size: {item.selectedSize} / Color: {item.selectedColor}
                </p>
                <p className="text-md font-semibold text-primary mt-1">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 h-8 text-center"
                  min="1"
                />
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-lg font-semibold w-20 text-right hidden md:block">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove item</span>
              </Button>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹{cartItems.length > 0 ? '150.00' : '0.00'}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button asChild size="lg" className="w-full shadow hover:shadow-md">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
