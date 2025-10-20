import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTranslations } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || 'en'
  const t = await getTranslations(acceptLanguage)

  return {
    title: t.vs.passwordpusher.metaTitle,
    description: t.vs.passwordpusher.metaDescription,
    openGraph: {
      title: t.vs.passwordpusher.metaOgTitle,
      description: t.vs.passwordpusher.metaOgDescription,
      images: ['/SEO.png'],
    },
  }
}

export default function PasswordPusherVsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
