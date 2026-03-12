'use client';

import { useState } from 'react';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';

export function LeadCaptureForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const generateGuidePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(21, 128, 61); // Verde primário
    doc.text('Guia Oficial Dona Liamba', 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Como Começar o Tratamento Legal no Brasil', 20, 30);

    doc.setFontSize(12);
    const content = [
      '1. Consulta Médica: O primeiro passo é encontrar um médico prescritor.',
      '2. Prescrição: O médico emitirá o receituário com os produtos indicados.',
      '3. Cadastro Anvisa: Para importação, é necessário o cadastro no site da Anvisa.',
      '4. Associações: Você pode se filiar a uma entidade para facilitar o acesso.',
      '',
      'Dona Liamba - Conectando saúde e bem-estar.'
    ];

    let y = 50;
    content.forEach(line => {
      doc.text(line, 20, y);
      y += 10;
    });

    doc.save('guia-dona-liamba.pdf');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        generateGuidePDF();
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
        <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-4" />
        <h4 className="text-xl font-bold text-white mb-2">Inscrição Realizada!</h4>
        <p className="text-white/80">Seu guia foi baixado e você receberá logo mais informações.</p>
        <Button
          variant="ghost"
          onClick={() => setStatus('idle')}
          className="mt-4 text-white hover:bg-white/10"
        >
          Enviar para outro e-mail
        </Button>
      </div>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-5 py-4 rounded-full text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
        required
        disabled={status === 'loading'}
      />
      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading'}
        className="px-8 py-4 rounded-full bg-white text-primary-700 hover:bg-primary-50 font-bold shadow-lg hover:shadow-xl transition-all h-auto min-w-[200px]"
      >
        {status === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Receber Guia Gratuito
            <Download className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
      {status === 'error' && (
        <p className="absolute -bottom-6 left-1/2 -translated-x-1/2 text-red-200 text-xs">
          Ocorreu um erro. Tente novamente.
        </p>
      )}
    </form>
  );
}
