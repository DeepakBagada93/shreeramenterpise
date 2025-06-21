
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SecondaryNav from '@/components/layout/SecondaryNav';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME } from '@/lib/constants';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Modern e-commerce store for men\'s clothing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {/* The admin layout will handle its own structure, so we render children directly. */}
        {/* Other pages will be wrapped by their respective layouts or content. */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
