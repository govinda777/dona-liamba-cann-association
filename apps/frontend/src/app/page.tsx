import {
  Leaf,
  User,
  Stethoscope,
  Building2,
  Search,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PrivyLoginButton } from '@/components/PrivyLoginButton';

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-emerald-50 text-slate-800 font-monserrat">
      {/* Header */}
      <header className="border-b border-primary-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="p-2 bg-primary-100 rounded-full group-hover:bg-primary-200 transition-colors">
              <Leaf className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-900 tracking-tight">
              Dona Liamba
            </h1>
          </div>
          <PrivyLoginButton />
        </nav>
      </header>

      <main className="flex flex-col gap-20 pb-20">

        {/* 1. Hero Section */}
        <section className="relative pt-20 pb-16 px-6 lg:pt-32 lg:pb-24 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-medical/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-gold/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <Badge variant="secondary" className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 text-primary-700 border-primary-200 backdrop-blur-sm shadow-sm hover:bg-white/80 transition-all">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Ecossistema Unificado
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary-950 mb-6 leading-tight tracking-tight">
              Hub que conecta <span className="text-primary-600">pacientes</span>, <span className="text-medical">médicos</span> e <span className="text-gold">associações</span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Encontre médicos prescritores, descubra associações confiáveis e organize todo o seu tratamento com cannabis medicinal em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-primary-700 hover:bg-primary-800 shadow-lg shadow-primary-600/20 group text-white">
                <User className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Sou Paciente
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-full border-2 border-medical text-medical hover:bg-medical/10">
                <Stethoscope className="w-5 h-5 mr-2" />
                Sou Médico
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-full border-2 border-gold text-yellow-700 hover:bg-gold/10">
                <Building2 className="w-5 h-5 mr-2" />
                Sou Associação
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Mission Section */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Nossa Missão</h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Facilitar o acesso seguro e responsável à cannabis medicinal no Brasil, conectando pacientes, médicos e associações em um único ambiente.
              Nosso objetivo é organizar a jornada do tratamento: da primeira consulta até a compra dos produtos na associação, com transparência, orientação e suporte.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600 mt-1">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">Aproximar pacientes de médicos prescritores</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gold/20 rounded-lg text-yellow-700 mt-1">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">Conectar pacientes às associações ideais</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-medical/20 rounded-lg text-medical mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">Organizar o tratamento de forma segura</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How it Works Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Como funciona na prática</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Uma jornada simplificada para o paciente, do cadastro ao tratamento contínuo.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line for large screens */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 -z-10 transform -translate-y-1/2"></div>

            {[
              {
                icon: User,
                title: "1. Crie seu perfil",
                desc: "Preencha suas necessidades, cidade e preferências de tratamento."
              },
              {
                icon: Search,
                title: "2. Encontre médicos",
                desc: "Filtre por especialidade e agende sua consulta online ou presencial."
              },
              {
                icon: Building2,
                title: "3. Conecte-se",
                desc: "Receba indicações de associações compatíveis com sua receita."
              },
              {
                icon: ShoppingBag,
                title: "4. Acompanhe",
                desc: "Visualize planos, catálogo de produtos e faça seus pedidos."
              }
            ].map((step, idx) => (
              <Card key={idx} className="relative bg-white border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-primary-100 border-4 border-white flex items-center justify-center text-primary-600 shadow-sm">
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>
                <CardHeader className="pt-10 text-center pb-2">
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-slate-600 text-sm">
                  {step.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Target Audience Section */}
        <section className="bg-white/50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Um espaço para todo o ecossistema</h2>
              <p className="text-slate-600">Soluções integradas para cada papel fundamental na terapia canábica.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Patient Card */}
              <Card className="border-primary-100 bg-gradient-to-b from-white to-primary-50/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                    <User className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl text-primary-900">Pacientes</CardTitle>
                  <CardDescription>Jornada simplificada e segura</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Encontre médicos experientes",
                      "Descubra associações confiáveis",
                      "Transparência de custos",
                      "Tudo em um só lugar"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <Leaf className="w-4 h-4 text-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary-700 hover:bg-primary-800 text-white" variant="default">
                    Ver jornada do paciente
                  </Button>
                </CardFooter>
              </Card>

              {/* Doctor Card */}
              <Card className="border-medical/20 bg-gradient-to-b from-white to-medical/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-medical/10 flex items-center justify-center text-medical mb-4">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">Médicos</CardTitle>
                  <CardDescription>Gestão e encaminhamento eficiente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Pacientes já interessados",
                      "Organização de prescrições",
                      "Encaminhamento direto",
                      "Acompanhamento da evolução"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <HeartPulse className="w-4 h-4 text-medical" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-medical text-medical hover:bg-medical/5">
                    Ver jornada do médico
                  </Button>
                </CardFooter>
              </Card>

              {/* Association Card */}
              <Card className="border-gold/20 bg-gradient-to-b from-white to-gold/5">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-yellow-700 mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">Associações</CardTitle>
                  <CardDescription>Visibilidade e gestão de associados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Divulgação de planos e produtos",
                      "Recebimento de pacientes",
                      "Organização de pedidos",
                      "Relacionamento com médicos"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <Building2 className="w-4 h-4 text-yellow-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-gold text-yellow-700 hover:bg-gold/5">
                    Ver jornada da associação
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. Association Catalog Preview */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Associações Parceiras</h2>
              <p className="text-slate-600">Conheça algumas das organizações presentes no hub.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-primary-600 hover:text-primary-700 hover:bg-primary-50">
              Ver todas <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group cursor-pointer hover:border-primary-300 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-slate-400" />
                    </div>
                    <Badge variant="outline" className="text-xs font-normal border-primary-200 text-primary-700 bg-primary-50">
                      Verificado
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-lg">Associação Exemplo {i}</CardTitle>
                  <CardDescription>São Paulo, SP</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="text-sm text-slate-600 mb-2">Foco: Dor Crônica, Ansiedade</div>
                  <div className="text-xs font-medium text-slate-900">A partir de R$ 50/mês</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" variant="secondary" className="w-full mt-2 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                    Ver detalhes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Button variant="ghost" className="w-full text-primary-600">Ver todas associações</Button>
          </div>
        </section>

        {/* 6. General Benefits */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="inline-flex p-3 rounded-full bg-primary-800 mb-4">
                  <ShieldCheck className="w-8 h-8 text-primary-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Segurança e Legalidade</h3>
                <p className="text-primary-200 text-sm leading-relaxed">
                  Todas as associações e médicos passam por verificação para garantir um tratamento dentro das normas da ANVISA.
                </p>
              </div>
              <div>
                <div className="inline-flex p-3 rounded-full bg-primary-800 mb-4">
                  <HeartPulse className="w-8 h-8 text-primary-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Acolhimento Real</h3>
                <p className="text-primary-200 text-sm leading-relaxed">
                  Foco no bem-estar do paciente com suporte contínuo das associações e acompanhamento médico.
                </p>
              </div>
              <div>
                <div className="inline-flex p-3 rounded-full bg-primary-800 mb-4">
                  <Leaf className="w-8 h-8 text-primary-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Qualidade Garantida</h3>
                <p className="text-primary-200 text-sm leading-relaxed">
                  Acesso a produtos de qualidade controlada e transparência nas informações de concentração e dosagem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="max-w-4xl mx-auto px-6 text-center py-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Pronto para organizar seu tratamento?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pacientes que já encontraram o caminho para uma vida com mais qualidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-6 text-lg rounded-full bg-primary-700 hover:bg-primary-800 shadow-xl shadow-primary-600/20 text-white">
              Criar conta como Paciente
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full border-slate-300 text-slate-700 hover:bg-slate-50">
              Sou profissional / Associação
            </Button>
          </div>
        </section>

      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-slate-700">Dona Liamba</span>
          </div>
          <p>© 2024 Dona Liamba. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
