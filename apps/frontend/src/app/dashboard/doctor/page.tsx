"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Users, FileSignature, Activity, FileText, Bot, Scale, Shield, Network, Zap } from 'lucide-react'
import { Header } from '@/components/Header'
import { ModeToggle } from '@/components/ThemeToggle'

export default function DoctorDashboard() {
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
                  <Network className="w-8 h-8" />
                  [SYS_LOG] Clinical Compliance & DeSci
                </h1>
                <p className="text-sombra-text mt-2 text-sm">Role-Based Access Control via SBT (Soulbound Tokens)</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-sombra-blockchain">DeSci Rep: 1,450 XP</p>
                <p className="text-xs text-sombra-electric">Role: VERIFIED_CLINICIAN</p>
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">CFM_COMPLIANCE</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Scale className="w-5 h-5" /> EIP-712 Autonomy Pledge
                </h3>
                <div className="space-y-3 text-sm border-l-2 border-sombra-surface pl-4">
                  <p className="text-sombra-text opacity-70">{'>'} Validating Art. 68 & 69 CFM Code of Ethics...</p>
                  <p className="text-sombra-matrix">{'>'} Doctor asserts NO commercial ties.</p>
                  <p className="text-sombra-text">{'>'} Signature Payload:</p>
                  <pre className="text-xs text-sombra-text opacity-50 overflow-x-auto bg-sombra-surface/20 p-2 rounded">
{`{
  "statement": "Independent Practice",
  "crm": "CRM-SP 12345",
  "timestamp": 1754029200
}`}
                  </pre>
                  <p className="text-sombra-blockchain mt-2">{'>'} Anchored on L2 (Tx: 0x4f1a...2b)</p>
                </div>
              </div>

              <div className="border border-sombra-surface bg-sombra-background p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs text-sombra-blockchain opacity-50 font-bold">RAG_AI_ENGINE</div>
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Vector DB Query (Pharmacology)
                </h3>
                <div className="space-y-3 text-sm bg-sombra-surface/30 p-4 rounded-md">
                  <p className="text-sombra-text opacity-70">{'>'} Contextualizing Query: &quot;Drug interaction: CBD + Warfarin&quot;</p>
                  <p className="text-sombra-matrix">{'>'} Fetching embeddings from Sanity CMS...</p>
                  <p className="text-sombra-electric">{'>'} CYP450 enzyme competition detected.</p>
                  <p className="text-sombra-text">{'>'} LLM Prompt Generation:</p>
                  <div className="border border-sombra-surface p-2 text-xs text-sombra-text/80 rounded">
                     &quot;Based on DeSci clinical data, advise slow titration. Alert risk of bleeding...&quot;
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-sombra-surface bg-sombra-background p-6 rounded-lg">
                <h3 className="text-xl text-sombra-electric mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> ICP-Brasil Digital Signature
                </h3>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-sombra-surface/20 p-4 rounded-md">
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Prescription Payload</p>
                      <p className="text-xs text-sombra-matrix">JSON Data (Anvisa rules)</p>
                   </div>
                   <div className="text-sombra-electric">{'===>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">A1/A3 Certificate</p>
                      <p className="text-xs text-sombra-blockchain">PKI Cryptography</p>
                   </div>
                   <div className="text-sombra-electric">{'===>'}</div>
                   <div className="text-center p-4 border border-sombra-surface rounded w-full">
                      <p className="text-sombra-text text-sm font-bold mb-2">Signed PDF</p>
                      <p className="text-xs text-sombra-matrix">Valid across Brazil pharmacies</p>
                   </div>
                </div>
            </div>
          </div>
        ) : (
          // ================= LUZ (UX HUMANIZADA) =================
          <div className="space-y-8 font-inter fade-in-up">
            <header className="mb-10 text-center md:text-left flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-serif font-bold text-luz-primary mb-2">Dashboard Médico</h1>
                <p className="text-luz-text opacity-80 text-lg">Área clínica ágil e assistida.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-luz-surface px-4 py-2 rounded-full border border-luz-earth/30">
                 <Activity className="w-4 h-4 text-luz-sage" />
                 <span className="text-sm font-bold text-luz-primary">CRM-SP 12345 • Verificado</span>
              </div>
            </header>

            <div className="grid md:grid-cols-12 gap-6">

              {/* Left Column: Agenda & Patients */}
              <div className="md:col-span-4 space-y-6">
                 <div className="bg-luz-surface rounded-2xl p-6 shadow-sm border border-luz-earth/20 card-hover">
                   <h2 className="text-xl font-serif font-bold text-luz-primary mb-4 flex items-center gap-2">
                     <Users className="text-luz-sage" /> Pacientes Hoje
                   </h2>
                   <div className="space-y-4">
                     {[
                       { name: "João Silva", time: "14:30", status: "Aguardando" },
                       { name: "Maria Oliveira", time: "15:45", status: "Confirmado" },
                       { name: "Carlos Santos", time: "17:00", status: "Confirmado" }
                     ].map((p, i) => (
                       <div key={i} className="flex justify-between items-center p-3 hover:bg-luz-background rounded-lg transition-colors cursor-pointer border border-transparent hover:border-luz-earth/20">
                          <div>
                            <p className="font-bold text-sm">{p.name}</p>
                            <p className="text-xs text-luz-text/60">{p.time}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${p.status === 'Aguardando' ? 'bg-amber-100 text-amber-700' : 'bg-mint-100 text-luz-primary'}`}>
                            {p.status}
                          </span>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>

              {/* Right Column: Anamnese & AI */}
              <div className="md:col-span-8 bg-luz-surface rounded-2xl p-8 shadow-sm border border-luz-earth/20 card-hover">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-luz-primary flex items-center gap-2">
                    <FileText className="text-luz-sage" /> Anamnese Fluida
                  </h2>
                  <span className="text-sm text-luz-text/60">Paciente: João Silva</span>
                </div>

                <div className="space-y-4 mb-6">
                   <div>
                     <label className="block text-sm font-bold text-luz-text/80 mb-2">Queixa Principal</label>
                     <textarea className="w-full bg-luz-background border border-luz-earth/30 rounded-xl p-4 focus:outline-none focus:border-luz-primary focus:ring-1 focus:ring-luz-primary min-h-[100px]" placeholder="Relato do paciente..."></textarea>
                   </div>
                </div>

                {/* Copiloto IA */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 relative">
                   <div className="absolute -top-3 -left-3 bg-blue-500 text-white p-2 rounded-full shadow-md">
                     <Bot className="w-4 h-4" />
                   </div>
                   <h3 className="font-bold text-blue-800 text-sm mb-2 ml-4">Copiloto IA - Análise Clínica</h3>
                   <p className="text-sm text-blue-900/80 ml-4 mb-2">
                     Baseado no perfil do paciente (idoso, insônia), sugerimos focar em <strong>CBN</strong> com titulação lenta (&quot;Start low, go slow&quot;).
                   </p>
                   <p className="text-xs text-red-600 font-bold ml-4 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Alerta: Paciente faz uso de varfarina. Monitorar interações.
                   </p>
                </div>

                <div className="flex gap-4 justify-end">
                   <button className="border-2 border-luz-primary text-luz-primary hover:bg-luz-primary/10 font-bold py-2 px-6 rounded-xl transition-all">
                     Salvar Rascunho
                   </button>
                   <button className="bg-luz-primary hover:bg-luz-primary/90 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-md flex items-center gap-2">
                     <FileSignature className="w-4 h-4" /> Assinar Receita (ICP-Brasil)
                   </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  )
}
