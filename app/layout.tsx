import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  serializeJsonLd,
} from '@/lib/structured-data'

import { Providers } from '@/components/providers'
import { SITE_URL } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

// Public GA4 measurement ID (not a secret)
const GA_MEASUREMENT_ID = 'G-KJ3NX7H5P2'

export const metadata: Metadata = {
  title: 'Onemovie | Movies and Web Series',

  description:
    'Browse movies and web series, including Bollywood, Hollywood, and South Indian titles, on Onemovie.',

  // Film reel from the OneMovie logo, on a dark red tile.
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
      },
      {
        url: '/favicon-192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      sizes: '180x180',
    },
  },

  openGraph: {
    title: 'Onemovie | Movies and Web Series',
    description:
      'Browse movies and web series on Onemovie.',
    type: 'website',
    siteName: 'Onemovie',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Onemovie | Movies and Web Series',
    description:
      'Browse Bollywood, Hollywood, and South Indian movies and web series.',
  },

  metadataBase: new URL(SITE_URL),

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
    canonical: '/',
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
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationSchema),
          }}
        />

        {/* Website Structured Data */}
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(websiteSchema),
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

        {/* Google Analytics 4. The root layout mounts once, so the tag loads once per visit.
            Page views on client-side navigation come from GA4 enhanced measurement (browser history events). */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

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
