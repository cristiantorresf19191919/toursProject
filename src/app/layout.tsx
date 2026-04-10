import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Cartagena Tours | Experiencias Inolvidables en el Caribe Colombiano',
  description:
    'Descubre la magia de Cartagena de Indias. Tours por islas paradisiacas, beach clubs exclusivos, buceo PADI, pasadias y experiencias autenticas en el Caribe colombiano. Reserva tu aventura hoy.',
  keywords: [
    'Cartagena tours',
    'Islas del Rosario',
    'Beach clubs Cartagena',
    'Buceo Cartagena',
    'Tours Cartagena Colombia',
    'Pasadias Cartagena',
    'Playa Blanca',
    'Experiencias Caribe',
  ],
  openGraph: {
    title: 'Cartagena Tours | Experiencias en el Caribe Colombiano',
    description:
      'Tours por islas paradisiacas, beach clubs exclusivos y aventuras submarinas en Cartagena de Indias.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Cartagena Tours',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cartagena Tours | Caribe Colombiano',
    description: 'Experiencias inolvidables en Cartagena de Indias',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
