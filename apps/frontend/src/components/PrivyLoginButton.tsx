'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Wallet, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PrivyLoginButtonProps {
  minimal?: boolean;
  className?: string;
}

export function PrivyLoginButton({ minimal, className }: PrivyLoginButtonProps) {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const router = useRouter();

  const wallet = wallets[0];
  const address = wallet?.address;

  if (!ready) return <Button disabled variant="ghost">Carregando...</Button>;

  if (!authenticated) {
    if (minimal) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={login}
          className={className}
        >
          Entrar
        </Button>
      );
    }

    return (
      <Button onClick={login} className={className || "bg-[#15803d] hover:bg-[#166534] text-white font-medium px-6 shadow-md transition-all"}>
        <Wallet className="w-4 h-4 mr-2" />
        Entrar com Wallet
      </Button>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const googleAccount = user?.linkedAccounts.find((a: any) => a.type === 'google_oauth') as any;
  const displayName = googleAccount?.name || user?.email?.address || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Usuário');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary-100 hover:border-primary-300">
          <Avatar className="h-9 w-9">
            {/* Use user.linkedAccounts to find email or google image if available, otherwise fallback */}
            <AvatarImage src={googleAccount?.picture || undefined} />
            <AvatarFallback className="bg-primary-100 text-primary-700 font-bold">
              {user?.email?.address
                ? user.email.address.slice(0, 2).toUpperCase()
                : address
                  ? address.slice(2, 4).toUpperCase()
                  : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{displayName}</p>
            {user?.email?.address && googleAccount?.name && (
              <p className="w-[200px] truncate text-xs text-muted-foreground">
                {user.email.address}
              </p>
            )}
            {address && (
              <p className="w-[200px] truncate text-xs text-muted-foreground mt-1">
                {address}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
