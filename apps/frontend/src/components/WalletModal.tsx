'use client';

import { X, Copy, ExternalLink, ArrowUpRight, ArrowDownLeft, ShieldCheck, RefreshCcw, ArrowLeft, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useAccount, useBalance } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

type ModalView = 'main' | 'send' | 'receive';

export function WalletModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { address } = useAccount();
    const { data: balance, isLoading, refetch } = useBalance({ address });
    const { user, sendTransaction } = usePrivy();
    const [copied, setCopied] = useState(false);
    const [view, setView] = useState<ModalView>('main');

    // Form states
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [isSending, setIsSending] = useState(false);

    if (!isOpen) return null;

    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipient || !amount) return;

        setIsSending(true);
        try {
            await sendTransaction({
                to: recipient as `0x${string}`,
                value: parseEther(amount),
            });
            setView('main');
            setRecipient('');
            setAmount('');
        } catch (error) {
            console.error("Erro ao enviar transação:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleClose = () => {
        setView('main');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <Card className="max-w-md w-full bg-white rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300 overflow-hidden border-0">
                {/* Header Decoração */}
                <div className="h-28 bg-gradient-to-br from-emerald-600 to-primary-700 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {view !== 'main' && (
                        <button
                            onClick={() => setView('main')}
                            className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors z-10 flex items-center gap-1 text-xs font-bold"
                        >
                            <ArrowLeft className="w-4 h-4" /> Voltar
                        </button>
                    )}

                    <div className="absolute -bottom-10 left-8">
                        <div className="w-20 h-20 rounded-2xl bg-white p-1 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-2xl">
                                {user?.email?.address
                                    ? user.email.address.slice(0, 2).toUpperCase()
                                    : address
                                        ? address.slice(2, 4).toUpperCase()
                                        : 'DL'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-14 p-8">
                    {view === 'main' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Gerenciar Carteira</h3>
                                    <p className="text-sm text-slate-500">Seu saldo e ativos digitais</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => refetch()} className="h-8 w-8 p-0 rounded-lg">
                                        <RefreshCcw className={`w-4 h-4 text-slate-400 ${isLoading ? 'animate-spin' : ''}`} />
                                    </Button>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 group">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Endereço</span>
                                    <div className="flex gap-1">
                                        <button onClick={copyAddress} className="p-1.5 hover:bg-white rounded-md transition-colors text-slate-400 hover:text-primary-600">
                                            {copied ? <div className="text-[10px] font-bold text-emerald-500">Copiado!</div> : <Copy className="w-4 h-4" />}
                                        </button>
                                        <a
                                            href={`https://amoy.polygonscan.com/address/${address}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 hover:bg-white rounded-md transition-colors text-slate-400 hover:text-primary-600"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                <p className="font-mono text-sm text-slate-700 mt-1 break-all">
                                    {address}
                                </p>
                            </div>

                            {/* Balance Section */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Saldo Atual</span>
                                    <p className="text-2xl font-black text-emerald-900 mt-1">
                                        {isLoading ? '...' : parseFloat(formatEther(balance?.value || 0n)).toFixed(4)} <span className="text-sm font-bold opacity-60">ETH</span>
                                    </p>
                                </div>
                                <div className="bg-primary-50 rounded-2xl p-5 border border-primary-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-primary-700">Rede</p>
                                        <p className="text-sm font-bold text-primary-900 flex items-center gap-1 justify-center mt-1">
                                            <ShieldCheck className="w-3 h-3" /> Polygon
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setView('send')}
                                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white h-12 rounded-xl font-bold"
                                    >
                                        <ArrowUpRight className="w-4 h-4 mr-2" /> Enviar
                                    </Button>
                                    <Button
                                        onClick={() => setView('receive')}
                                        variant="outline"
                                        className="flex-1 border-slate-200 h-12 rounded-xl font-bold"
                                    >
                                        <ArrowDownLeft className="w-4 h-4 mr-2" /> Receber
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'receive' && (
                        <div className="animate-in fade-in slide-in-from-right-2 duration-300 text-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Receber Depósito</h3>
                            <p className="text-sm text-slate-500 mb-8">Escaneie o código ou copie o endereço</p>

                            <div className="bg-slate-50 p-6 rounded-3xl inline-block border-2 border-slate-100 mb-8">
                                {/* QR Code Placeholder (Using a standard QR API) */}
                                <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`}
                                        alt="QR Code Carteira"
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={copyAddress}
                                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all flex items-center justify-between group"
                            >
                                <div className="text-left overflow-hidden">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Seu Endereço de Carteira</p>
                                    <p className="text-sm font-mono text-slate-700 truncate pr-4">{address}</p>
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-primary-600">
                                    {copied ? <span className="text-xs font-bold text-emerald-500">Ok!</span> : <Copy className="w-4 h-4" />}
                                </div>
                            </button>
                        </div>
                    )}

                    {view === 'send' && (
                        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Enviar Fundos</h3>
                            <p className="text-sm text-slate-500 mb-8">Transfira ativos para outra carteira</p>

                            <form onSubmit={handleSend} className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Carteira de Destino</label>
                                    <input
                                        type="text"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        placeholder="0x..."
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-primary-500 focus:outline-none font-mono text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Valor (ETH)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.0001"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-primary-500 focus:outline-none font-bold text-lg"
                                            required
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">ETH</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 flex justify-between">
                                        <span>Disponível: {parseFloat(formatEther(balance?.value || 0n)).toFixed(4)} ETH</span>
                                        <button
                                            type="button"
                                            onClick={() => setAmount(formatEther(balance?.value || 0n))}
                                            className="text-primary-600 font-bold hover:underline"
                                        >
                                            MÁX
                                        </button>
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary-600/20"
                                >
                                    {isSending ? (
                                        <RefreshCcw className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" /> Confirmar Envio
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">
                            Segurança Nível Bancário • Criptografado
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
