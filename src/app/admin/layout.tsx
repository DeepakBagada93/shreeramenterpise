import AdminNav from '@/components/admin/AdminNav';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminNav />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center justify-end gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          {/* Mobile sidebar trigger */}
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
