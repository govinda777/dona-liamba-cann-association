'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Need to add Tabs component
import contractsConfig from '@/abis/contracts-config.json';
import { parseEther } from 'viem';

// Ensure you have these components or install them:
// pnpm dlx shadcn-ui@latest add tabs

export function Dashboard() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("prescriptions");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Tabs defaultValue="prescriptions" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="prescriptions">Minhas Prescrições</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions">
          <MyPrescriptions address={address} />
        </TabsContent>

        <TabsContent value="marketplace">
          <Marketplace />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MyPrescriptions({ address }: { address?: `0x${string}` }) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // In a real app, useReadContract to fetch owned tokens.
  // For MVP, we allow minting a new one.

  const mintPrescription = () => {
    if (!address) return;
    writeContract({
      address: contractsConfig.MedicalNFT.address as `0x${string}`,
      abi: contractsConfig.MedicalNFT.abi,
      functionName: 'mintMedicalRecord',
      args: [address, "ipfs://QmDemoHash", []],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carteira de Prescrições</CardTitle>
        <CardDescription>Gerencie seus NFTs médicos Soulbound.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="p-4 border rounded-md bg-muted/50">
            <p className="text-sm text-muted-foreground mb-2">Nenhuma prescrição encontrada (Demo: Mint uma agora)</p>
          </div>

          <Button onClick={mintPrescription} disabled={isPending || isConfirming}>
            {isPending ? 'Emitindo...' : 'Emitir Nova Prescrição (Demo)'}
          </Button>

          {hash && <div className="text-xs text-muted-foreground break-all mt-2">Tx: {hash}</div>}
          {isConfirming && <div className="text-yellow-500 text-sm">Confirmando transação...</div>}
          {isConfirmed && <div className="text-green-500 text-sm">Prescrição emitida com sucesso!</div>}
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

function Marketplace() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const buyProduct = (productId: number, price: string) => {
    // Demo: Prescription ID 0 assumed. In prod, select from owned NFTs.
    writeContract({
      address: contractsConfig.EscrowMarketplace.address as `0x${string}`,
      abi: contractsConfig.EscrowMarketplace.abi,
      functionName: 'createOrder',
      args: [0n, 1n, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"], // Treasury as Pharmacy for demo
      value: parseEther(price),
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ProductCard
        title="Óleo CBD Full Spectrum 10%"
        price="0.01"
        onBuy={() => buyProduct(1, "0.01")}
        loading={isPending || isConfirming}
      />
      <ProductCard
        title="Flores CBD Premium 5g"
        price="0.02"
        onBuy={() => buyProduct(2, "0.02")}
        loading={isPending || isConfirming}
      />
      {/* Transaction Feedback */}
      {(hash || isConfirmed) && (
        <Card className="col-span-full border-blue-500">
          <CardContent className="pt-6">
             {hash && <p className="text-xs text-muted-foreground">Order Tx: {hash}</p>}
             {isConfirmed && <p className="text-green-600 font-bold">Compra realizada! Aguardando confirmação da farmácia.</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ProductCard({ title, price, onBuy, loading }: { title: string, price: string, onBuy: () => void, loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Fornecedor Certificado ANVISA</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-xl">{price} ETH</span>
        </div>
        <Button className="w-full" onClick={onBuy} disabled={loading}>
          Comprar com Escrow
        </Button>
      </CardContent>
    </Card>
  );
}
