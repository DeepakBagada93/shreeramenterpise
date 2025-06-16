import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import { PRODUCTS, getAllCategories, getAllSizes, getAllColors } from '@/lib/mock-data';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// This page should be a client component if filters are interactive client-side
// or handle filtering via searchParams if server-side.
// For simplicity, displaying all products first.

export default function ProductsPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  // Basic filtering example (can be expanded)
  const category = searchParams?.category as string | undefined;
  const size = searchParams?.size as string | undefined;
  const color = searchParams?.color as string | undefined;
  // const minPrice = searchParams?.minPrice ? parseFloat(searchParams.minPrice as string) : undefined;
  // const maxPrice = searchParams?.maxPrice ? parseFloat(searchParams.maxPrice as string) : undefined;

  let filteredProducts = PRODUCTS;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (size) {
    filteredProducts = filteredProducts.filter(p => p.sizes.map(s => s.toLowerCase()).includes(size.toLowerCase()));
  }
  if (color) {
    filteredProducts = filteredProducts.filter(p => p.colors.map(c => c.toLowerCase()).includes(color.toLowerCase()));
  }

  const availableCategories = getAllCategories();
  const availableSizes = getAllSizes();
  const availableColors = getAllColors();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <ProductFilters 
          categories={availableCategories}
          sizes={availableSizes}
          colors={availableColors}
        />
      </aside>
      <main className="w-full md:w-3/4 lg:w-4/5">
        <h1 className="text-3xl font-bold mb-8 font-headline">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : 'All Products'}
        </h1>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or view all products.</p>
          </div>
        )}
        {/* Basic Pagination Example - to be made functional */}
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
