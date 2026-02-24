import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
      <footer className="border-t border-slate-100 bg-slate-50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                 <div className="flex items-center gap-2 mb-6">
                    <Leaf className="w-6 h-6 text-primary-600" />
                    <span className="text-xl font-serif font-bold text-primary-900">Dona Liamba</span>
                 </div>
                 <p className="text-slate-500 max-w-xs leading-relaxed">
                    Conectando pacientes, médicos e associações para democratizar o acesso à saúde canábica no Brasil.
                 </p>
              </div>
              <div>
                 <h4 className="font-bold text-slate-900 mb-6">Plataforma</h4>
                 <ul className="space-y-4 text-slate-600">
                    <li><Link href="/#para-quem" className="hover:text-primary-600 transition-colors">Para Pacientes</Link></li>
                    <li><Link href="/#para-quem" className="hover:text-primary-600 transition-colors">Para Médicos</Link></li>
                    <li><Link href="/#associacoes" className="hover:text-primary-600 transition-colors">Para Associações</Link></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                 <ul className="space-y-4 text-slate-600">
                    <li><Link href="#" className="hover:text-primary-600 transition-colors">Termos de Uso</Link></li>
                    <li><Link href="#" className="hover:text-primary-600 transition-colors">Privacidade</Link></li>
                    <li><Link href="#" className="hover:text-primary-600 transition-colors">Sobre Nós</Link></li>
                 </ul>
              </div>
           </div>

           <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
             <p>© 2024 Dona Liamba. Todos os direitos reservados.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-primary-600">Instagram</a>
                <a href="#" className="hover:text-primary-600">LinkedIn</a>
                <a href="#" className="hover:text-primary-600">Twitter</a>
             </div>
           </div>
        </div>
      </footer>
  );
}
