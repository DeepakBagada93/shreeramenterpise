'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { ProductCategory, ProductSize } from '@/lib/types';

interface ProductFiltersProps {
  categories: ProductCategory[];
  sizes: ProductSize[];
  colors: string[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ categories, sizes, colors }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('category') || []);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(searchParams.getAll('size') || []);
  const [selectedColors, setSelectedColors] = useState<string[]>(searchParams.getAll('color') || []);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice') || 0),
    Number(searchParams.get('maxPrice') || 500)
  ]);

  useEffect(() => {
    setSelectedCategories(searchParams.getAll('category') || []);
    setSelectedSizes(searchParams.getAll('size') || []);
    setSelectedColors(searchParams.getAll('color') || []);
    setPriceRange([
        Number(searchParams.get('minPrice') || 0),
        Number(searchParams.get('maxPrice') || 500)
    ]);
  }, [searchParams]);


  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Categories
    params.delete('category');
    selectedCategories.forEach(cat => params.append('category', cat));
    
    // Sizes
    params.delete('size');
    selectedSizes.forEach(size => params.append('size', size));

    // Colors
    params.delete('color');
    selectedColors.forEach(color => params.append('color', color));

    // Price
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleSelection = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    const newList = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    setter(newList);
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
    router.push(pathname, { scroll: false });
  };


  return (
    <div className="space-y-6 p-4 bg-card rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold font-headline">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">Clear All</Button>
      </div>
      <Accordion type="multiple" defaultValue={['category', 'size', 'color', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cat-${category}`} 
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                />
                <Label htmlFor={`cat-${category}`} className="font-normal text-sm">{category}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-base font-medium">Size</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox 
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
                />
                <Label htmlFor={`size-${size}`} className="font-normal text-sm">{size}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-base font-medium">Color</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox 
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() => toggleSelection(color, selectedColors, setSelectedColors)}
                />
                <Label htmlFor={`color-${color}`} className="font-normal text-sm">{color}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Slider
              defaultValue={[priceRange[0], priceRange[1]]}
              min={0}
              max={500}
              step={10}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={handleFilterChange} className="w-full mt-4">Apply Filters</Button>
    </div>
  );
};

export default ProductFilters;
