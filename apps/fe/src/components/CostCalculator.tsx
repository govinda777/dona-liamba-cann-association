'use client';

import { useState } from 'react';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function CostCalculator() {
  const [hasPrescription, setHasPrescription] = useState<boolean | null>(null);
  const [plan, setPlan] = useState<'basic' | 'intermediate' | 'premium'>('basic');
  const [frequency, setFrequency] = useState<'daily' | 'moderate' | 'sporadic'>('daily');

  const plans = {
    basic: { name: 'Básico', price: 80, desc: 'Produtos padrão' },
    intermediate: { name: 'Intermediário', price: 150, desc: 'Mais variedade' },
    premium: { name: 'Premium', price: 280, desc: 'Catálogo completo' }
  };

  const frequencies = {
    daily: { label: 'Uso diário (produtos duram ~1 mês)', price: 350 },
    moderate: { label: 'Uso moderado (produtos duram ~2 meses)', price: 175 },
    sporadic: { label: 'Uso esporádico (produtos duram ~3 meses)', price: 117 }
  };

  const consultationPrice = 350;
  const planPrice = plans[plan].price;
  const productPrice = frequencies[frequency].price;

  const initialCost = (hasPrescription === false ? consultationPrice : 0) + planPrice + productPrice;
  const monthlyCost = planPrice + productPrice;

  return (
    <Card className="border-primary-200 shadow-xl bg-white">
      <CardContent className="p-8">
        {/* Perguntas interativas */}
        <div className="space-y-6">
          {/* 1. Primeira consulta médica */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              1. Já tem prescrição médica?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setHasPrescription(true)}
                className={`p-4 border-2 rounded-lg transition-all text-left group focus:outline-none ${
                  hasPrescription === true
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-200'
                    : 'border-slate-200 hover:border-primary-500 hover:bg-primary-50'
                }`}
              >
                <div className={`font-semibold ${hasPrescription === true ? 'text-primary-900' : 'group-hover:text-primary-700'}`}>Sim</div>
                <div className="text-xs text-slate-500 mt-1">Posso pular esta etapa</div>
              </button>
              <button
                onClick={() => setHasPrescription(false)}
                className={`p-4 border-2 rounded-lg text-left shadow-inner transition-all focus:outline-none ${
                  hasPrescription === false
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-200'
                    : 'border-slate-200 hover:border-primary-500 hover:bg-primary-50'
                }`}
              >
                <div className="font-semibold text-primary-900">Não</div>
                <div className="text-xs text-primary-600 mt-1">Vou precisar de consulta</div>
                <div className="text-sm font-bold mt-2 text-primary-800">+ R$ {consultationPrice}</div>
              </button>
            </div>
          </div>

          {/* 2. Tipo de associação */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              2. Qual tipo de plano de associação?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(plans).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setPlan(key as 'basic' | 'intermediate' | 'premium')}
                  className={`p-4 border-2 rounded-lg transition-all text-center ${
                    plan === key
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-500 hover:bg-primary-50'
                  }`}
                >
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{p.desc}</div>
                  <div className="text-lg font-bold text-primary-700 mt-2">R$ {p.price}/mês</div>
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
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'daily' | 'moderate' | 'sporadic')}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none appearance-none bg-white"
              >
                {Object.entries(frequencies).map(([key, f]) => (
                  <option key={key} value={key}>
                    {f.label} - R$ {f.price}/mês
                  </option>
                ))}
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
                <div className="text-4xl font-bold text-slate-900">R$ {initialCost}</div>
              </div>
              <Badge className="bg-primary-600 text-white hover:bg-primary-700">Estimativa</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Consulta médica:</span>
                <span className="font-semibold text-slate-800">
                  {hasPrescription === false ? `R$ ${consultationPrice}` : hasPrescription === true ? 'R$ 0 (Já possui)' : 'Selecione acima'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Mensalidade associação:</span>
                <span className="font-semibold text-slate-800">R$ {planPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Produtos (1º mês):</span>
                <span className="font-semibold text-slate-800">R$ {productPrice}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-primary-300">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">Meses seguintes (média):</span>
                <span className="text-2xl font-bold text-primary-700">R$ {monthlyCost}/mês</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/cadastro-paciente?from=calculadora" className="flex-1">
              <Button className="w-full bg-primary-700 hover:bg-primary-800 text-white h-12 text-lg font-bold">
                Criar Conta e Começar
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
  );
}
