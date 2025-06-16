import Link from 'next/link';
import { Shirt } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Shirt className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
      <span className="text-2xl font-headline font-bold text-primary group-hover:text-accent transition-colors whitespace-nowrap">
        {APP_NAME}
      </span>
    </Link>
  );
};

export default Logo;
