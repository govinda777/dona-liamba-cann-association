import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "../providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Dona Liamba - Plataforma Oficial de Cannabis Medicinal no Brasil',
  description: 'Conecte-se a médicos prescritores, descubra associações confiáveis e organize seu tratamento com cannabis medicinal legal. +12.500 pacientes atendidos.',
  keywords: 'cannabis medicinal brasil, associações cannabis, médico prescritor cannabis, tratamento canabidiol, cbd legal, prescrição cannabis',
  authors: [{ name: 'Dona Liamba' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dona-liamba-cann-association-fronte.vercel.app',
    title: 'Dona Liamba - Cannabis Medicinal Legal no Brasil',
    description: 'Encontre médicos, associações e organize seu tratamento em um só lugar',
    siteName: 'Dona Liamba',
    images: [{
      url: '/og-image.png', // Placeholder
      width: 1200,
      height: 630,
      alt: 'Dona Liamba - Hub Cannabis Medicinal'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dona Liamba - Cannabis Medicinal Legal',
    description: 'Plataforma que conecta pacientes, médicos e associações',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'seu-codigo-google-search-console',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dona Liamba',
    url: 'https://dona-liamba-cann-association-fronte.vercel.app',
    description: 'Plataforma que conecta pacientes, médicos prescritores e associações de cannabis medicinal no Brasil',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://dona-liamba-cann-association-fronte.vercel.app/buscar?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-montserrat antialiased bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
