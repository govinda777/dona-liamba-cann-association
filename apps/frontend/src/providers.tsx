'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { localhost } from 'viem/chains';
import { http } from 'wagmi';
import React from 'react';

// Define the chain for Privy
const chains = [localhost];

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmaqqs10k00onl20md0g7c7bg"
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'light',
          accentColor: '#22c55e', // Medical Green
          logo: undefined, // Add logo URL here if available
        },
        supportedChains: [localhost],
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
