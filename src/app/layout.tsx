import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Providers } from '@/components/layout/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  metadataBase: new URL('https://seam-and-sole.example.com'),
  title: {
    default: 'Seam & Sole — Premium Tees & Sneakers Boutique',
    template: '%s | Seam & Sole'
  },
  description: 'A colorful, cinematic boutique e-commerce experience for t-shirts, sneakers and editorial streetwear drops.',
  keywords: ['boutique', 'streetwear', 'graphic tees', 'sneakers', 'drops', 'lookbook', 'Next.js ecommerce'],
  authors: [{ name: 'Seam & Sole' }],
  creator: 'Seam & Sole',
  openGraph: {
    title: 'Seam & Sole',
    description: 'Premium tees, sneakers, drops and outfit editorials.',
    type: 'website',
    siteName: 'Seam & Sole',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seam & Sole',
    description: 'Premium tees, sneakers, drops and outfit editorials.',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="noise">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
