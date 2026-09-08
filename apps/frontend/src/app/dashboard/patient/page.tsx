"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Calendar, FileText, Lock, CheckCircle, Smartphone, CreditCard, Shield, Database, Activity, Code, Key } from 'lucide-react'
import { Header } from '@/components/Header'
import { ModeToggle } from '@/components/ThemeToggle'

export default function PatientDashboard() {
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
            <header className="border-b border-sombra-matrix pb-4 mb-8">
              <h1 className="text-3xl text-sombra-matrix flex items-center gap-3">
                <Code className="w-8 h-8" />
                [SYS_LOG] Account Abstraction & Routing
              </h1>
              <p className="text-sombra-text mt-2 text-sm">ERC-4337 Smart Wallet Provisioned via Privy SDK on Base L2</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">PIX_ORACLE_MIDDLEWARE</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" /> 0x_Split_Routing
                </h3>
                <div className="space-y-3 text-sm border-l-2 border-sombra-surface pl-4">
                  <p className="text-sombra-text opacity-70">{'>'} Monitoring Open Finance BaaS API...</p>
                  <p className="text-sombra-matrix">{'>'} Payment Confirmed: tx_hash_0x9a8f...</p>
                  <p className="text-sombra-text">{'>'} Executing Split:</p>
                  <p className="text-sombra-electric ml-4">- Platform Fee: 10%</p>
                  <p className="text-sombra-electric ml-4">- Doctor Honorarium: 90%</p>
                  <p className="text-sombra-matrix mt-2">{'>'} Teleconsultation Room: UNLOCKED</p>
                </div>
              </div>

              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">EIP_712_SIGNATURE</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5" /> TCLE_Consensus
                </h3>
                <div className="space-y-3 text-sm bg-sombra-surface/30 p-4 rounded-md">
                  <p className="text-sombra-text opacity-70">TypedData Domain:</p>
                  <pre className="text-xs text-sombra-text opacity-50 overflow-x-auto">
{`{
  "name": "Dona Liamba",
  "version": "1",
  "chainId": 8453,
  "verifyingContract": "0x..."
}`}
                  </pre>
                  <p className="text-sombra-matrix mt-2">{'>'} Off-chain signature verified.</p>
                  <p className="text-sombra-blockchain">{'>'} Gas Sponsor: Paymaster_01 (Fee: 0 ETH)</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-sombra-surface bg-sombra-background p-6 rounded-lg">
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Data Partitioning (LGPD Compliance)
                </h3>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-sombra-surface/20 p-4 rounded-md">
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">L2 Blockchain</p>
                      <p className="text-xs text-sombra-matrix">SHA-256 Hash Record</p>
                      <p className="text-[10px] text-sombra-text opacity-50 break-all">a4d8...f9c2</p>
                   </div>
                   <div className="text-sombra-electric">{'<====>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Neon SQL Server</p>
                      <p className="text-xs text-sombra-blockchain">Encrypted PII Data</p>
                      <p className="text-[10px] text-sombra-text opacity-50">AES-256-GCM</p>
                   </div>
                </div>
            </div>
          </div>
        ) : (
          // ================= LUZ (UX HUMANIZADA) =================
          <div className="space-y-8 font-inter fade-in-up">
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-4xl font-serif font-bold text-luz-primary mb-2">Bem-vindo, João!</h1>
              <p className="text-luz-text opacity-80 text-lg">Seu hub central de saúde e acolhimento.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="col-span-2 bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20 card-hover">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-luz-primary flex items-center gap-2">
                    <Calendar className="text-luz-sage" /> Próxima Consulta
                  </h2>
                  <span className="bg-mint-100 text-luz-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Agendado</span>
                </div>

                <div className="bg-luz-background rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-luz-primary/10 rounded-full flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-luz-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Dr. Carlos Mendes</p>
                      <p className="text-luz-text/70 text-sm">Clínica Geral & Fitoterapia</p>
                      <p className="text-luz-primary font-medium mt-1">Hoje, 14:30 - Teleconsulta</p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <button className="w-full bg-luz-primary hover:bg-luz-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-luz-primary/20 flex items-center justify-center gap-2">
                      <Activity className="w-5 h-5" /> Entrar na Sala
                    </button>
                    <p className="text-xs text-center text-luz-text/50 mt-2 flex items-center justify-center gap-1">
                      <CheckCircle className="w-3 h-3 text-luz-sage" /> Pagamento confirmado
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20 card-hover flex flex-col justify-between">
                <div>
                   <h2 className="text-2xl font-serif font-bold text-luz-primary mb-2 flex items-center gap-2">
                    <CreditCard className="text-luz-sage" /> Agendamento
                  </h2>
                  <p className="text-sm text-luz-text/80 mb-6">Agende uma nova consulta de forma rápida e segura via Pix.</p>
                </div>
                <button className="w-full border-2 border-luz-primary text-luz-primary hover:bg-luz-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-all">
                  Nova Consulta
                </button>
              </div>

            </div>

            <div className="mt-8 bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20">
              <h2 className="text-2xl font-serif font-bold text-luz-primary mb-6 flex items-center gap-2">
                <Lock className="text-luz-sage" /> Vault Pessoal de Saúde
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Receita - Óleo CBD 5%", date: "10/08/2026", type: "PDF" },
                  { title: "Laudo Médico", date: "10/08/2026", type: "PDF" },
                  { title: "Termo de Adesão", date: "05/08/2026", type: "Assinado" },
                  { title: "TCLE Terapêutico", date: "05/08/2026", type: "Assinado" }
                ].map((doc, i) => (
                  <div key={i} className="p-4 border border-luz-earth/30 rounded-xl hover:border-luz-primary transition-colors cursor-pointer group bg-luz-background">
                    <FileText className="w-8 h-8 text-luz-sage mb-3 group-hover:text-luz-primary transition-colors" />
                    <h3 className="font-bold text-sm truncate">{doc.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                       <p className="text-xs text-luz-text/60">{doc.date}</p>
                       <span className="text-[10px] font-bold bg-luz-primary/10 text-luz-primary px-2 py-1 rounded-full">{doc.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
