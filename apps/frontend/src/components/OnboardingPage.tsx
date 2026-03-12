'use client';

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, User, FileText, ClipboardCheck, Loader2 } from 'lucide-react';

interface OnboardingPageProps {
  role: 'doctor' | 'association' | 'patient';
  title: string;
}

export default function OnboardingPage({ role, title }: OnboardingPageProps) {
  const { user, authenticated, login, ready } = usePrivy();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', registration: '', description: '', phone: '', email: '', hasPrescription: false });
  const [loading, setLoading] = useState(false);
  const [dbLoading, setDbLoading] = useState(true);

  const walletAddress = user?.wallet?.address;

  useEffect(() => {
    if (ready && authenticated && walletAddress) {
      fetch(`/api/onboarding?walletAddress=${walletAddress}&role=${role}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.step) {
            setStep(data.step);
            setFormData(prev => ({ ...prev, ...(data.data || {}) }));
          }
          setDbLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setDbLoading(false);
        });
    } else if (ready) {
      setDbLoading(false);
    }
  }, [ready, authenticated, walletAddress, role]);

  const updateOnboarding = async (nextStep: number, newData: Record<string, unknown>) => {
    setLoading(true);
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress,
          role,
          step: nextStep,
          data: newData,
        }),
      });
      setStep(nextStep);
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!ready || dbLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary-600 w-12 h-12" /></div>;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{title} Onboarding</h1>
        <p className="text-slate-600 mb-8 text-center max-w-md">To start your registration as a {role}, please connect your wallet securely.</p>
        <Button onClick={login} size="lg" className="bg-primary-600 hover:bg-primary-700">Connect to Start</Button>
      </div>
    );
  }

  const steps = [
    { id: 1, label: 'Basic Data', icon: User },
    { id: 2, label: role === 'doctor' ? 'CRM' : role === 'association' ? 'CNPJ' : 'Details', icon: FileText },
    { id: 3, label: 'Approval', icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">{title} Registration</h1>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center flex-1 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${step >= s.id ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs mt-2 font-medium ${step >= s.id ? 'text-primary-700' : 'text-slate-400'}`}>{s.label}</span>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-0 ${step > s.id ? 'bg-primary-500' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="shadow-xl border-primary-100">
          <CardHeader>
            <CardTitle>{steps[step - 1].label}</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name / Business Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Dr. John Doe or Association XYZ"
                  />
                </div>
                {role === 'patient' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-md"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </>
                )}
                <Button onClick={() => updateOnboarding(2, formData)} className="w-full" disabled={!formData.name || loading}>
                  {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Next Step'}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {role !== 'patient' ? (
                  <div>
                    <label className="block text-sm font-medium mb-1">{role === 'doctor' ? 'CRM' : 'CNPJ'}</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={formData.registration}
                      onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
                      placeholder={role === 'doctor' ? 'CRM-UF XXXXXX' : 'XX.XXX.XXX/XXXX-XX'}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={formData.hasPrescription}
                        onChange={(e) => setFormData({ ...formData, hasPrescription: e.target.checked })}
                        className="w-5 h-5 text-primary-600"
                      />
                      <span className="text-slate-700 font-medium">I already have a medical prescription</span>
                    </label>
                  </div>
                )}
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button onClick={() => updateOnboarding(3, formData)} className="flex-1" disabled={(role !== 'patient' && !formData.registration) || loading}>
                    {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Finish Registration'}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ClipboardCheck className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Registration Under Review</h3>
                <p className="text-slate-600 mb-6">We have received your details. Our team will verify your information within 48 business hours.</p>
                <Button variant="outline" onClick={() => router.push('/')}>Back to Home</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
