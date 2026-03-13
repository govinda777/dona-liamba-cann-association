import { Leaf, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrivyLoginButton } from '@/components/PrivyLoginButton';
import { ModeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight font-serif">
                Dona Liamba
              </h1>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Como Funciona
              </Link>
              <Link href="/#para-quem" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Para Quem É
              </Link>
              <Link href="/#associacoes" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Associações
              </Link>
              <Link href="/#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Dúvidas
              </Link>
              <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <ModeToggle />
              <PrivyLoginButton minimal={true} className="text-muted-foreground hover:text-primary" />

              {/* Menu Mobile */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </nav>
      </header>
  );
}
