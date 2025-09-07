import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Footer } from '@/components/footer'
import { ConsoleMessage } from '@/components/console-message'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'
import './globals.css'

export const metadata: Metadata = {
  title: 'DELETO | Secure Credential Sharing',
  description: 'Secure credential sharing with client-side AES-256 encryption',
  keywords: 'secure sharing, password sharing, credential sharing, AES encryption, temporary links, secret sharing, encrypted messages, secure communication, privacy, cybersecurity',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DELE.TO',
  },

  openGraph: {
    title: 'DELETO | Secure Credential Sharing',
    description: 'Secure credential sharing with client-side AES-256 encryption',
    images: ['/SEO.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DELETO | Secure Credential Sharing',
    description: 'Secure credential sharing with client-side AES-256 encryption',
    images: ['/SEO.png'],
  },
  other: {
    'fc:miniapp': 'vNext',
    'fc:miniapp:name': 'DELE.TO',
    'fc:miniapp:icon': 'https://dele.to/favicon.png',
    'fc:miniapp:url': 'https://dele.to/miniapp',
    'fc:miniapp:buttonTitle': '🔒 Share Securely',
    'fc:miniapp:splashImageUrl': 'https://dele.to/favicon.png',
    'fc:miniapp:splashBackgroundColor': '#f8fafc',
    'fc:miniapp:manifest': 'https://dele.to/.well-known/farcaster.json',
    'og:title': 'DELETO | Secure Credential Sharing',
    'og:description': 'Secure credential sharing with client-side AES-256 encryption',
    'og:image': 'https://dele.to/SEO.png',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'DELETO | Secure Credential Sharing',
    'twitter:description': 'Secure credential sharing with client-side AES-256 encryption',
    'twitter:image': 'https://dele.to/SEO.png',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'DELE.TO',
    'mobile-web-app-capable': 'yes',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`min-h-screen flex flex-col ${GeistSans.className}`}>
        <ConsoleMessage />
        <main className="flex-1">{children}</main>
        <Footer />
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
