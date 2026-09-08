"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Briefcase, UploadCloud, FileText, CheckCircle2, ShieldCheck, Lock, Binary, Key, Boxes, Leaf } from 'lucide-react'
import { Header } from '@/components/Header'
import { ModeToggle } from '@/components/ThemeToggle'

export default function ImporterDashboard() {
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
                  <Binary className="w-8 h-8" />
                  [SYS_LOG] B2B Gateway & Oracle
                </h1>
                <p className="text-sombra-text mt-2 text-sm">Regulatory Inviolability via Cryptographic Attestations</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-sombra-blockchain">Unlock NFT: ACTIVE (Exp: Dec 2026)</p>
                <p className="text-xs text-sombra-electric">Status: AUTHORIZED_SUPPLIER</p>
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">UNLOCK_PROTOCOL</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Token-Gating Middleware
                </h3>
                <div className="space-y-3 text-sm border-l-2 border-sombra-surface pl-4">
                  <p className="text-sombra-text opacity-70">{'>'} Checking wallet: 0x9f...a1</p>
                  <p className="text-sombra-matrix">{'>'} Contract 0xUnlock... called.</p>
                  <div className="bg-sombra-surface/20 p-2 rounded">
                     <p className="text-sombra-electric">hasValidKey(0x9f...a1) == true</p>
                  </div>
                  <p className="text-sombra-text">{'>'} Panel Access: GRANTED</p>
                  <p className="text-sombra-blockchain mt-2">{'>'} Annuity paid via Pix, minted time-based NFT automatically.</p>
                </div>
              </div>

              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">EAS_PROTOCOL</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5" /> CoA Cryptographic Attestation
                </h3>
                <div className="space-y-3 text-sm bg-sombra-surface/30 p-4 rounded-md">
                  <p className="text-sombra-text opacity-70">{'>'} File Uploaded: Lote_XYZ_CoA.pdf</p>
                  <p className="text-sombra-matrix">{'>'} Generating PDF Hash (SHA-256)...</p>
                  <p className="text-xs text-sombra-text opacity-50 break-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</p>
                  <p className="text-sombra-electric mt-2">{'>'} Anchoring to Ethereum Attestation Service (EIP-712)</p>
                  <div className="border border-sombra-surface p-2 text-xs text-sombra-text/80 rounded mt-2">
                     Attestation UID: 0x5a1b...
                     Schema: IS_VALID_COA_ANVISA
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-sombra-surface bg-sombra-background p-6 rounded-lg">
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Regulatory Immutability Flow (Anvisa)
                </h3>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-sombra-surface/20 p-4 rounded-md">
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Supplier</p>
                      <p className="text-xs text-sombra-matrix">Uploads PDF</p>
                   </div>
                   <div className="text-sombra-electric">{'==>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Smart Contract</p>
                      <p className="text-xs text-sombra-blockchain">Mints EAS Proof</p>
                   </div>
                   <div className="text-sombra-electric">{'==>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Doctor/Anvisa</p>
                      <p className="text-xs text-sombra-matrix">Verifies Math Proof</p>
                   </div>
                   <div className="text-sombra-electric">{'==>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Result</p>
                      <p className="text-xs text-sombra-blockchain text-red-400">Adulteration IMPOSSIBLE</p>
                   </div>
                </div>
            </div>
          </div>
        ) : (
          // ================= LUZ (UX HUMANIZADA) =================
          <div className="space-y-8 font-inter fade-in-up">
            <header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-4xl font-serif font-bold text-luz-primary mb-2">Vitrine B2B - Fornecedor</h1>
                <p className="text-luz-text opacity-80 text-lg">Gerencie seu catálogo e atestados laboratoriais com segurança.</p>
              </div>
              <div className="flex items-center gap-3">
                 <div className="bg-luz-surface px-4 py-2 rounded-xl border border-luz-earth/30 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-luz-primary" />
                    <span className="font-bold text-sm">Pharma CBD Imports</span>
                 </div>
              </div>
            </header>

            <div className="grid md:grid-cols-12 gap-6">

              {/* Left Column: Upload CoA */}
              <div className="md:col-span-5 space-y-6">
                 <div className="bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20 card-hover">
                   <h2 className="text-xl font-serif font-bold text-luz-primary mb-2 flex items-center gap-2">
                     <UploadCloud className="text-luz-sage" /> Upload de Certificado (CoA)
                   </h2>
                   <p className="text-sm text-luz-text/70 mb-6">Arraste o PDF do laboratório para gerar prova de pureza inalterável para a Anvisa e médicos.</p>

                   <div className="border-2 border-dashed border-luz-earth/50 rounded-xl p-10 text-center hover:bg-luz-background hover:border-luz-primary transition-colors cursor-pointer group">
                      <div className="w-16 h-16 bg-luz-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                         <FileText className="w-8 h-8 text-luz-primary" />
                      </div>
                      <p className="font-bold text-luz-primary mb-1">Clique ou arraste o arquivo PDF</p>
                      <p className="text-xs text-luz-text/60">Tamanho máximo: 10MB</p>
                   </div>

                   <div className="mt-6 flex items-center gap-2 text-xs text-luz-text/60 bg-luz-background p-3 rounded-lg border border-luz-earth/20">
                      <ShieldCheck className="w-4 h-4 text-luz-sage shrink-0" />
                      <span>Seu laudo será criptografado e registrado para garantir que não sofreu adulteração.</span>
                   </div>
                 </div>
              </div>

              {/* Right Column: Catalog */}
              <div className="md:col-span-7 bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20 card-hover">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-luz-primary flex items-center gap-2">
                    <Boxes className="text-luz-sage" /> Catálogo Ativo
                  </h2>
                  <button className="bg-luz-primary text-white font-bold py-2 px-4 rounded-lg text-sm shadow-md">
                    Adicionar Produto
                  </button>
                </div>

                <div className="space-y-4">
                   {[
                     { name: "Óleo CBD Isolado 10%", lot: "Lote: IMP-2026-A", status: "Validado" },
                     { name: "Extrato Full Spectrum 5%", lot: "Lote: IMP-2026-B", status: "Validado" },
                     { name: "Gomas CBG + CBN", lot: "Lote: IMP-2026-C", status: "Pendente CoA" }
                   ].map((prod, i) => (
                     <div key={i} className="flex flex-col sm:flex-row justify-between items-center p-4 border border-luz-earth/30 rounded-xl bg-luz-background">
                        <div className="flex items-center gap-4 w-full sm:w-auto mb-3 sm:mb-0">
                           <div className="w-10 h-10 bg-luz-earth/20 rounded-lg flex items-center justify-center shrink-0">
                             <Leaf className="w-5 h-5 text-luz-sage" />
                           </div>
                           <div>
                             <p className="font-bold text-sm">{prod.name}</p>
                             <p className="text-xs text-luz-text/60">{prod.lot}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                           <span className={`text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1 ${
                             prod.status === 'Validado' ? 'bg-mint-100 text-luz-primary' : 'bg-amber-100 text-amber-700'
                           }`}>
                             {prod.status === 'Validado' && <CheckCircle2 className="w-3 h-3" />}
                             {prod.status}
                           </span>
                           <button className="text-luz-primary text-sm font-bold hover:underline">Editar</button>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-8 pt-6 border-t border-luz-earth/20 flex justify-between items-center">
                   <div>
                     <p className="font-bold text-sm">Anuidade B2B</p>
                     <p className="text-xs text-luz-text/60">Válida até 31/12/2026</p>
                   </div>
                   <span className="text-xs font-bold bg-mint-100 text-luz-primary px-3 py-1 rounded-full">Ativo</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  )
}
