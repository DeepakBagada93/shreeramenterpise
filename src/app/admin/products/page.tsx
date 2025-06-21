
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PRODUCTS } from "@/lib/mock-data";
import ProductsTable from "@/components/admin/products/ProductsTable";
import Link from "next/link";

export default function AdminProductsPage() {
  const products = PRODUCTS;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Products</h1>
          <p className="text-muted-foreground">
            Manage all products in your store.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </>
  );
}
