
'use client'; // Required for usePathname

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SecondaryNav from '@/components/layout/SecondaryNav';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME } from '@/lib/constants';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

// Metadata cannot be exported from a client component in this way.
// We add static tags to the <head> as a workaround. For a more robust
// solution, metadata should be defined in a server component layout or page.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname ? pathname.startsWith('/admin') : false;

  return (
    <html lang="en">
      <head>
        <title>{APP_NAME}</title>
        <meta name="description" content="Modern e-commerce store for men's clothing." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {isAdminPage ? (
          <>
            {/* The admin layout handles its own structure */}
            {children}
          </>
        ) : (
          <div className="flex min-h-screen flex-col">
            <Header />
            <Suspense fallback={<div className="h-12 w-full border-b" />}>
              <SecondaryNav />
            </Suspense>
            <main className="flex-grow py-8">
              {children}
            </main>
            <Footer />
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}
