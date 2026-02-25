'use client';

import { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrivyLoginButton } from '@/components/PrivyLoginButton';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authenticated, login } = usePrivy();

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
            <Link href="/membro" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-yellow-500 text-white text-sm font-bold hover:shadow-lg transition-all hover:scale-105 group">
              <span>Seja Membro</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider group-hover:bg-white/30 transition-colors">🚀 Novo</span>
            </Link>
            {authenticated && (
              <Link href="/dashboard" className="text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <PrivyLoginButton minimal={true} className="text-slate-600 hover:text-primary-700" />

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
              <Link href="/membro" className="flex items-center w-fit gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-yellow-500 text-white text-sm font-bold" onClick={() => setMobileMenuOpen(false)}>
                <span>Seja Membro</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">🚀 Novo</span>
              </Link>
              {authenticated && (
                <Link href="/dashboard" className="text-sm font-medium text-slate-700 hover:text-primary-700" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
              {!authenticated && (
                <div className="pt-2 flex flex-col gap-2">
                  <Button variant="outline" onClick={() => login()} className="w-full justify-center">
                    Entrar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
