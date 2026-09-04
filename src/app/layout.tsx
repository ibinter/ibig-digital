import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { SITE } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import AffiliateTracker from '@/components/AffiliateTracker'
import PwaInstall from '@/components/ui/PwaInstall'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd'

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
  alternates: { canonical: SITE.url },
  manifest: '/manifest.webmanifest',
  applicationName: SITE.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE.name,
  },
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: '/logo-full.png', width: 1060, height: 60, alt: 'IBIG DIGITAL' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    images: ['/logo-full.png'],
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="IBIG DIGITAL" />
        <meta name="theme-color" content="#003B7A" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body style={{ paddingTop: '36px' }}>
        <Suspense fallback={null}><AffiliateTracker /></Suspense>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <PwaInstall />
      </body>
    </html>
  )
}
