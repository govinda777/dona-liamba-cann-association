'use client';

import { MessageCircle, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 group"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7 group-hover:animate-bounce" />
        )}
      </button>

      {/* Card de mensagem */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 animate-slide-up">
          <div className="bg-[#25D366] text-white p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">Suporte Dona Liamba</div>
                <div className="text-xs opacity-90">Online agora</div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="bg-slate-100 rounded-lg p-3 text-sm">
              <p className="mb-2">👋 Olá! Como posso ajudar você hoje?</p>
              <p className="text-xs text-slate-600">Tempo médio de resposta: 2 minutos</p>
            </div>

            <div className="space-y-2">
              {[
                { emoji: '🏥', text: 'Quero encontrar um médico' },
                { emoji: '🏢', text: 'Preciso de uma associação' },
                { emoji: '💰', text: 'Dúvidas sobre custos' },
                { emoji: '📋', text: 'Como funciona o processo?' }
              ].map((option, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3 border-2 border-slate-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-sm"
                >
                  <span className="mr-2">{option.emoji}</span>
                  {option.text}
                </button>
              ))}
            </div>

            <a
              href="https://wa.me/5511999999999?text=Olá! Vim do site Dona Liamba e gostaria de ajuda"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
                <MessageCircle className="w-5 h-5 mr-2" />
                Conversar no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
