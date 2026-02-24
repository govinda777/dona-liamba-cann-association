import { getAllPosts } from '@/lib/blog';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const revalidate = 3600;

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-mint-200 selection:text-primary-900">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary-50 text-primary-700 border-primary-200 inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-wide font-medium rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
            Conteúdo Exclusivo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-950 mb-6 tracking-tight">
            Blog Dona Liamba
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Informações atualizadas sobre cannabis medicinal, legislação, saúde e bem-estar para você acompanhar de perto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <Card className="h-full border-primary-100/50 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white flex flex-col">
                {post.image && (
                   <div className="aspect-video bg-slate-100 relative overflow-hidden group-hover:brightness-105 transition-all">
                      {/* Using simple div for now, usually next/image */}
                      <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${post.image})` }} />
                   </div>
                )}
                {!post.image && (
                   <div className="aspect-video bg-gradient-to-br from-primary-50 to-mint-50 flex items-center justify-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-organic-pattern opacity-5" />
                       <span className="text-primary-200 font-serif text-4xl font-bold opacity-20">DL</span>
                   </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-medium">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-primary-400" />
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
                      </time>
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary-400" />
                        <span className="truncate max-w-[100px]">{post.author}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2 leading-tight font-serif">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-3 text-sm text-slate-600 leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardContent>
                <div className="px-6 pb-6 pt-0 mt-auto">
                    <div className="text-primary-600 text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                        Ler artigo completo <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
