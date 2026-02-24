'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LeadCaptureForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Seu melhor email"
        className="flex-1 px-5 py-4 rounded-full text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
        required
      />
      <Button
        type="submit"
        size="lg"
        className="px-8 py-4 rounded-full bg-white text-primary-700 hover:bg-primary-50 font-bold shadow-lg hover:shadow-xl transition-all h-auto"
      >
        Receber Guia Grátis
        <Download className="w-5 h-5 ml-2" />
      </Button>
    </form>
  );
}
