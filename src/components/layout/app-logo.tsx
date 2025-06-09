import { Sprout } from 'lucide-react';
import Link from 'next/link';

export function AppLogo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
      <Sprout className="h-8 w-8" />
      <span className="text-2xl font-bold font-headline">AgriView</span>
    </Link>
  );
}
