import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/structured-data'

import { Providers } from '@/components/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Onemovie - Watch Movies & Web Series Online Free',

  description:
    'Onemovie is your ultimate destination for streaming Bollywood, Hollywood, and South Indian movies online. Watch the latest movies and web series in HD quality for free.',

  keywords:
    'movies, streaming, Bollywood, Hollywood, South Indian, web series, watch online, free movies, HD movies',

  generator: 'v0.app',

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },

  openGraph: {
    title: 'Onemovie - Watch Movies & Web Series Online Free',
    description:
      'Your ultimate destination for streaming movies and web series online.',
    type: 'website',
    siteName: 'Onemovie',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Onemovie - Watch Movies & Web Series Online Free',
    description:
      'Stream Bollywood, Hollywood, and South Indian movies online for free.',
  },

  other: {
    'google-adsense-account': 'ca-pub-5319727568049071',
  },

  metadataBase: new URL('https://www.onemovie.in'),

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

  alternates: {
    canonical: 'https://www.onemovie.in',
  },
}

export const viewport: Viewport = {
  themeColor: '#e54d2e',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()

  return (
    <html
      lang="en"
      className="dark"
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Preconnect to external resources */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google AdSense */}
        <meta
          name="google-adsense-account"
          content="ca-pub-5319727568049071"
        />

        {/* Web App Manifest */}
        <link
          rel="manifest"
          href="/manifest.json"
        />

        {/* Theme Color */}
        <meta
          name="theme-color"
          content="#000000"
        />

        {/* Organization Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Structured Data */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>

        {/* Vercel Analytics */}
        <Analytics />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5319727568049071"
          crossOrigin="anonymous"
        />

        {/* Service Worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function (registration) {
                      console.log(
                        'OneMovie Service Worker registered:',
                        registration.scope
                      );
                    })
                    .catch(function (error) {
                      console.error(
                        'OneMovie Service Worker registration failed:',
                        error
                      );
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}