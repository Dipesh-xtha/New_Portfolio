import type { Metadata, Viewport } from 'next';
import { DM_Sans, Inter, Outfit, Young_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Cursor from '@/components/Cursor';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-young-serif',
  display: 'swap',
});

const notoSerifDevanagari = localFont({
  src: '../public/fonts/NotoSerifDevanagari-Variable.ttf',
  weight: '100 900',
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dipeshshrestha69.com.np'),
  title: 'Product Designer in Kathmandu, Nepal | Dipesh Shrestha',
  description:
    'Explore product design case studies by Dipesh Shrestha in Kathmandu: Bugv website, KYC, and B2B workflows. See the work and get in touch.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Product Designer in Kathmandu, Nepal | Dipesh Shrestha',
    description: 'Explore Bugv website, KYC, and B2B product design case studies by Dipesh Shrestha in Kathmandu.',
    url: '/',
    type: 'website',
    images: [{ url: '/assets/hero-portrait.webp', width: 1600, height: 843, alt: 'Dipesh Shrestha, product designer' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#f8eee5',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${inter.variable} ${outfit.variable} ${youngSerif.variable} ${notoSerifDevanagari.variable}`}
    >
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
