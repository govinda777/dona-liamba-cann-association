'use client';

import * as React from 'react';
import { ArrowLeft, Star, MapPin, ShieldCheck, ShoppingBag, Info, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const associations = [
  {
    id: 'ama-me',
    name: "AMA-ME Cannabis",
    city: "São Paulo",
    state: "SP",
    specialties: ["Dor Crônica", "Ansiedade", "Insônia"],
    price: "150",
    rating: 4.9,
    members: 2500,
    description: "A AMA-ME é uma das associações mais tradicionais do Brasil, focada em acolhimento e educação sobre cannabis medicinal.",
    products: [
      { name: "Oleo CBD Full Spectrum 5%", price: "280" },
      { name: "Oleo CBD Isolate 10%", price: "420" },
      { name: "Creme Topico Relaxante", price: "145" }
    ]
  },
  {
    id: 'cultive-saude',
    name: "Cultive Saúde",
    city: "Rio de Janeiro",
    state: "RJ",
    specialties: ["Epilepsia", "Autismo", "Parkinson"],
    price: "120",
    rating: 4.8,
    members: 1800,
    description: "Especializada em casos neurologicos, a Cultive Saude oferece suporte especializado para familias e pacientes de alta complexidade.",
    products: [
      { name: "Oleo CBD Neurologico", price: "350" },
      { name: "Capsulas CBD 25mg", price: "220" },
      { name: "Extrato Rico em THC (Baixa Dosagem)", price: "180" }
    ]
  },
  {
    id: 'cannativa',
    name: "Cannativa Brasil",
    city: "Belo Horizonte",
    state: "MG",
    specialties: ["Fibromialgia", "Artrite", "Câncer"],
    price: "180",
    rating: 4.7,
    members: 1200,
    description: "Com foco em doencas inflamatorias e oncologia, a Cannativa busca as melhores linhagens para alinhamento terapeutico.",
    products: [
      { name: "Oleo Anti-inflamatorio", price: "310" },
      { name: "Gummies CBD 10mg", price: "160" },
      { name: "Balsamo Muscular CBD", price: "125" }
    ]
  }
];

export default function AssociationCatalog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const assoc = associations.find(a => a.id === id) || associations[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/#associacoes" className="flex items-center gap-2 text-slate-600 hover:text-primary-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="text-xl font-bold font-serif text-primary-900">{assoc.name}</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-0 shadow-lg overflow-hidden">
               <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-4xl font-bold">
                 {assoc.name.charAt(0)}
               </div>
               <CardContent className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <Badge className="bg-primary-600 text-white"><ShieldCheck className="w-3 h-3 mr-1" /> Verificada</Badge>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> <b>{assoc.rating}</b></div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{assoc.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mb-6">
                    <MapPin className="w-4 h-4" /> {assoc.city}, {assoc.state}
                  </CardDescription>
                  <p className="text-slate-600 text-sm leading-loose mb-6">{assoc.description}</p>

                  <div className="space-y-4 pt-6 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Mensalidade:</span>
                      <span className="font-bold text-slate-900">R$ {assoc.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Associados:</span>
                      <span className="font-bold text-slate-900">{assoc.members.toLocaleString()}</span>
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-primary-50 border-primary-100">
               <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary-800 font-bold">
                    <HeartPulse className="w-5 h-5" />
                    Como se associar?
                  </div>
                  <ol className="text-xs text-primary-900 space-y-3 list-decimal list-inside">
                    <li>Tenha sua prescricao medica em maos.</li>
                    <li>Preencha o formulario de adesao desta associacao.</li>
                    <li>Pague a taxa de anuidade/mensalidade.</li>
                    <li>Aguarde a validacao dos documentos.</li>
                  </ol>
                  <Button className="w-full bg-primary-700 hover:bg-primary-800 mt-2">Iniciar Filiacao</Button>
               </CardContent>
            </Card>
          </div>

          {/* Catalog Content */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Catalogo de Produtos</h2>
                <Badge variant="outline">{assoc.products.length} itens disponiveis</Badge>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
               {assoc.products.map((product, i) => (
                 <Card key={i} className="group hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                       <div className="w-full aspect-square bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-slate-300" />
                       </div>
                       <CardTitle className="text-lg">{product.name}</CardTitle>
                       <CardDescription>Qualidade farmacêutica</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                       <div className="flex justify-between items-end mt-4">
                          <div>
                             <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Preço Sugerido</p>
                             <span className="text-2xl font-extrabold text-slate-900">R$ {product.price}</span>
                          </div>
                          <Button size="sm" variant="outline" className="border-primary-200 text-primary-700 hover:bg-primary-50">
                             Ver Detalhes
                          </Button>
                       </div>
                    </CardContent>
                 </Card>
               ))}
             </div>

             {/* More Info */}
             <div className="bg-white rounded-xl p-8 border border-slate-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-primary-600" /> Informacoes Adicionais</h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Prazos de Entrega</h4>
                    <p>Enviamos para todo o Brasil. O prazo medio e de 5 a 12 dias uteis apos a confirmacao do pedido.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Suporte ao Paciente</h4>
                    <p>Oferecemos acompanhamento farmaceutico gratuito para todos os associados ativos.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
