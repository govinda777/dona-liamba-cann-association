'use client';

import { useAccount, useBalance } from 'wagmi';
import { Card } from '@/components/ui/card';
import { TrendingUp, Wallet, ArrowUpRight } from 'lucide-react';
import { formatEther } from 'viem';
import { usePrivy } from '@privy-io/react-auth';

export function BalanceCard({ onClick }: { onClick?: () => void }) {
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });
  const { authenticated, login } = usePrivy();

  const handleBalanceClick = () => {
    if (!authenticated) {
      login();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      onClick={handleBalanceClick}
      className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-primary-600 text-white shadow-lg border-0 min-w-[200px] cursor-pointer transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-3 h-3" />
      </div>

      <div className="flex items-center justify-between">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1 flex items-center gap-1.5">
            <Wallet className="w-3 h-3" /> Saldo
          </p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black tracking-tight">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : balance ? (
                `${parseFloat(formatEther(balance.value)).toFixed(4)}`
              ) : (
                '0.0000'
              )}
            </p>
            <span className="text-xs font-bold opacity-70">ETH</span>
          </div>
        </div>
        <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md shadow-inner">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}
