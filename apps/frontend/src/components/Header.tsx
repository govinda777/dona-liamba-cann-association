'use client';

import { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrivyLoginButton } from '@/components/PrivyLoginButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="border-b border-primary-100 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="p-2 bg-primary-100 rounded-full group-hover:bg-primary-200 transition-colors">
              <Leaf className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-900 tracking-tight font-serif">
              Dona Liamba
            </h1>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors">
              Como Funciona
            </a>
            <a href="#para-quem" className="text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors">
              Para Quem É
            </a>
            <a href="#associacoes" className="text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors">
              Associações
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors">
              Dúvidas
            </a>
            <Link href="/blog" className="text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors">
              Blog
            </Link>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-slate-600 hover:text-primary-700"
              onClick={() => router.push('/login')}
            >
              Entrar
            </Button>
            <PrivyLoginButton />

            {/* Menu Mobile Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMenu}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#como-funciona" className="text-sm font-medium text-slate-700 hover:text-primary-700" onClick={() => setMobileMenuOpen(false)}>
                Como Funciona
              </a>
              <a href="#para-quem" className="text-sm font-medium text-slate-700 hover:text-primary-700" onClick={() => setMobileMenuOpen(false)}>
                Para Quem É
              </a>
              <a href="#associacoes" className="text-sm font-medium text-slate-700 hover:text-primary-700" onClick={() => setMobileMenuOpen(false)}>
                Associações
              </a>
              <a href="#faq" className="text-sm font-medium text-slate-700 hover:text-primary-700" onClick={() => setMobileMenuOpen(false)}>
                Dúvidas
              </a>
              <Link href="/blog" className="text-sm font-medium text-slate-700 hover:text-primary-700" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              <div className="pt-2 flex flex-col gap-2">
                <Button variant="outline" onClick={() => router.push('/login')} className="w-full justify-center">
                  Entrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
