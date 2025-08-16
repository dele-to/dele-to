import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '../globals.css'

export const metadata: Metadata = {
    title: 'DELE.TO MiniApp | Secure Credential Sharing',
    description: 'Secure credential sharing with client-side AES-256 encryption - Farcaster MiniApp',
    icons: {
        icon: '/favicon.ico',
    },
    other: {
        'fc:miniapp': 'vNext',
        'fc:miniapp:manifest': '/.well-known/farcaster.json',
    },
}

export default function MiniAppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <head />
            <body className={`min-h-screen ${GeistSans.className}`}>
                {children}
            </body>
        </html>
    )
}