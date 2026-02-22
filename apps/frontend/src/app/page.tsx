import { Leaf, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/StatCard';
import { PrivyLoginButton } from '@/components/PrivyLoginButton';

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-emerald-50">
      {/* Header */}
      <header className="border-b border-primary-100 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="p-2 bg-primary-100 rounded-full group-hover:bg-primary-200 transition-colors">
              <Leaf className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-900 font-monserrat tracking-tight">
              Dona Liamba
            </h1>
          </div>
          <PrivyLoginButton />
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-medical rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-64 h-64 bg-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-32 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold-700 border-gold/20 backdrop-blur-sm shadow-sm hover:bg-gold/20 transition-colors">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              ANVISA Autorizada • Web3 Nativa
            </Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary-900 via-primary-700 to-medical bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
              Prescrições Canábicas
              <br />
              <span className="text-4xl md:text-6xl text-gold font-bold italic">Seguras e Privadas</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Conecte-se ao futuro da saúde. Cada prescrição é um NFT Soulbound único.
              Apenas você e seu médico possuem as chaves.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-10 py-7 text-lg bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-600/20 rounded-full w-full sm:w-auto transition-all hover:scale-105">
                <Leaf className="w-5 h-5 mr-2" />
                Iniciar Tratamento
              </Button>
              <Button variant="outline" size="lg" className="px-10 py-7 text-lg border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 text-primary-800 rounded-full w-full sm:w-auto transition-all">
                Como Funciona?
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
            <StatCard icon={User} title="100+" subtitle="Pacientes Ativos" />
            <StatCard icon={Leaf} title="15" subtitle="Médicos Certificados" />
            <StatCard icon={ShoppingCart} title="50+" subtitle="Produtos Disponíveis" />
          </div>
        </div>
      </section>
    </div>
  );
}
