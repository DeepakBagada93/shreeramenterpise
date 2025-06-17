
'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, Home, Shirt, Award, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllCategories } from '@/lib/mock-data';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: Shirt },
  { href: '/recommendations', label: 'Style Hub', icon: Award },
  { href: '/account', label: 'Account', icon: User },
  { href: '/cart', label: 'Cart', icon: ShoppingBag },
];

const NavLinkItem = ({ href, label, icon: Icon, isMobile = false }: { href: string; label: string; icon: React.ElementType; isMobile?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkContent = (
    <>
      <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
      <span className={cn(isActive ? "text-primary font-semibold" : "text-foreground group-hover:text-primary", isMobile ? "text-lg" : "text-sm")}>{label}</span>
    </>
  );

  if (isMobile) {
    return (
      <SheetClose asChild>
        <Link href={href} className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors group w-full">
          {linkContent}
        </Link>
      </SheetClose>
    );
  }

  return (
    <Link href={href} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors group">
      {linkContent}
    </Link>
  );
};


const Header = () => {
  const searchCategories = getAllCategories();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        
        <div className="hidden md:flex items-center flex-grow max-w-lg lg:max-w-xl ml-6 mr-4">
          <div className="flex w-full items-stretch rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-background">
            <Select defaultValue="all">
              <SelectTrigger
                aria-label="Select search category"
                className="h-9 rounded-r-none border-0 border-r bg-muted/50 hover:bg-muted focus:ring-0 focus:outline-none w-auto min-w-[70px] max-w-[140px] px-2.5 text-xs text-muted-foreground data-[state=open]:bg-muted"
              >
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {searchCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-grow">
              <Input
                type="search"
                placeholder="Search products, brands and more"
                className="h-9 w-full rounded-none border-0 bg-transparent focus:ring-0 focus:outline-none px-3 placeholder:text-muted-foreground/80"
              />
            </div>
            <Button variant="default" size="icon" className="h-9 w-10 rounded-l-none bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4 text-primary-foreground" />
            </Button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} {...link} />
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6 flex flex-col">
              <div className="mb-6">
                <Logo />
              </div>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <NavLinkItem key={link.href} {...link} isMobile />
                ))}
              </nav>
              <div className="mt-auto">
                 <Button className="w-full">Contact Sales</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
