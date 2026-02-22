'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MedicalNFTABI from '@/abis/MedicalNFT.json';
import EscrowMarketplaceABI from '@/abis/EscrowMarketplace.json';
import { parseEther } from 'viem';

// Hardcoded addresses from deploy
const MEDICAL_NFT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const ESCROW_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

export default function Home() {
  const { login, authenticated, ready } = usePrivy();
  const { address, isConnected } = useAccount();

  if (!ready) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dona Liamba Cann Association</h1>
        {authenticated ? (
          <div className="flex items-center gap-2">
             <span className="text-sm text-muted-foreground">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
             <Button variant="outline" onClick={() => login()}>Wallet Info</Button>
          </div>
        ) : (
          <Button onClick={login}>Login / Sign Up</Button>
        )}
      </header>

      {authenticated && isConnected ? (
        <Dashboard />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl mb-4">Bem-vindo à plataforma Web3 de Cannabis Medicinal</h2>
          <p className="mb-8 text-muted-foreground">Conecte-se para acessar prescrições, produtos e comunidade.</p>
          <Button size="lg" onClick={login}>Entrar com Email</Button>
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const mintPrescription = () => {
    writeContract({
      address: MEDICAL_NFT_ADDRESS,
      abi: MedicalNFTABI.abi,
      functionName: 'mintMedicalRecord',
      args: [address, "ipfs://QmHashOfData", []],
    });
  };

  const buyProduct = () => {
     // Hardcoded prescription ID 0 for demo (assumes user minted first one)
     // In a real app, we would fetch the user's token IDs first
     writeContract({
       address: ESCROW_ADDRESS,
       abi: EscrowMarketplaceABI.abi,
       functionName: 'createOrder',
       args: [0n, 1n, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"], // Pharmacy address (using Treasury/Account1 for demo)
       value: parseEther("0.1"),
     });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Minhas Prescrições (NFTs)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Mint your medical prescription as a Soulbound NFT.
          </p>
          <Button onClick={mintPrescription} disabled={isPending || isConfirming}>
            {isPending ? 'Minting...' : 'Emitir Prescrição Demo (Mint NFT)'}
          </Button>
          {hash && <div className="mt-2 text-xs text-muted-foreground break-all">Tx Hash: {hash}</div>}
          {isConfirming && <div className="text-yellow-500 mt-2">Confirming...</div>}
          {isConfirmed && <div className="text-green-500 mt-2">Confirmed!</div>}
          {error && <div className="text-red-500 mt-2 text-xs">{error.message}</div>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
           <CardTitle>Marketplace Demo</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="mb-4 text-sm">Produto: Óleo CBD Full Spectrum (0.1 ETH)</p>
           <Button onClick={buyProduct}>Comprar com Escrow</Button>
        </CardContent>
      </Card>
    </div>
  );
}
