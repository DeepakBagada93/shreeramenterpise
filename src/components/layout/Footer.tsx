import { APP_NAME } from '@/lib/constants';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">{APP_NAME}</h3>
            <p className="text-sm text-muted-foreground">Your destination for quality men's fashion.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="/vendor-application" className="text-muted-foreground hover:text-primary">Become a Vendor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
