"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Building2, ClipboardCheck, ThermometerSun, Leaf, LayoutDashboard, Fingerprint, Coins, Vote, Activity, PackageCheck } from 'lucide-react'
import { Header } from '@/components/Header'
import { ModeToggle } from '@/components/ThemeToggle'

export default function AssociationDashboard() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-sombra-background text-sombra-text' : 'bg-luz-background text-luz-text'}`}>
      <Header />
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>

      <main className="max-w-6xl mx-auto p-6 pt-24 transition-all duration-500">
        {isDark ? (
          // ================= SOMBRA (WEB3/TECH) =================
          <div className="space-y-8 font-mono">
            <header className="border-b border-sombra-matrix pb-4 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl text-sombra-matrix flex items-center gap-3">
                  <LayoutDashboard className="w-8 h-8" />
                  [SYS_LOG] DAO Gov & Treasury
                </h1>
                <p className="text-sombra-text mt-2 text-sm">Non-Profit Civil Association (Arts. 53-61 CC) On-Chain Operation</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-sombra-blockchain">Safe Address: 0x8f22...c4</p>
                <p className="text-xs text-sombra-electric">Guild: Verified (Proof of Humanity)</p>
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">GNOSIS_SAFE</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Coins className="w-5 h-5" /> Multi-sig Treasury
                </h3>
                <div className="space-y-3 text-sm border-l-2 border-sombra-surface pl-4">
                  <p className="text-sombra-text opacity-70">{'>'} Policy: 2-of-3 Signatures Required</p>
                  <p className="text-sombra-matrix">{'>'} Tx Proposed: Reinvest surplus in IoT setup (0.5 ETH)</p>
                  <div className="flex gap-2 items-center mt-2">
                     <span className="bg-sombra-matrix/20 text-sombra-matrix px-2 py-1 text-xs rounded">Sig 1: 0xa1..b2 (✓)</span>
                     <span className="bg-sombra-matrix/20 text-sombra-matrix px-2 py-1 text-xs rounded">Sig 2: 0xc3..d4 (✓)</span>
                     <span className="bg-sombra-surface text-sombra-text px-2 py-1 text-xs rounded">Sig 3: 0xe5..f6 (Pending)</span>
                  </div>
                  <p className="text-sombra-blockchain mt-2">{'>'} Status: Ready for Execution</p>
                </div>
              </div>

              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">SNAPSHOT_VOTING</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Vote className="w-5 h-5" /> Gasless Governance
                </h3>
                <div className="space-y-3 text-sm bg-sombra-surface/30 p-4 rounded-md">
                  <p className="text-sombra-text opacity-70">{'>'} Prop 42: Cultivation Strategy Q4 2026</p>
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs">
                        <span className="text-sombra-matrix">For: 450,000 vTokens</span>
                        <span className="text-sombra-matrix">85%</span>
                     </div>
                     <div className="w-full bg-sombra-surface h-1 rounded overflow-hidden">
                        <div className="bg-sombra-matrix h-full" style={{ width: '85%' }}></div>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-sombra-text">Against: 79,411 vTokens</span>
                        <span className="text-sombra-text">15%</span>
                     </div>
                  </div>
                  <p className="text-sombra-electric mt-4">{'>'} Weighted vote granted via Gitcoin Passport.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-sombra-surface bg-sombra-background p-6 rounded-lg">
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Fingerprint className="w-5 h-5" /> Proof of Humanity Check (Anti-Sybil)
                </h3>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-sombra-surface/20 p-4 rounded-md">
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">User Wallet Connects</p>
                      <p className="text-xs text-sombra-matrix">0xUser...</p>
                   </div>
                   <div className="text-sombra-electric">{'===>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Guild.xyz / Gitcoin</p>
                      <p className="text-xs text-sombra-blockchain">Stamps &gt; 20</p>
                   </div>
                   <div className="text-sombra-electric">{'===>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Voting Power</p>
                      <p className="text-xs text-sombra-matrix">Enabled</p>
                   </div>
                </div>
            </div>
          </div>
        ) : (
          // ================= LUZ (UX HUMANIZADA) =================
          <div className="space-y-8 font-inter fade-in-up">
            <header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-4xl font-serif font-bold text-luz-primary mb-2">Centro de Controle - Associação</h1>
                <p className="text-luz-text opacity-80 text-lg">Monitoramento de Cultivo, Laboratório e Membros.</p>
              </div>
              <div className="flex items-center gap-3">
                 <div className="bg-luz-surface px-4 py-2 rounded-xl border border-luz-earth/30 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-luz-primary" />
                    <span className="font-bold text-sm">Associação Vida Verde</span>
                 </div>
              </div>
            </header>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
               <div className="bg-luz-surface p-6 rounded-2xl shadow-sm border border-luz-earth/20 card-hover">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-mint-100 rounded-lg text-luz-primary">
                        <ClipboardCheck className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-bold bg-mint-100 text-luz-primary px-2 py-1 rounded-full">Anvisa / HC</span>
                  </div>
                  <h3 className="text-2xl font-bold">12 Docs</h3>
                  <p className="text-sm text-luz-text/70 mt-1">Aguardando validação regulatória</p>
               </div>

               <div className="bg-luz-surface p-6 rounded-2xl shadow-sm border border-luz-earth/20 card-hover">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
                        <ThermometerSun className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-bold bg-amber-100 text-amber-600 px-2 py-1 rounded-full">Alerta IoT</span>
                  </div>
                  <h3 className="text-2xl font-bold">Lote B4</h3>
                  <p className="text-sm text-luz-text/70 mt-1">Umidade alta (Estufa 2) - 72%</p>
               </div>

               <div className="bg-luz-surface p-6 rounded-2xl shadow-sm border border-luz-earth/20 card-hover">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        <PackageCheck className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Kanban</span>
                  </div>
                  <h3 className="text-2xl font-bold">3 Lotes</h3>
                  <p className="text-sm text-luz-text/70 mt-1">Em análise laboratorial</p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20">
                <h2 className="text-2xl font-serif font-bold text-luz-primary flex items-center gap-2 mb-6">
                  <Leaf className="text-luz-sage" /> Telemetria Plantio & Cura
                </h2>

                <div className="space-y-4">
                   {[
                     { name: "Estufa 1 (Indoor)", strain: "Harlequin (Alta CBD)", phase: "Floração (Sem 4)", temp: "24°C", hmd: "55%" },
                     { name: "Estufa 2 (Indoor)", strain: "Sour Diesel", phase: "Vegetativo", temp: "26°C", hmd: "72%", alert: true },
                   ].map((estufa, i) => (
                     <div key={i} className={`p-4 border rounded-xl bg-luz-background ${estufa.alert ? 'border-amber-300' : 'border-luz-earth/30'}`}>
                        <div className="flex justify-between items-center mb-2">
                           <h3 className="font-bold">{estufa.name}</h3>
                           {estufa.alert && <span className="text-xs text-amber-600 font-bold flex items-center gap-1"><Activity className="w-3 h-3"/> Alerta</span>}
                        </div>
                        <p className="text-sm text-luz-text/80">Genética: {estufa.strain}</p>
                        <p className="text-sm text-luz-text/80">Fase Fenológica: {estufa.phase}</p>
                        <div className="flex gap-4 mt-3 pt-3 border-t border-luz-earth/20">
                           <div className="text-xs font-medium"><span className="text-luz-text/50">Temp:</span> {estufa.temp}</div>
                           <div className="text-xs font-medium"><span className="text-luz-text/50">Umid:</span> <span className={estufa.alert ? 'text-amber-600' : ''}>{estufa.hmd}</span></div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20">
                <div className="flex justify-between items-center mb-6">
                   <h2 className="text-2xl font-serif font-bold text-luz-primary flex items-center gap-2">
                     <Vote className="text-luz-sage" /> Fórum Comunitário
                   </h2>
                   <button className="text-sm font-bold text-luz-primary hover:underline">Ver Todos</button>
                </div>

                <div className="space-y-4">
                   <div className="p-4 border border-luz-earth/30 rounded-xl bg-luz-background cursor-pointer hover:border-luz-primary transition-colors">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-sm">Proposta: Compra de novas luzes LED (Estufa 3)</h3>
                         <span className="text-[10px] font-bold bg-mint-100 text-luz-primary px-2 py-1 rounded-full whitespace-nowrap">Em Votação</span>
                      </div>
                      <p className="text-xs text-luz-text/60 line-clamp-2">A tesouraria propõe a substituição das lâmpadas HPS por painéis LED para reduzir custos energéticos.</p>
                      <div className="mt-4 flex gap-2">
                         <button className="flex-1 bg-luz-primary text-white text-xs font-bold py-2 rounded">Aprovar</button>
                         <button className="flex-1 border border-luz-earth/50 text-luz-text text-xs font-bold py-2 rounded">Rejeitar</button>
                      </div>
                   </div>

                   <div className="p-4 border border-luz-earth/30 rounded-xl bg-luz-background opacity-70">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-sm">Atualização do Termo Associativo (2026)</h3>
                         <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full whitespace-nowrap">Concluído</span>
                      </div>
                      <p className="text-xs text-luz-text/60">Aprovado com 85% dos votos.</p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  )
}
