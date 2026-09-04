import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} – ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="icon" href="/logo-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body style={{ paddingTop: '36px' }}>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
