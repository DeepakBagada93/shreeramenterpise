
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react'; // Import useState and useEffect

interface NavSubItem {
  href: string;
  label: string;
}

interface NavItem {
  label: string;
  href?: string; // For direct links
  basePath?: string; // e.g., '/products?category=men' for the "Men" dropdown
  subItems?: NavSubItem[];
}

const secondaryNavLinks: NavItem[] = [
  {
    label: 'Men',
    basePath: '/products?category=men',
    subItems: [
      { href: '/products?category=men&subcategory=shirts', label: 'Shirts' },
      { href: '/products?category=men&subcategory=t-shirts', label: 'T-Shirts' },
      { href: '/products?category=men&subcategory=trousers', label: 'Trousers' },
      { href: '/products?category=men&subcategory=jackets', label: 'Jackets' },
      { href: '/products?category=men&subcategory=suits', label: 'Suits' },
    ],
  },
  {
    label: 'Women',
    basePath: '/products?category=women',
    subItems: [
      { href: '/products?category=women&subcategory=dresses', label: 'Dresses' },
      { href: '/products?category=women&subcategory=tops', label: 'Tops' },
      { href: '/products?category=women&subcategory=jeans', label: 'Jeans' },
      { href: '/products?category=women&subcategory=skirts', label: 'Skirts' },
      { href: '/products?category=women&subcategory=outerwear', label: 'Outerwear' },
    ],
  },
  {
    label: 'Kids',
    basePath: '/products?category=kids',
    subItems: [
      { href: '/products?category=kids&subcategory=boys-clothing', label: 'Boys\' Clothing' },
      { href: '/products?category=kids&subcategory=girls-clothing', label: 'Girls\' Clothing' },
      { href: '/products?category=kids&subcategory=baby', label: 'Baby' },
      { href: '/products?category=kids&subcategory=shoes', label: 'Shoes' },
    ],
  },
  { label: 'New Arrivals', href: '/products?category=new-arrivals' },
];


const SecondaryNav = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hooks can only be called at the top level, so we call them unconditionally.
  // The conditional rendering based on isClient happens after hooks are called.

  if (!isClient) {
    // Return null (or a static placeholder if preferred) during SSR and initial client render.
    // The Suspense boundary in RootLayout will show its fallback.
    return null;
  }

  // Now that we are on the client, we can safely use the values from the hooks.
  const currentQuery = searchParams.toString();
  const currentPath = pathname + (currentQuery ? `?${currentQuery}` : '');

  return (
    <div className="bg-background shadow-sm">
      <nav className="container mx-auto flex h-12 items-center justify-center px-4 gap-1 md:gap-2 overflow-x-auto">
        {secondaryNavLinks.map((link) => {
          const isActive = link.href ? currentPath === link.href : (link.basePath ? pathname === '/products' && searchParams.get('category') === link.basePath.split('=')[1] : false);

          if (link.subItems && link.subItems.length > 0) {
            return (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "px-2 sm:px-3 py-2 text-sm font-medium rounded-md hover:bg-muted hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap",
                      isActive ? "text-primary bg-muted" : "text-foreground/70"
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-background shadow-lg border">
                  {link.subItems.map((subItem) => (
                    <DropdownMenuItem key={subItem.href} asChild className="p-0">
                      <Link
                        href={subItem.href}
                        className={cn(
                          "px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary transition-colors w-full text-left block whitespace-nowrap",
                           currentPath === subItem.href ? "text-primary bg-muted" : "text-foreground/80"
                        )}
                      >
                        {subItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href || '#'}
              className={cn(
                "px-2 sm:px-3 py-2 text-sm font-medium rounded-md hover:bg-muted hover:text-primary transition-colors whitespace-nowrap",
                isActive ? "text-primary bg-muted" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Separator />
    </div>
  );
};

export default SecondaryNav;
