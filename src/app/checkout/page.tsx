'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock } from "lucide-react";
import Link from "next/link";

// Form related imports - would be used with react-hook-form and zod
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Mock order summary (in a real app, this would come from cart context/state)
const mockOrderSummary = {
  items: [
    { id: '1', name: 'Classic Crew Neck Tee', price: 29.99, quantity: 1, image: 'https://placehold.co/100x100.png' },
    { id: '2', name: 'Slim Fit Chino Pants', price: 69.99, quantity: 1, image: 'https://placehold.co/100x100.png' },
  ],
  subtotal: 99.98,
  shipping: 5.99,
  total: 105.97,
};

export default function CheckoutPage() {
  const { toast } = useToast();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation simulation
    const form = e.target as HTMLFormElement;
    const email = form.email as HTMLInputElement;
    if (!email.value.includes('@')) {
         toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
         return;
    }
    // In a real app, process payment and create order
    toast({ title: "Order Placed!", description: "Thank you for your purchase. Your order is being processed." });
    // Potentially redirect to an order confirmation page
    // router.push('/order-confirmation');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline text-center">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
        {/* Shipping & Payment Information */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="md:col-span-2 space-y-1">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main St" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Anytown" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" placeholder="CA" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="zip">ZIP / Postal Code</Label>
                <Input id="zip" placeholder="90210" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="United States" required />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                Payment Details
              </CardTitle>
              <CardDescription>All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM / YY" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="•••" required />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" required />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-24"> {/* Sticky for long forms */}
            <CardHeader>
              <CardTitle className="text-xl font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockOrderSummary.items.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" data-ai-hint="checkout item" />
                    <span>{item.name} (x{item.quantity})</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${mockOrderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${mockOrderSummary.shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${mockOrderSummary.total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button type="submit" size="lg" className="w-full shadow hover:shadow-md">
                <Lock className="mr-2 h-5 w-5" /> Place Secure Order
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By placing your order, you agree to our <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link>.
              </p>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
