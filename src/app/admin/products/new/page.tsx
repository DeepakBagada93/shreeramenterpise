
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllCategories } from "@/lib/mock-data";

export default function NewProductPage() {
  const { toast } = useToast();
  const router = useRouter();
  const categories = getAllCategories();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productName = formData.get('name');
    
    // Mocking the add functionality
    console.log("New Product Data:", {
        name: productName,
        description: formData.get('description'),
        price: formData.get('price'),
        category: formData.get('category'),
        stock: formData.get('stock'),
    });

    toast({
      title: "Product Created",
      description: `Product "${productName}" has been successfully created.`,
    });

    router.push('/admin/products');
  };

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Products</span>
            </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold font-headline">Add New Product</h1>
            <p className="text-muted-foreground">
                Fill out the form below to add a new product to your store.
            </p>
        </div>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Enter the information for the new product.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="e.g., Classic Crew Neck Tee" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Enter product description..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (INR)</Label>
              <Input id="price" name="price" type="number" placeholder="e.g., 2499.00" required min="0" step="0.01" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" name="stock" type="number" placeholder="e.g., 150" required min="0" />
            </div>
             <div className="md:col-span-2 space-y-2">
              <Label htmlFor="images">Image URL</Label>
              <Input id="images" name="images" placeholder="https://placehold.co/600x800.png" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button type="submit">Save Product</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
