'use client';

import { useAccount, useBalance } from 'wagmi';
import { Card } from '@/components/ui/card';
import { TrendingUp, Wallet } from 'lucide-react';
import { formatEther } from 'viem';

export function BalanceCard() {
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });

  return (
    <Card className="px-5 py-3 bg-gradient-to-r from-primary-500 to-emerald-600 text-white shadow-lg border-0 min-w-[200px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium opacity-90 mb-1 flex items-center gap-1">
            <Wallet className="w-3 h-3" /> Saldo MATIC
          </p>
          <p className="text-xl font-bold tracking-tight">
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : balance ? (
              `${parseFloat(formatEther(balance.value)).toFixed(4)}`
            ) : (
              '0.0000'
            )}
          </p>
        </div>
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}
