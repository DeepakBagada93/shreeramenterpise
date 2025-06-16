
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const secondaryNavLinks = [
  { href: '/products?category=men', label: 'Men' },
  { href: '/products?category=women', label: 'Women' },
  { href: '/products?category=kids', label: 'Kids' },
  { href: '/products?category=new-arrivals', label: 'New Arrivals' },
  { href: '/products?category=sale', label: 'Sale' },
  { href: '/products?category=accessories', label: 'Accessories' },
];

const SecondaryNavLinkItem = ({ href, label }: { href: string; label: string; }) => {
  const pathname = usePathname();
  // A simple way to check active state, might need refinement based on actual query params
  const isActive = pathname + (typeof window !== 'undefined' ? window.location.search : '') === href;

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-md hover:bg-muted hover:text-primary transition-colors",
        isActive ? "text-primary bg-muted" : "text-foreground/70"
      )}
    >
      {label}
    </Link>
  );
};

const SecondaryNav = () => {
  return (
    <div className="bg-background shadow-sm">
      <nav className="container mx-auto flex h-12 items-center justify-center px-4 gap-2 md:gap-4 overflow-x-auto">
        {secondaryNavLinks.map((link) => (
          <SecondaryNavLinkItem key={link.href} href={link.href} label={link.label} />
        ))}
      </nav>
      <Separator />
    </div>
  );
};

export default SecondaryNav;
