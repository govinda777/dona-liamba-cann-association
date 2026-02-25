'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Rocket,
  TrendingUp,
  ShieldCheck,
  Vote,
  Gift,
  ArrowRight,
  Zap,
  Lock,
  Target,
  Coins
} from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function MembershipPage() {
  const [memberCount, setMemberCount] = useState(47);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Geometric Fee Calculation
  const calculateFee = (n: number) => {
    return 0.01 * Math.pow(2, n - 1);
  };

  const currentFee = calculateFee(memberCount);

  // Countdown Timer Logic (Mock: 30 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days ahead

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Header />

      <main className="flex flex-col">

        {/* 1. HERO SECTION: Countdown & Main Value Prop */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-slate-900/95 to-slate-900/90"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <Badge variant="outline" className="mb-6 border-emerald-400/30 text-emerald-400 px-4 py-1 text-sm tracking-wider uppercase bg-emerald-950/30 backdrop-blur-sm">
              🚀 Protocolo Oceano Azul Web3
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-extrabold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-yellow-200">
              Seja Membro do Protocolo <br/> Dona Liamba
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Único no mundo. O protocolo que paga para você participar. Entre antes do próximo ciclo de halving e garanta sua posição na governança.
            </p>

            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12">
              {[
                { label: 'DIAS', value: timeLeft.days },
                { label: 'HORAS', value: timeLeft.hours },
                { label: 'MINUTOS', value: timeLeft.minutes },
                { label: 'SEGUNDOS', value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 w-24 sm:w-32 flex flex-col items-center shadow-2xl">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400">{String(item.value).padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs text-slate-400 tracking-widest mt-2">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Main Stats Card */}
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-2xl">
              <div className="flex-1 p-6 flex flex-col items-center">
                <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Vagas Disponíveis</span>
                <span className="text-3xl font-bold text-white">47 <span className="text-slate-500 text-lg font-normal">/ 100</span></span>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center">
                <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Taxa Atual (Membro #47)</span>
                <span className="text-3xl font-bold text-emerald-400">{currentFee.toFixed(4)} USDT</span>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center bg-gradient-to-b from-yellow-500/10 to-transparent">
                <span className="text-yellow-200/80 text-sm mb-1 uppercase tracking-wider">Recompensa Referral</span>
                <span className="text-3xl font-bold text-yellow-400">{(currentFee * 0.2).toFixed(4)} USDT</span>
              </div>
            </div>

            <div className="mt-12">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 shadow-lg shadow-emerald-900/50 text-lg px-12 py-8 rounded-full font-bold transition-all hover:scale-105">
                Garantir Minha Vaga Agora
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <p className="mt-4 text-sm text-slate-400">Transação Segura via Blockchain Polygon (Amoy)</p>
            </div>
          </div>
        </section>

        {/* 2. BLUE OCEAN STRATEGY: Why this is different */}
        <AnimatedSection>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-slate-900 mb-6">
                Estratégia Oceano Azul
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Redesenhamos o modelo de associação canábica para eliminar burocracia e criar valor real para o paciente.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Strategy Canvas / Value Curve Visual */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-emerald-100 rounded-bl-2xl text-emerald-800 text-xs font-bold">
                  CURVA DE VALOR
                </div>
                <div className="h-80 flex items-end justify-between gap-2 sm:gap-4 mt-8">
                   {[
                     { label: 'Burocracia', current: 20, old: 90 },
                     { label: 'Custo', current: 30, old: 80 },
                     { label: 'Rapidez', current: 95, old: 30 },
                     { label: 'Segurança', current: 100, old: 50 },
                     { label: 'Retorno $', current: 90, old: 0 },
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center justify-end h-full flex-1 group">
                       <div className="w-full bg-slate-200 rounded-t-lg relative group-hover:bg-slate-300 transition-colors" style={{ height: `${item.old}%` }}>
                         <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium">Tradicional</span>
                       </div>
                       <div className="w-full bg-emerald-500 rounded-t-lg relative -ml-2 sm:-ml-4 z-10 shadow-lg group-hover:bg-emerald-400 transition-colors" style={{ height: `${item.current}%` }}>
                         <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-emerald-700 font-bold">{item.current}%</span>
                       </div>
                       <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-3 text-center h-8 flex items-center">{item.label}</span>
                     </div>
                   ))}
                </div>
              </div>

              {/* ERRC Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-red-100 bg-red-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700 text-lg">
                      <Zap className="w-5 h-5" /> Eliminar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-red-900/80">
                      <li>• Burocracia manual de cadastro</li>
                      <li>• Intermediários desnecessários</li>
                      <li>• Taxas ocultas</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-yellow-100 bg-yellow-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-700 text-lg">
                      <TrendingUp className="w-5 h-5" /> Reduzir
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-yellow-900/80">
                      <li>• Custo de aquisição (CAC)</li>
                      <li>• Tempo de espera para consulta</li>
                      <li>• Complexidade jurídica</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-blue-100 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
                      <ShieldCheck className="w-5 h-5" /> Elevar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-blue-900/80">
                      <li>• Segurança de dados (Cripto)</li>
                      <li>• Transparência de processos</li>
                      <li>• Qualidade do atendimento</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-emerald-100 bg-emerald-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg">
                      <Rocket className="w-5 h-5" /> Criar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-emerald-900/80">
                      <li>• Governança Tokenizada (DAO)</li>
                      <li>• Referral Program Automático</li>
                      <li>• NFT de Identidade Soulbound</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>

        {/* 3. GEOMETRIC FEE CALCULATOR */}
        <AnimatedSection>
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-400/30">Matemática do Protocolo</Badge>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold mb-6">
                Modelo Geométrico de Taxa
              </h2>
              <p className="text-slate-400 text-lg">
                Quanto mais cedo você entra, menor sua taxa vitalícia. A taxa cresce exponencialmente para novos membros, valorizando a posição dos pioneiros.
              </p>
            </div>

            <Card className="bg-white/10 border-white/10 backdrop-blur-md">
              <CardContent className="p-8 sm:p-12">
                <div className="space-y-8">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Simular posição de entrada (Membro N#)</label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={memberCount > 20 ? 20 : memberCount} // Slider cap for demo
                      onChange={(e) => setMemberCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Membro #1</span>
                      <span>Membro #10</span>
                      <span>Membro #20+</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Membro #{memberCount}</h3>
                      <p className="text-slate-400 text-sm">Sua posição na rede</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm text-slate-400 mb-1">Sua Taxa Mensal Fixa</span>
                      <span className="text-4xl font-mono font-bold text-emerald-400">
                        {calculateFee(memberCount).toFixed(2)} USDT
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">= R$ {(calculateFee(memberCount) * 5.0).toFixed(2)} aprox.</span>
                    </div>
                  </div>

                  <div className="text-center">
                     <p className="text-sm text-slate-400 mb-4">
                       Fórmula: <code className="bg-slate-800 px-2 py-1 rounded text-emerald-300">0.01 * (2^(N-1))</code>
                     </p>
                     <div className="flex justify-center gap-2 text-xs text-slate-500">
                       <span className="px-3 py-1 bg-slate-800 rounded-full">#1: 0.01</span>
                       <span className="px-3 py-1 bg-slate-800 rounded-full">#2: 0.02</span>
                       <span className="px-3 py-1 bg-slate-800 rounded-full">#3: 0.04</span>
                       <span className="px-3 py-1 bg-slate-800 rounded-full">#4: 0.08</span>
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        </AnimatedSection>

        {/* 4. GOVERNANCE & DAO */}
        <AnimatedSection>
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 mb-6">Governança DAO</Badge>
                <h2 className="text-4xl font-serif font-extrabold text-slate-900 mb-6">
                  Você Decide o Futuro do Protocolo
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Não somos apenas uma plataforma, somos uma comunidade autônoma. Com o token <strong>$LIAMBA</strong>, você tem poder de voto em decisões críticas.
                </p>

                <ul className="space-y-6">
                  {[
                    { icon: Vote, title: 'Quadratic Voting', desc: 'Sistema justo onde baleias não dominam. Seu voto conta mais nas questões que você mais se importa.' },
                    { icon: Target, title: 'Propostas Comunitárias', desc: 'Qualquer membro pode sugerir novas associações parceiras ou melhorias na plataforma.' },
                    { icon: Lock, title: 'Tesouraria Multi-sig', desc: 'Fundos geridos por contratos inteligentes com chaves distribuídas entre membros eleitos.' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex gap-4">
                  <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    Ler Whitepaper
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Comprar Tokens $LIAMBA
                  </Button>
                </div>
              </div>

              {/* Governance Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-indigo-200 rounded-full blur-3xl opacity-30"></div>
                <Card className="relative bg-white/80 backdrop-blur border-slate-200 shadow-xl">
                  <CardHeader className="border-b border-slate-100">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Propostas Ativas</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 animate-pulse">● Votação Aberta</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {[
                        { id: 1, title: "Incluir Associação 'CuraVerde' no Hub", votes: 450, status: 'Aprovando' },
                        { id: 2, title: "Reduzir taxa de saque para 2%", votes: 120, status: 'Em debate' },
                        { id: 3, title: "Alocar 500 USDT para Marketing", votes: 890, status: 'Finalizando' },
                      ].map((prop) => (
                        <div key={prop.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-mono text-slate-400">PROP-{prop.id.toString().padStart(3, '0')}</span>
                            <span className="text-xs font-bold text-slate-600">{prop.status}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">{prop.title}</h4>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(prop.votes / 1000) * 100}%` }}></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-slate-500">
                            <span>{prop.votes} votos</span>
                            <span>Meta: 1000</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 p-4 text-center">
                    <span className="text-xs text-slate-500 w-full cursor-pointer hover:underline">Ver todas as propostas no Snapshot</span>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>

        {/* 5. REFERRAL SYSTEM */}
        <AnimatedSection>
        <section className="py-24 bg-white">
           <div className="max-w-5xl mx-auto px-6 text-center">
             <div className="inline-flex p-4 rounded-full bg-yellow-50 mb-8 ring-1 ring-yellow-200">
               <Gift className="w-8 h-8 text-yellow-600" />
             </div>
             <h2 className="text-4xl font-serif font-extrabold text-slate-900 mb-6">
               Sistema de Recompensas Viral
             </h2>
             <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
               O protocolo cresce, você ganha. Receba 20% da taxa de entrada de cada novo membro que usar seu link exclusivo. Garantido via Smart Contract.
             </p>

             <div className="grid md:grid-cols-3 gap-8">
               {[
                 { step: '1', title: 'Gere seu Link', desc: 'Conecte sua carteira e gere um link único de indicação.' },
                 { step: '2', title: 'Compartilhe', desc: 'Envie para amigos que buscam tratamento com cannabis medicinal.' },
                 { step: '3', title: 'Ganhe USDT', desc: 'Receba 20% da taxa de adesão deles direto na sua wallet.' },
               ].map((item, i) => (
                 <div key={i} className="relative p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-yellow-200 transition-colors group">
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-xl text-yellow-600 border-2 border-yellow-50 group-hover:scale-110 transition-transform">
                     {item.step}
                   </div>
                   <h3 className="mt-6 text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                   <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               ))}
             </div>

             <div className="mt-16 bg-slate-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
               <div className="text-left">
                 <h3 className="text-2xl font-bold mb-2">Simulação de Ganhos</h3>
                 <p className="text-slate-400">Se você indicar o Membro #48:</p>
               </div>
               <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-xl border border-white/10">
                 <Coins className="w-8 h-8 text-yellow-400" />
                 <div>
                   <div className="text-xs text-slate-300 uppercase tracking-wider">Você Recebe</div>
                   <div className="text-2xl font-mono font-bold text-yellow-400">
                     {(calculateFee(48) * 0.2).toFixed(4)} USDT
                   </div>
                 </div>
               </div>
               <Button className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-8">
                 Começar a Indicar
               </Button>
             </div>
           </div>
        </section>
        </AnimatedSection>

        {/* 6. FINAL CTA */}
        <section className="py-32 bg-gradient-to-b from-slate-50 to-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 mb-8">
              Não deixe para o próximo ciclo.
            </h2>
            <p className="text-xl text-slate-600 mb-12">
              As vagas são limitadas e a taxa sobe a cada novo membro. Garanta sua posição agora e faça parte da revolução da saúde descentralizada.
            </p>

            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Entrar no Protocolo
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <p className="mt-6 text-sm text-slate-500">
              Junte-se a 47 membros pioneiros hoje.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
