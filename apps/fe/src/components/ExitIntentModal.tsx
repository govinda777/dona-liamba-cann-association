'use client';

import { useEffect, useState } from 'react';
import { X, Gift, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full bg-white rounded-2xl shadow-2xl relative animate-scale-in">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          <div className="inline-flex p-4 bg-primary-100 rounded-full mb-4">
            <Gift className="w-12 h-12 text-primary-600" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Espere! Leve Seu Guia Grátis
          </h3>
          <p className="text-slate-600 mb-6">
            Antes de sair, receba nosso <strong>Guia Completo de Cannabis Medicinal</strong> com tudo que você precisa saber para iniciar seu tratamento de forma segura e legal.
          </p>

          <div className="bg-primary-50 rounded-lg p-4 mb-6 text-left space-y-2">
            {[
              'Checklist completo de documentos',
              'Lista de médicos por estado',
              'Tabela de custos médios',
              'Seus direitos como paciente',
              'Perguntas para fazer ao médico'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <form className="space-y-3" onSubmit={(e) => {
              e.preventDefault();
              // In a real app, handle submission
              setIsOpen(false);
          }}>
            <input
              type="email"
              placeholder="Seu melhor email"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary-700 hover:bg-primary-800 text-white"
            >
              Enviar Meu Guia Grátis
            </Button>
          </form>

          <p className="text-xs text-slate-500 mt-4">
            100% gratuito • Sem spam • Pode cancelar quando quiser
          </p>
        </div>
      </Card>
    </div>
  );
}
