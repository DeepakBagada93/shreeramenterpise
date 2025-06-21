
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
import { getAllCategories, getProductBySlug } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";


export default function EditProductPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const categories = getAllCategories();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const productData = getProductBySlug(params.slug);
    setProduct(productData);
  }, [params.slug]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productName = formData.get('name');
    
    console.log("Updated Product Data:", {
        id: product?.id,
        name: productName,
    });

    toast({
      title: "Product Updated",
      description: `Product "${productName}" has been successfully updated.`,
    });

    router.push('/admin/products');
  };

  if (!product) {
      return <div>Loading product...</div>;
  }

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
            <h1 className="text-3xl font-bold font-headline">Edit Product</h1>
            <p className="text-muted-foreground">
                Update the details for "{product.name}".
            </p>
        </div>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Update the information for the product.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" defaultValue={product.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={product.category} required>
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
              <Textarea id="description" name="description" defaultValue={product.description} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (INR)</Label>
              <Input id="price" name="price" type="number" defaultValue={product.price} required min="0" step="0.01" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" name="stock" type="number" defaultValue={product.stock} required min="0" />
            </div>
             <div className="md:col-span-2 space-y-2">
              <Label htmlFor="images">Image URL</Label>
              <Input id="images" name="images" defaultValue={product.images[0]} required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button type="submit">Update Product</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
