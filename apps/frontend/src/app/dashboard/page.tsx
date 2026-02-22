'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BalanceCard } from '@/components/BalanceCard';
import { PrescriptionCard } from '@/components/PrescriptionCard';
import { PrescriptionGridSkeleton } from '@/components/PrescriptionGridSkeleton';
import { PrivyLoginButton } from '@/components/PrivyLoginButton';
import { FileText, ShoppingCart, History, Plus } from 'lucide-react';
import { parseEther } from 'viem';
import contractsConfig from '@/abis/contracts-config.json';

export default function Dashboard() {
  const { user, ready, authenticated } = usePrivy();
  const { address } = useAccount();

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );

  if (!authenticated || !user) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Acesso Restrito</h1>
            <p className="text-gray-500 mb-8 text-center max-w-md">Você precisa conectar sua carteira para acessar o painel do paciente.</p>
            <PrivyLoginButton />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30">
      {/* Header Dashboard */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-primary-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <Avatar className="w-12 h-12 border-2 border-primary-200 shadow-sm">
                {/* Use user.linkedAccounts to find email or google image if available */}
                <AvatarImage src={user.linkedAccounts.find((a: any) => a.type === 'google_oauth')?.picture || undefined} />
                <AvatarFallback className="bg-primary-100 text-primary-700 font-bold">
                  {address ? address.slice(2, 4).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-primary-900">
                  Olá, {user.google?.name || user.email?.address?.split('@')[0] || 'Paciente'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded-md inline-block">
                  {user.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 'Sem carteira'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
              <BalanceCard />
              <div className="hidden sm:block">
                <PrivyLoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Tabs defaultValue="minhas-prescricoes" className="w-full space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white border border-primary-100 rounded-xl shadow-sm">
            <TabsTrigger value="minhas-prescricoes" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white py-3 rounded-lg transition-all duration-300">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Minhas Prescrições</span>
              <span className="sm:hidden">Prescrições</span>
            </TabsTrigger>
            <TabsTrigger value="comprar" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white py-3 rounded-lg transition-all duration-300">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Comprar Produtos</span>
              <span className="sm:hidden">Loja</span>
            </TabsTrigger>
            <TabsTrigger value="historico" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white py-3 rounded-lg transition-all duration-300">
              <History className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Histórico</span>
              <span className="sm:hidden">Histórico</span>
            </TabsTrigger>
          </TabsList>

          {/* Minhas Prescrições */}
          <TabsContent value="minhas-prescricoes" className="mt-8 outline-none">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Suas Receitas Digitais</h3>
                <MintPrescriptionButton address={address} />
            </div>
            {/* Mock Data for UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               <PrescriptionCard tokenId={1} doctor="Silva" date={new Date().toISOString()} status="ativa" coOwners={2} />
               <PrescriptionCard tokenId={2} doctor="Santos" date="2023-12-01" status="usada" coOwners={1} />
               <PrescriptionGridSkeleton />
            </div>
          </TabsContent>

          {/* Marketplace */}
          <TabsContent value="comprar" className="mt-8 outline-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Farmácia Credenciada</h3>
            <MarketplaceGrid />
          </TabsContent>

           {/* Histórico */}
           <TabsContent value="historico" className="mt-8 outline-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Seu histórico de transações aparecerá aqui.</p>
                </div>
           </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MintPrescriptionButton({ address }: { address?: `0x${string}` }) {
    const { writeContract, isPending } = useWriteContract();

    const mint = () => {
      if (!address) return;
      writeContract({
        address: contractsConfig.MedicalNFT.address as `0x${string}`,
        abi: contractsConfig.MedicalNFT.abi,
        functionName: 'mintMedicalRecord',
        args: [address, "ipfs://QmDemo", []],
      });
    };

    return (
      <Button onClick={mint} disabled={isPending} size="sm" className="bg-primary-600 hover:bg-primary-700">
        <Plus className="w-4 h-4 mr-1" />
        Nova Prescrição (Demo)
      </Button>
    );
}

function MarketplaceGrid() {
    const { writeContract, isPending } = useWriteContract();

    const buyProduct = (price: string) => {
        writeContract({
          address: contractsConfig.EscrowMarketplace.address as `0x${string}`,
          abi: contractsConfig.EscrowMarketplace.abi,
          functionName: 'createOrder',
          args: [0n, 1n, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"], // Using treasury address as pharmacy for demo
          value: parseEther(price),
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard title="Óleo CBD Full Spectrum 5%" price="0.01" onBuy={() => buyProduct("0.01")} loading={isPending} />
            <ProductCard title="Gummies CBD 300mg" price="0.005" onBuy={() => buyProduct("0.005")} loading={isPending} />
            <ProductCard title="Creme Tópico Canabidiol" price="0.008" onBuy={() => buyProduct("0.008")} loading={isPending} />
        </div>
    );
}

function ProductCard({ title, price, onBuy, loading }: { title: string, price: string, onBuy: () => void, loading: boolean }) {
    return (
      <Card className="hover:shadow-lg transition-shadow border-primary-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">{title}</CardTitle>
          <CardDescription className="text-primary-600 font-medium">Certificado ANVISA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div>
                <p className="text-xs text-gray-500">Preço</p>
                <span className="font-bold text-2xl text-gray-900">{price} ETH</span>
            </div>
            <Button onClick={onBuy} disabled={loading} className="bg-primary-600 hover:bg-primary-700">
              Comprar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
