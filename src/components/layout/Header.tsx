'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, Home, Shirt, Award, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

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
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        
        <div className="hidden md:flex items-center gap-2 flex-grow max-w-xs ml-8">
          <Input type="search" placeholder="Search products..." className="h-9" />
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
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
