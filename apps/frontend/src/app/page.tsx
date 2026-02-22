'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Login } from '@/components/Login';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const { login, authenticated, ready } = usePrivy();
  const { address, isConnected } = useAccount();

  if (!ready) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dona Liamba Cann Association</h1>
          {authenticated && (
            <div className="flex items-center gap-2">
               <span className="text-sm text-muted-foreground hidden sm:inline-block">
                 {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No Wallet'}
               </span>
               <Button variant="outline" size="sm" onClick={() => login()}>Wallet</Button>
            </div>
          )}
        </div>
      </header>

      <main>
        {authenticated && isConnected ? (
          <Dashboard />
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
}
