import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-mint-200 selection:text-primary-900">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        <div className="mb-10">
          <Link href="/blog">
            <Button variant="ghost" className="text-slate-600 hover:text-primary-700 hover:bg-primary-50 pl-2 pr-4 transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o blog
            </Button>
          </Link>
        </div>

        <article className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-12 lg:p-16 relative overflow-hidden">
           {/* Decorative background */}
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary-50 to-transparent rounded-full blur-[80px] -z-10 opacity-60" />

          <header className="mb-12 text-center max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500 mb-6">
              <Badge variant="outline" className="border-primary-200 text-primary-700 bg-primary-50 px-3 py-1">
                Artigo
              </Badge>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary-400" />
                <time dateTime={post.date}>
                   {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
                </time>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-950 mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.author && (
              <div className="flex items-center justify-center gap-3 text-slate-700">
                <div className="p-1 bg-gradient-to-br from-primary-100 to-mint-100 rounded-full border border-white shadow-sm">
                   <div className="bg-white p-1.5 rounded-full">
                     <User className="w-4 h-4 text-primary-700" />
                   </div>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Escrito por</p>
                  <p className="font-semibold text-sm">{post.author}</p>
                </div>
              </div>
            )}
          </header>

          {post.image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-100 aspect-video relative">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none
              prose-headings:font-serif prose-headings:text-primary-950 prose-headings:font-bold
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-primary-600 prose-a:font-semibold hover:prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-ul:marker:text-primary-400
              prose-blockquote:border-l-primary-300 prose-blockquote:bg-primary-50/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-img:rounded-xl prose-img:shadow-md
              first-letter:text-5xl first-letter:font-serif first-letter:text-primary-600 first-letter:float-left first-letter:mr-3 first-letter:mt-[-0.2em]
              ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-primary-50 to-mint-50 rounded-2xl p-8 border border-primary-100 max-w-2xl mx-auto">
                <h3 className="text-xl font-serif font-bold text-primary-900 mb-2">Gostou deste artigo?</h3>
                <p className="text-slate-600 mb-6">Compartilhe conhecimento e ajude a democratizar o acesso à cannabis medicinal.</p>
                <div className="flex justify-center gap-4">
                     <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20">
                        Compartilhar
                     </Button>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
