import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { ConsoleMessage } from '@/components/console-message'
import './globals.css'

export const metadata: Metadata = {
  title: 'DELETO | Secure Credential Sharing',
  description: 'Secure credential sharing with client-side AES-256 encryption',
  keywords: 'secure sharing, password sharing, credential sharing, AES encryption, temporary links, secret sharing, encrypted messages, secure communication, privacy, cybersecurity',
  icons: {
    icon: '/favicon.ico',
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
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`min-h-screen flex flex-col ${GeistSans.className} ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConsoleMessage />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
