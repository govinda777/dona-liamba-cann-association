import Link from 'next/link';
import { Home, Send, Layers, Inbox, Wallet, Activity, Globe, HelpCircle } from 'lucide-react';
import { ModeToggle } from '@/components/ThemeToggle';
import { PrivyLoginButton } from '@/components/PrivyLoginButton';

const DISCLAIMER = "Esta área do site tem como objetivo exclusivo trazer total transparência sobre o funcionamento dos processos internos, governança e decisões organizacionais da DAO Dona Liamba.";

export default function DAOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header with Disclaimer */}
      <header className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
            Dona Liamba DAO
          </Link>
          <div className="text-xs text-gray-400 text-center max-w-2xl px-4">
            {DISCLAIMER}
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <PrivyLoginButton minimal={false} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 hidden md:flex flex-col py-8 px-4 bg-black">
          <nav className="flex-1 space-y-2">
            <Link href="/dao" className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <Home className="w-6 h-6" />
              <span className="text-lg">Home</span>
            </Link>

            <Link href="/dao/send" className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <Send className="w-6 h-6" />
              <span className="text-lg">Send</span>
            </Link>

            <Link href="/dao/stake" className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <Layers className="w-6 h-6" />
              <span className="text-lg">Stake</span>
            </Link>

            <Link href="/dao/governance" className="flex items-center gap-4 px-4 py-3 text-emerald-400 hover:text-emerald-300 hover:bg-gray-900 rounded-lg transition-colors">
              <Inbox className="w-6 h-6" />
              <span className="text-lg font-medium">Governance</span>
            </Link>

            <Link href="/dao/holdings" className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <Wallet className="w-6 h-6" />
              <span className="text-lg">Holdings</span>
            </Link>

            <Link href="/dao/get-liamba" className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <Activity className="w-6 h-6" />
              <span className="text-lg">Get $LIAMBA</span>
            </Link>

            <div className="my-6 border-t border-gray-800"></div>

            <Link href="/dao/community" className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <Globe className="w-6 h-6" />
              <span className="text-lg">Community</span>
            </Link>

            <Link href="/dao/support" className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
              <HelpCircle className="w-6 h-6" />
              <span className="text-lg">Support</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer Disclaimer */}
      <footer className="border-t border-gray-800 p-6 text-center text-sm text-gray-500 bg-black mt-auto">
        <div className="max-w-4xl mx-auto">
          {DISCLAIMER}
        </div>
      </footer>
    </div>
  );
}
