import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Footer } from '@/components/footer'
import { ConsoleMessage } from '@/components/console-message'
import './globals.css'

export const metadata: Metadata = {
  title: 'DELE.TO | Your Secret, Your Key, Our Link',
  description: 'Secure credential sharing with client-side AES-256 encryption',
  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'DELE.TO | Your Secret, Your Key, Our Link',
    description: 'Secure credential sharing with client-side AES-256 encryption',
    images: ['/SEO.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DELE.TO | Your Secret, Your Key, Our Link',
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
    'og:title': 'DELE.TO | Your Secret, Your Key, Our Link',
    'og:description': 'Secure credential sharing with client-side AES-256 encryption',
    'og:image': 'https://dele.to/SEO.png',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'DELE.TO | Your Secret, Your Key, Our Link',
    'twitter:description': 'Secure credential sharing with client-side AES-256 encryption',
    'twitter:image': 'https://dele.to/SEO.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head />
      <body className={`min-h-screen flex flex-col ${GeistSans.className}`}>
        <ConsoleMessage />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
