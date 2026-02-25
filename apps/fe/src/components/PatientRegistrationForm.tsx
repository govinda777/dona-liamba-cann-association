'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, User, Mail, Phone, FileText } from 'lucide-react';

export function PatientRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hasPrescription: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto border-primary-200 shadow-xl bg-white">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Cadastro Recebido!</h3>
          <p className="text-slate-600">
            Obrigado, {formData.name}. Entraremos em contato em breve pelo email {formData.email} para dar continuidade ao seu tratamento.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
            Voltar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto border-primary-200 shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary-900">Criar Conta</CardTitle>
        <CardDescription className="text-center">
          Preencha seus dados para iniciar sua jornada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-primary-500" /> Nome Completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary-500" /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary-500" /> Telefone / WhatsApp
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                name="hasPrescription"
                checked={formData.hasPrescription}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
              />
              <span className="text-slate-700 font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-500" />
                Já possuo prescrição médica
              </span>
            </label>
          </div>

          <Button type="submit" className="w-full bg-primary-700 hover:bg-primary-800 text-white font-bold py-3 mt-4">
            Cadastrar Gratuitamente
          </Button>

          <p className="text-xs text-center text-slate-500 mt-4">
            Seus dados estão protegidos e não serão compartilhados sem sua autorização.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
