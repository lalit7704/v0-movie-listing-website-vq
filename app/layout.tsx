import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  title: 'Onemovie - Watch Movies & Web Series Online Free',
  description: 'Onemovie is your ultimate destination for streaming Bollywood, Hollywood, and South Indian movies online. Watch the latest movies and web series in HD quality for free.',
  keywords: 'movies, streaming, Bollywood, Hollywood, South Indian, web series, watch online, free movies, HD movies',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: 'https://drive.google.com/file/d/1_AjISitQUhYdS2M3-4Pc0KMEFR_gMrMd/view?usp=drive_link',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'https://drive.google.com/file/d/1_AjISitQUhYdS2M3-4Pc0KMEFR_gMrMd/view?usp=drive_link',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'https://drive.google.com/file/d/1_AjISitQUhYdS2M3-4Pc0KMEFR_gMrMd/view?usp=drive_link',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Onemovie - Watch Movies & Web Series Online Free',
    description: 'Your ultimate destination for streaming movies and web series online.',
    type: 'website',
    siteName: 'Onemovie',
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
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
