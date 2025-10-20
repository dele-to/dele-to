import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTranslations } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || 'en'
  const t = await getTranslations(acceptLanguage)

  return {
    title: t.alternatives.metaTitle,
    description: t.alternatives.metaDescription,
    openGraph: {
      title: t.alternatives.metaOgTitle,
      description: t.alternatives.metaOgDescription,
      images: ['/SEO.png'],
    },
  }
}

export default function AlternativesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
