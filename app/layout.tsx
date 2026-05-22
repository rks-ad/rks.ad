import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RKS, Advocate | LawUp™ - Best Advocate in Jaipur & India | Legal Services',
  description: 'Raavi K Sharma & Ravi Kumar Sharma - Premier law firm in Jaipur. 6+ years expertise in Civil, Criminal, Corporate, Banking, GST, NCLT, Cyber Law, RERA, Family Law. Best advocates for legal solutions in Rajasthan & India.',
  keywords: [
    'advocate',
    'lawyer',
    'best advocate in jaipur',
    'best advocate in rajasthan',
    'best advocate in india',
    'legal services jaipur',
    'RKS Advocate',
    'Raavi K Sharma',
    'Ravi Kumar Sharma',
    'civil lawyer',
    'criminal lawyer',
    'corporate lawyer',
    'tax lawyer',
    'litigation lawyer',
    'NCLT advocate',
    'GST expert',
    'banking law',
    'real estate lawyer',
    'RERA advocate',
    'cyber law expert',
    'family law advocate',
    'intellectual property lawyer',
    'consumer rights lawyer',
    'labour law advocate',
    'LawUp',
    'legal consultation',
    'online consultation',
    'video consultation',
    'jaipur legal services',
    'rajasthan advocate',
    'india legal services',
    'court representation',
    'legal advice',
    'case filing',
    'contract drafting',
    'property dispute resolution',
    'business law',
    'contract law',
    'tort law',
    'administrative law',
    'regulatory compliance',
    'business consultation',
    'legal expertise',
    'professional advocate',
    'experienced lawyer',
  ],
  authors: [
    { name: 'Raavi K Sharma, Advocate' },
    { name: 'Ravi Kumar Sharma, Advocate' },
  ],
  creator: 'RKS, Advocate',
  publisher: 'LawUp™',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'RKS, Advocate | LawUp™ - Best Legal Services in Jaipur, India',
    description: 'Expert legal services by Raavi K Sharma & Ravi Kumar Sharma. 6+ years experience in Civil, Criminal, Corporate, Banking, GST, NCLT, Cyber Law, Real Estate, Family Law and more.',
    url: 'https://www.rks.ad',
    siteName: 'RKS, Advocate - LawUp™',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.gif',
        width: 1200,
        height: 1200,
        alt: 'LawUp™ - RKS Advocate Logo',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.rks.ad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background scroll-smooth`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
