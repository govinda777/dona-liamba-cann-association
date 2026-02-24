import {
  Leaf,
  User,
  Stethoscope,
  Building2,
  Search,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Activity,
  Users,
  Calendar,
  CheckCircle2,
  Star,
  Lock,
  Gift,
  Download,
  Check,
  Play,
  ChevronDown,
  BookOpen,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ExitIntentModal } from '@/components/ExitIntentModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-mint-200 selection:text-primary-900">
      <ExitIntentModal />
      <FloatingWhatsApp />

      <Header />

      <main className="flex flex-col">

        {/* 1. Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/50 to-mint-50/30 -z-20" />
          <div className="absolute inset-0 bg-organic-pattern opacity-[0.03] -z-10" />

          {/* Decorative Orbs */}
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-mint-200/20 rounded-full blur-[100px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-turquoise-200/10 rounded-full blur-[80px] -z-10" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <Badge variant="secondary" className="mb-8 inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-50 to-emerald-50 text-primary-800 border-primary-300 shadow-md rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-medium tracking-wide text-xs uppercase">Plataforma Oficial Cannabis Medicinal Brasil</span>
                </Badge>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-primary-950 mb-8 leading-[1.1]">
                  Conectando <span className="text-primary-600 relative whitespace-nowrap">
                    <span className="relative z-10">saúde</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-mint-200/60 -z-10 skew-x-12"></span>
                  </span> e bem-estar em um só lugar
                </h1>

                <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  A plataforma mais completa do Brasil unindo pacientes, médicos prescritores e associações de cannabis medicinal com segurança e acolhimento.
                </p>

                <div className="flex flex-col items-center lg:items-start gap-6">
                  {/* CTA Principal - Destaque Máximo */}
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-12 py-8 text-2xl font-bold rounded-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-2xl shadow-primary-600/40 transform hover:scale-105 transition-all duration-300 text-white animate-pulse-subtle"
                  >
                    <User className="w-7 h-7 mr-3" />
                    Começar Tratamento Agora
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>

                  {/* Urgência Social Proof */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
                    <div className="flex -space-x-2">
                      {/* Avatares genéricos */}
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="font-medium">+127 pacientes iniciaram esta semana</span>
                  </div>

                  {/* CTAs Secundários - Menor destaque */}
                  <div className="flex gap-3 mt-4">
                    <Button size="sm" variant="ghost" className="text-medical hover:bg-medical/10 border border-medical/20">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Área Médica
                    </Button>
                    <Button size="sm" variant="ghost" className="text-yellow-700 hover:bg-gold/10 border border-gold/20">
                      <Building2 className="w-4 h-4 mr-2" />
                      Área Associação
                    </Button>
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-500" />
                    <span>100% Legal e Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-500" />
                    <span>Acolhimento Humanizado</span>
                  </div>
                </div>
              </div>

              {/* Illustration / Visual */}
              <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                <div className="relative aspect-square">
                  {/* Abstract Composition */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-mint-50 rounded-[3rem] rotate-3 opacity-60 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-turquoise-50 to-white rounded-[3rem] -rotate-2 opacity-60 mix-blend-multiply shadow-2xl shadow-primary-900/5" />

                  {/* Central Hub Visualization */}
                  <div className="absolute inset-4 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-inner flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-organic-pattern opacity-10" />

                     {/* Floating Elements */}
                     <div className="relative w-full h-full p-8">
                        {/* Center - Logo Mark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/30 z-20">
                          <Leaf className="w-16 h-16 text-white" />
                        </div>

                        {/* Orbiting Elements */}
                        <div className="absolute top-12 left-12 p-4 bg-white rounded-2xl shadow-lg border border-slate-100 animate-bounce duration-[3000ms]">
                          <User className="w-8 h-8 text-primary-500" />
                          <div className="h-2 w-12 bg-slate-100 rounded-full mt-2" />
                        </div>

                        <div className="absolute bottom-20 right-10 p-4 bg-white rounded-2xl shadow-lg border border-slate-100 animate-bounce duration-[4000ms]">
                          <Stethoscope className="w-8 h-8 text-turquoise-500" />
                          <div className="h-2 w-12 bg-slate-100 rounded-full mt-2" />
                        </div>

                        <div className="absolute top-20 right-8 p-4 bg-white rounded-2xl shadow-lg border border-slate-100 animate-bounce duration-[3500ms]">
                          <Building2 className="w-8 h-8 text-gold-500" />
                          <div className="h-2 w-12 bg-slate-100 rounded-full mt-2" />
                        </div>

                        {/* Connecting Lines (SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                           <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-slate-400 animate-spin-slow" />
                        </svg>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Social Proof Section */}
        <AnimatedSection>
        <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            {/* Métricas de Impacto */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { value: "12.500+", label: "Pacientes Atendidos", icon: User },
                { value: "340+", label: "Médicos Credenciados", icon: Stethoscope },
                { value: "85", label: "Associações Verificadas", icon: Building2 },
                { value: "4.8/5", label: "Avaliação Média", icon: Star }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-3xl font-bold text-primary-900">{stat.value}</div>
                  <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Depoimentos Reais */}
            <div className="border-t border-slate-200 pt-8">
              <h3 className="text-xl font-bold text-center mb-6 text-slate-900">
                Histórias Reais de Quem Transformou o Tratamento
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Maria Silva",
                    condition: "Ansiedade Crônica",
                    location: "São Paulo, SP",
                    quote: "Em 2 dias encontrei médico e associação. Minha qualidade de vida mudou completamente.",
                    avatar: "MS"
                  },
                  {
                    name: "João Santos",
                    condition: "Dor Crônica",
                    location: "Rio de Janeiro, RJ",
                    quote: "Finalmente um lugar que organiza tudo. Não precisei mais buscar informação sozinho.",
                    avatar: "JS"
                  },
                  {
                    name: "Ana Costa",
                    condition: "Insônia Severa",
                    location: "Belo Horizonte, MG",
                    quote: "Transparência total nos custos e produtos. Me sinto segura e acolhida.",
                    avatar: "AC"
                  }
                ].map((testimonial, i) => (
                  <Card key={i} className="border-primary-100 hover:shadow-lg transition-shadow card-hover">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{testimonial.name}</div>
                          <div className="text-xs text-slate-500">{testimonial.location}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="mb-3 text-xs">{testimonial.condition}</Badge>
                      <p className="text-sm text-slate-600 italic leading-relaxed">"{testimonial.quote}"</p>
                      <div className="flex gap-1 mt-3">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Selos de Confiança */}
            <div className="border-t border-slate-200 mt-8 pt-6">
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">Conforme ANVISA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">LGPD Certificado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">85 Associações Verificadas</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>

        {/* 3. Timeline / How It Works */}
        <AnimatedSection>
        <section id="como-funciona" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary-50 text-primary-700 border-primary-200">Passo a Passo</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">
              Seu Tratamento em <span className="text-primary-600">4 Passos Simples</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Veja como é fácil organizar tudo, da busca pelo médico até o recebimento dos produtos
            </p>
          </div>

          {/* Timeline Vertical com Previews */}
          <div className="relative">
            {/* Linha vertical conectora */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200"></div>

            {[
              {
                step: "01",
                title: "Cadastro Rápido (2 minutos)",
                description: "Preencha suas necessidades, sintomas que deseja tratar e localização. Nosso sistema já sugere médicos e associações compatíveis.",
                icon: User,
                time: "⏱ 2 minutos",
                highlight: "Grátis e sem compromisso"
              },
              {
                step: "02",
                title: "Encontre Seu Médico Prescritor",
                description: "Filtre por especialidade, avaliações, disponibilidade e valor de consulta. Agende online ou presencial com confirmação instantânea.",
                icon: Search,
                time: "⏱ 5 minutos para agendar",
                highlight: "340+ médicos especializados"
              },
              {
                step: "03",
                title: "Conecte-se à Associação Ideal",
                description: "Com sua prescrição em mãos, veja associações que atendem seu perfil, compare planos mensais, catálogo e avaliações de outros pacientes.",
                icon: Building2,
                time: "⏱ 10 minutos para escolher",
                highlight: "A partir de R$ 50/mês"
              },
              {
                step: "04",
                title: "Acompanhe Tudo em Um Só Lugar",
                description: "Dashboard personalizado com suas prescrições NFT, histórico de pedidos, lembretes de dosagem e chat direto com sua associação.",
                icon: ShoppingBag,
                time: "Acesso 24/7",
                highlight: "Seus dados 100% criptografados"
              }
            ].map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex items-center mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Número do passo - Centro da timeline */}
                  <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 border-4 border-white">
                    {step.step}
                  </div>

                  {/* Conteúdo - Desktop: alternado; Mobile: sempre à direita */}
                  <div className={`w-full md:w-5/12 ml-24 md:ml-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <Card className="bg-white border-primary-200 shadow-lg hover:shadow-xl transition-all card-hover">
                      <CardHeader>
                        <div className={`inline-flex p-3 rounded-lg bg-primary-100 text-primary-600 mb-3 ${isEven ? 'md:ml-auto' : ''}`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl mb-2 font-serif">{step.title}</CardTitle>
                        <div className={`flex gap-2 flex-wrap ${isEven ? 'md:justify-end' : ''}`}>
                          <Badge variant="outline" className="text-xs">{step.time}</Badge>
                          <Badge className="text-xs bg-primary-600 text-white">{step.highlight}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Preview visual - Desktop: alternado; Mobile: oculto */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-primary-100 transform hover:scale-105 transition-transform bg-white">
                      {/* Placeholder até ter screenshots reais */}
                      <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-organic-pattern opacity-10" />
                        <div className="text-center relative z-10">
                          <step.icon className="w-16 h-16 mx-auto mb-3 text-slate-300 group-hover:text-primary-300 transition-colors" />
                          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">Preview da Interface</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA no final do fluxo */}
          <div className="text-center mt-12 bg-gradient-to-r from-primary-50 to-emerald-50 rounded-2xl p-8 border border-primary-200">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 font-serif">Pronto para começar?</h3>
            <Button size="lg" className="px-10 py-6 text-lg bg-primary-700 hover:bg-primary-800 text-white shadow-xl shadow-primary-900/10">
              Criar Minha Conta Grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-xs text-slate-500 mt-3">Sem cartão de crédito • Sem compromisso</p>
          </div>
        </section>
        </AnimatedSection>

        {/* 3a. Education Section (Novo) */}
        <AnimatedSection>
        <section id="faq" className="bg-gradient-to-br from-emerald-50 to-primary-50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-white/50 backdrop-blur-sm">Para Iniciantes</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">
                Novo em Cannabis Medicinal? <span className="text-primary-600">Você Não Está Sozinho</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Tire suas principais dúvidas sobre o tratamento legal no Brasil
              </p>
            </div>

            {/* Vídeo Explicativo */}
            <div className="mb-12">
              <Card className="overflow-hidden border-primary-200 shadow-lg">
                <div className="aspect-video bg-slate-900 flex items-center justify-center relative group cursor-pointer">
                  {/* Placeholder - substituir por iframe do YouTube */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-slate-900/80 group-hover:opacity-90 transition-opacity"></div>
                  <Button size="lg" className="relative z-10 rounded-full w-20 h-20 bg-white hover:bg-white/90 text-primary-700 shadow-xl transition-transform group-hover:scale-110">
                    <Play className="w-10 h-10 ml-1 fill-current" />
                  </Button>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">Cannabis Medicinal Legal: Guia Completo 2024</h3>
                    <p className="text-sm opacity-90">⏱ 3:45 minutos</p>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <p className="text-slate-600 text-sm">
                    Entenda como funciona o processo legal, quais condições podem ser tratadas e os passos para iniciar seu tratamento com segurança.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Colapsável */}
            <div className="space-y-3">
              {[
                {
                  q: "É legal usar cannabis medicinal no Brasil?",
                  a: "Sim! Desde 2015 a ANVISA regula cannabis medicinal. Pacientes com prescrição médica podem importar produtos ou acessar através de associações autorizadas."
                },
                {
                  q: "Quais condições podem ser tratadas?",
                  a: "Dor crônica, ansiedade, depressão, insônia, epilepsia, autismo, Parkinson, Alzheimer, câncer (efeitos colaterais da quimioterapia), fibromialgia, artrite, entre outras."
                },
                {
                  q: "Preciso de receita médica?",
                  a: "Sim, sempre. Apenas médicos podem prescrever cannabis medicinal. Nossa plataforma conecta você a médicos especializados."
                },
                {
                  q: "Quanto custa o tratamento?",
                  a: "Varia conforme o caso. Consultas médicas: R$ 200-600. Planos de associação: R$ 50-300/mês. Produtos: R$ 150-800/frasco (dura 1-2 meses)."
                },
                {
                  q: "Cannabis medicinal dá 'barato'?",
                  a: "Não. Produtos medicinais têm dosagens controladas de CBD (não psicoativo) e baixos níveis de THC. O objetivo é terapêutico, não recreativo."
                },
                {
                  q: "Como funcionam as associações?",
                  a: "São organizações sem fins lucrativos autorizadas a cultivar e distribuir cannabis para pacientes associados com prescrição médica válida."
                },
                {
                  q: "Posso dirigir usando cannabis medicinal?",
                  a: "Sim, se o produto for autorizado para uso e você seguir a dosagem prescrita. Recomenda-se sempre consultar seu médico sobre atividades específicas."
                },
                {
                  q: "Meu convênio cobre?",
                  a: "Atualmente poucos convênios cobrem. A maioria dos pacientes paga diretamente, mas há movimentos para inclusão futura na cobertura obrigatória."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors open:shadow-md">
                  <summary className="cursor-pointer p-5 flex justify-between items-center font-semibold text-slate-900 group-open:text-primary-700 select-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-primary-600" />
                  </summary>
                  <div className="px-5 pb-5 pt-2 text-slate-600 leading-relaxed border-t border-slate-100 animate-slide-up">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {/* CTA Educacional */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" className="border-primary-300 text-primary-700 hover:bg-primary-50">
                <BookOpen className="w-5 h-5 mr-2" />
                Baixar Guia Completo em PDF
              </Button>
              <p className="text-xs text-slate-500 mt-2">Material gratuito com tudo que você precisa saber</p>
            </div>
          </div>
        </section>
        </AnimatedSection>

        {/* 3b. Cost Calculator Section (Novo) */}
        <AnimatedSection>
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">Planejamento Financeiro</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">
              Quanto Custa Meu Tratamento?
            </h2>
            <p className="text-slate-600">
              Calcule uma estimativa personalizada em menos de 1 minuto
            </p>
          </div>

          <Card className="border-primary-200 shadow-xl bg-white">
            <CardContent className="p-8">
              {/* Perguntas interativas (Visual Only for now) */}
              <div className="space-y-6">
                {/* 1. Primeira consulta médica */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    1. Já tem prescrição médica?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left group focus:ring-2 focus:ring-primary-500">
                      <div className="font-semibold group-hover:text-primary-700">Sim</div>
                      <div className="text-xs text-slate-500 mt-1">Posso pular esta etapa</div>
                    </button>
                    <button className="p-4 border-2 border-primary-500 bg-primary-50 rounded-lg text-left shadow-inner ring-1 ring-primary-200">
                      <div className="font-semibold text-primary-900">Não</div>
                      <div className="text-xs text-primary-600 mt-1">Vou precisar de consulta</div>
                      <div className="text-sm font-bold mt-2 text-primary-800">+ R$ 350</div>
                    </button>
                  </div>
                </div>

                {/* 2. Tipo de associação */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    2. Qual tipo de plano de associação?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'Básico', price: 80, desc: 'Produtos padrão' },
                      { name: 'Intermediário', price: 150, desc: 'Mais variedade' },
                      { name: 'Premium', price: 280, desc: 'Catálogo completo' }
                    ].map((plan, i) => (
                      <button key={plan.name} className={`p-4 border-2 rounded-lg transition-all text-center ${i === 0 ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-primary-500 hover:bg-primary-50'}`}>
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{plan.desc}</div>
                        <div className="text-lg font-bold text-primary-700 mt-2">R$ {plan.price}/mês</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Frequência de uso */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    3. Frequência estimada de uso:
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none appearance-none bg-white">
                      <option>Uso diário (produtos duram ~1 mês) - R$ 350/mês</option>
                      <option>Uso moderado (produtos duram ~2 meses) - R$ 175/mês</option>
                      <option>Uso esporádico (produtos duram ~3 meses) - R$ 117/mês</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Resultado */}
              <div className="mt-8 pt-8 border-t-2 border-slate-200">
                <div className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-xl p-6 border-2 border-primary-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-1">Custo Inicial (1º mês):</div>
                      <div className="text-4xl font-bold text-slate-900">R$ 780</div>
                    </div>
                    <Badge className="bg-primary-600 text-white hover:bg-primary-700">Estimativa</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Consulta médica:</span>
                      <span className="font-semibold text-slate-800">R$ 350</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Mensalidade associação:</span>
                      <span className="font-semibold text-slate-800">R$ 80</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Produtos (1º mês):</span>
                      <span className="font-semibold text-slate-800">R$ 350</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-primary-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-700">Meses seguintes (média):</span>
                      <span className="text-2xl font-bold text-primary-700">R$ 430/mês</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-primary-700 hover:bg-primary-800 text-white h-12 text-lg font-bold">
                    Criar Conta e Começar
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" className="flex-1 border-slate-300 h-12">
                    <Download className="mr-2 w-5 h-5" />
                    Salvar Cálculo em PDF
                  </Button>
                </div>

                <p className="text-xs text-center text-slate-500 mt-4">
                  * Valores são estimativas baseadas em médias de mercado. O custo real varia conforme prescrição e produto escolhido.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        </AnimatedSection>

        {/* 4. Target Audience Section */}
        <AnimatedSection>
        <section id="para-quem" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-950 mb-4">Um espaço para todo o ecossistema</h2>
              <p className="text-slate-600 text-lg">Soluções integradas para cada papel fundamental na terapia canábica.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Patient Card */}
              <Card className="border-0 bg-gradient-to-b from-primary-50/50 to-white shadow-xl shadow-primary-900/5 hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 rounded-[2rem] overflow-hidden group">
                <div className="h-2 bg-primary-500 w-full" />
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                    <User className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-primary-900">Pacientes</CardTitle>
                  <CardDescription className="text-base">Jornada simplificada e segura</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Encontre médicos experientes",
                      "Descubra associações confiáveis",
                      "Transparência de custos",
                      "Tudo em um só lugar"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/15 h-12">
                    Ver jornada do paciente
                  </Button>
                </CardFooter>
              </Card>

              {/* Doctor Card */}
              <Card className="border-0 bg-gradient-to-b from-turquoise-50/30 to-white shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 rounded-[2rem] overflow-hidden group">
                <div className="h-2 bg-turquoise-500 w-full" />
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-turquoise-600 mb-4 group-hover:scale-110 transition-transform">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-slate-900">Médicos</CardTitle>
                  <CardDescription className="text-base">Gestão eficiente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Pacientes qualificados",
                      "Organização de prescrições",
                      "Encaminhamento direto",
                      "Acompanhamento da evolução"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-turquoise-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-turquoise-600" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-xl border-turquoise-200 text-turquoise-700 hover:bg-turquoise-50 h-12">
                    Ver jornada do médico
                  </Button>
                </CardFooter>
              </Card>

              {/* Association Card */}
              <Card className="border-0 bg-gradient-to-b from-gold-50/30 to-white shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 rounded-[2rem] overflow-hidden group">
                <div className="h-2 bg-gold-500 w-full" />
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-serif font-bold text-slate-900">Associações</CardTitle>
                  <CardDescription className="text-base">Visibilidade e gestão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Divulgação de planos",
                      "Novos associados",
                      "Organização de pedidos",
                      "Relacionamento médico"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-xl border-gold-200 text-gold-700 hover:bg-gold-50 h-12">
                    Ver jornada da associação
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        </AnimatedSection>

        {/* 5. Association Catalog Preview */}
        <AnimatedSection>
        <section id="associacoes" className="py-24 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Associações Parceiras</h2>
                <p className="text-slate-600 text-lg">Conheça algumas das organizações presentes no hub.</p>
              </div>
              <Button variant="ghost" className="text-primary-700 hover:text-primary-800 hover:bg-primary-50 font-medium">
                Ver todas <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "AMA-ME Cannabis",
                  city: "São Paulo",
                  state: "SP",
                  specialties: ["Dor Crônica", "Ansiedade", "Insônia"],
                  price: "150",
                  verified: true,
                  rating: 4.9,
                  members: 2500
                },
                {
                  name: "Cultive Saúde",
                  city: "Rio de Janeiro",
                  state: "RJ",
                  specialties: ["Epilepsia", "Autismo", "Parkinson"],
                  price: "120",
                  verified: true,
                  rating: 4.8,
                  members: 1800
                },
                {
                  name: "Cannativa Brasil",
                  city: "Belo Horizonte",
                  state: "MG",
                  specialties: ["Fibromialgia", "Artrite", "Câncer"],
                  price: "180",
                  verified: true,
                  rating: 4.7,
                  members: 1200
                }
              ].map((assoc, i) => (
                <Card key={i} className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden card-hover">
                  <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-4">
                      {/* Logo real ou inicial */}
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {assoc.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <Badge className="text-xs font-semibold bg-primary-600 text-white flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Verificada
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-slate-900">{assoc.rating}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-1 group-hover:text-primary-700 transition-colors">
                      {assoc.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" />
                      {assoc.city}, {assoc.state}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 pb-4 space-y-3">
                    {/* Especialidades */}
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-2">Especialidades:</div>
                      <div className="flex flex-wrap gap-1">
                        {assoc.specialties.map((spec, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-primary-200 text-primary-700 bg-primary-50">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Membros ativos */}
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Users className="w-4 h-4 text-primary-600" />
                      <span>{assoc.members.toLocaleString('pt-BR')} associados ativos</span>
                    </div>

                    {/* Preço */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900">R$ {assoc.price}</span>
                        <span className="text-sm text-slate-500">/mês</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">+ produtos conforme prescrição</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-6">
                    <Button
                      size="sm"
                      className="w-full bg-white border-2 border-primary-100 text-primary-700 hover:bg-primary-700 hover:text-white hover:border-primary-700 transition-all group-hover:shadow-lg"
                    >
                      Ver Catálogo Completo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Mapa de Cobertura Simples */}
            <div className="mt-16 bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-center mb-6 text-slate-900">
                Cobertura Nacional
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { state: "SP", count: 28 },
                  { state: "RJ", count: 15 },
                  { state: "MG", count: 12 },
                  { state: "RS", count: 9 },
                  { state: "PR", count: 8 },
                  { state: "SC", count: 6 },
                  { state: "BA", count: 5 },
                  { state: "DF", count: 4 },
                  { state: "PE", count: 3 },
                  { state: "CE", count: 2 }
                ].map(region => (
                  <div key={region.state} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors cursor-default">
                    <span className="font-bold text-primary-900">{region.state}</span>
                    <Badge variant="secondary" className="text-xs bg-white">{region.count}</Badge>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-slate-500 mt-4">
                Novas associações sendo adicionadas semanalmente
              </p>
            </div>
          </div>
        </section>
        </AnimatedSection>

        {/* 6. General Benefits */}
        <AnimatedSection>
        <section className="bg-primary-950 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-primary-900/50"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-3 gap-16 text-center">
              <div>
                <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <ShieldCheck className="w-8 h-8 text-mint-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-white">Segurança e Legalidade</h3>
                <p className="text-primary-100/80 leading-relaxed">
                  Todas as associações e médicos passam por rigorosa verificação para garantir um tratamento dentro das normas da ANVISA.
                </p>
              </div>
              <div>
                <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <HeartPulse className="w-8 h-8 text-mint-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-white">Acolhimento Real</h3>
                <p className="text-primary-100/80 leading-relaxed">
                  Foco no bem-estar do paciente com suporte contínuo das associações e acompanhamento médico humanizado.
                </p>
              </div>
              <div>
                <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <Leaf className="w-8 h-8 text-mint-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-white">Qualidade Garantida</h3>
                <p className="text-primary-100/80 leading-relaxed">
                  Acesso a produtos de qualidade controlada e transparência nas informações de concentração e dosagem.
                </p>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>

        {/* 6b. Lead Capture (Novo) */}
        <AnimatedSection>
        <section className="max-w-4xl mx-auto px-6 py-20 -mb-20 relative z-20">
          <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-0 shadow-2xl relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm shadow-inner">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-3 font-serif">
                Guia Gratuito: Como Iniciar Seu Tratamento
              </h3>
              <p className="text-center text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
                Receba por email um guia completo com checklist, lista de documentos necessários, custos médios e direitos do paciente
              </p>

              <LeadCaptureForm />

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 text-sm text-primary-100 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Sem Spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Pode cancelar a qualquer momento</span>
                </div>
              </div>

              <p className="text-center text-xs text-primary-200 mt-6 opacity-80">
                +3.847 pessoas já receberam este guia esta semana
              </p>
            </CardContent>
          </Card>
        </section>
        </AnimatedSection>

        {/* 7. Final CTA */}
        <section className="pt-40 pb-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary-950 mb-8">
              Pronto para organizar seu tratamento?
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-light">
              Junte-se a milhares de pacientes que já encontraram o caminho para uma vida com mais qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-600/20 text-white hover:scale-105 transition-all duration-300">
                Criar conta Grátis
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                Sou Profissional
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
