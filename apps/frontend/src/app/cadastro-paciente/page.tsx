'use client';

import { Header } from '@/components/Header';
import { PatientRegistrationForm } from '@/components/PatientRegistrationForm';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function CadastroPaciente() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-mint-200 selection:text-primary-900 flex flex-col">
      <FloatingWhatsApp />
      <Header />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-950 mb-4 font-serif">
            Comece Seu Tratamento
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Junte-se a milhares de pacientes que encontraram qualidade de vida através da cannabis medicinal.
          </p>
        </div>

        <PatientRegistrationForm />
      </main>

      <footer className="border-t border-slate-100 bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>© 2024 Dona Liamba. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
