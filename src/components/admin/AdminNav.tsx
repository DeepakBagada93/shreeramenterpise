'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Shield,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/vendors', label: 'Vendors', icon: Users },
];

export default function AdminNav() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold font-headline text-primary">
            Admin Panel
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {adminNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  icon={<link.icon />}
                  tooltip={{
                    children: link.label,
                    side: 'right',
                  }}
                  onClick={handleLinkClick}
                >
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
          <Separator className="my-2" />
          <SidebarMenuItem>
            <Link href="/" passHref>
              <SidebarMenuButton
                asChild
                icon={<Home />}
                tooltip={{
                  children: 'Back to Store',
                  side: 'right',
                }}
                onClick={handleLinkClick}
              >
                <span>Back to Store</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t -mx-2 p-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="https://placehold.co/40x40.png"
              alt="Admin User"
              data-ai-hint="avatar person"
            />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="truncate text-sm font-semibold text-sidebar-foreground">
              Admin User
            </span>
            <span className="truncate text-xs text-muted-foreground">
              admin@example.com
            </span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto flex-shrink-0">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
