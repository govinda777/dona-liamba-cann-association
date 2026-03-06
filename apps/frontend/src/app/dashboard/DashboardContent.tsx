'use client';

import { useState, useEffect } from 'react';
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
import { FileText, ShoppingCart, History, Plus, Loader2 } from 'lucide-react';
import { parseEther } from 'viem';
import contractsConfig from '@/abis/contracts-config.json';

export default function Dashboard() {
  const { user, ready, authenticated } = usePrivy();
  const { address } = useAccount();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [txHistory, setTxHistory] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (authenticated && address) {
      Promise.all([
        fetch(`/api/prescriptions?patientAddress=${address}`).then(res => res.json()),
        fetch(`/api/transactions?userAddress=${address}`).then(res => res.json())
      ]).then(([prescData, txData]) => {
        setPrescriptions(Array.isArray(prescData) ? prescData : []);
        setTxHistory(Array.isArray(txData) ? txData : []);
        setLoadingData(false);
      }).catch(err => {
        console.error("Error loading dashboard data", err);
        setLoadingData(false);
      });
    } else if (ready) {
      setLoadingData(false);
    }
  }, [authenticated, address, ready]);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const googleAccount = user?.linkedAccounts.find((a: any) => a.type === 'google_oauth') as any;
  const displayName = googleAccount?.name || user?.email?.address?.split('@')[0] || 'Paciente';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30">
      {/* Header Dashboard */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-primary-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <Avatar className="w-12 h-12 border-2 border-primary-200 shadow-sm">
                {/* Use user.linkedAccounts to find email or google image if available */}
                <AvatarImage src={googleAccount?.picture || undefined} />
                <AvatarFallback className="bg-primary-100 text-primary-700 font-bold">
                  {user?.email?.address
                    ? user.email.address.slice(0, 2).toUpperCase()
                    : address
                      ? address.slice(2, 4).toUpperCase()
                      : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-primary-900">
                  Olá, {displayName}
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
                <MintPrescriptionButton address={address} onMint={() => {
                  // Refresh data
                  fetch(`/api/prescriptions?patientAddress=${address}`)
                    .then(res => res.json())
                    .then(data => setPrescriptions(data));
                }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {prescriptions.map((p: any) => (
                 <PrescriptionCard key={p.id} tokenId={p.tokenId} doctor="Especialista" date={p.createdAt} status={p.status} coOwners={1} />
               ))}
               {prescriptions.length === 0 && !loadingData && (
                 <p className="col-span-full text-center text-gray-500 py-12">Nenhuma prescrição encontrada.</p>
               )}
               {loadingData && <PrescriptionGridSkeleton />}
            </div>
          </TabsContent>

          {/* Marketplace */}
          <TabsContent value="comprar" className="mt-8 outline-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Farmácia Credenciada</h3>
            <MarketplaceGrid address={address} onPurchase={() => {
               fetch(`/api/transactions?userAddress=${address}`)
               .then(res => res.json())
               .then(data => setTxHistory(data));
            }} />
          </TabsContent>

           {/* Histórico */}
           <TabsContent value="historico" className="mt-8 outline-none">
                <div className="space-y-4">
                  {txHistory.map((tx: any) => (
                    <Card key={tx.id} className="p-4 flex justify-between items-center">
                       <div>
                          <p className="font-bold text-gray-800">{tx.type === 'purchase' ? 'Compra de Produto' : 'Nova Prescricao'}</p>
                          <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                       </div>
                       <div className="text-right">
                          <p className="font-mono text-sm text-primary-600">{tx.amount ? `${tx.amount} ETH` : '-'}</p>
                          <p className="text-xs text-gray-400">{tx.details}</p>
                       </div>
                    </Card>
                  ))}
                  {txHistory.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                        <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Seu histórico de transações aparecerá aqui.</p>
                    </div>
                  )}
                </div>
           </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MintPrescriptionButton({ address, onMint }: { address?: `0x${string}`, onMint: () => void }) {
    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    useEffect(() => {
      if (isSuccess && address) {
        fetch('/api/prescriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: Math.floor(Math.random() * 1000),
            patientAddress: address,
            doctorAddress: '0x0000000000000000000000000000000000000000',
            metadataUri: 'ipfs://demo'
          })
        }).then(() => {
          fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userAddress: address,
              type: 'mint',
              details: 'Nova Prescricao Gerada'
            })
          });
          onMint();
        });
      }
    }, [isSuccess, address, onMint]);

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
      <Button onClick={mint} disabled={isPending || isConfirming} size="sm" className="bg-primary-600 hover:bg-primary-700">
        {(isPending || isConfirming) ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-1" />}
        Nova Prescrição (Demo)
      </Button>
    );
}

function MarketplaceGrid({ address, onPurchase }: { address?: string, onPurchase: () => void }) {
    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
    const [lastBought, setLastBought] = useState<{title: string, price: string} | null>(null);

    useEffect(() => {
      if (isSuccess && address && lastBought) {
        fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userAddress: address,
            type: 'purchase',
            details: lastBought.title,
            amount: lastBought.price
          })
        }).then(() => onPurchase());
      }
    }, [isSuccess, address, lastBought, onPurchase]);

    const buyProduct = (title: string, price: string) => {
        setLastBought({ title, price });
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
            <ProductCard title="Óleo CBD Full Spectrum 5%" price="0.01" onBuy={() => buyProduct("Óleo CBD Full Spectrum 5%", "0.01")} loading={isPending || isConfirming} />
            <ProductCard title="Gummies CBD 300mg" price="0.005" onBuy={() => buyProduct("Gummies CBD 300mg", "0.005")} loading={isPending || isConfirming} />
            <ProductCard title="Creme Tópico Canabidiol" price="0.008" onBuy={() => buyProduct("Creme Tópico Canabidiol", "0.008")} loading={isPending || isConfirming} />
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
