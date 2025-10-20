import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTranslations } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || 'en'
  const t = await getTranslations(acceptLanguage)

  return {
    title: t.vs.yopass.metaTitle,
    description: t.vs.yopass.metaDescription,
    openGraph: {
      title: t.vs.yopass.metaOgTitle,
      description: t.vs.yopass.metaOgDescription,
      images: ['/SEO.png'],
    },
  }
}

export default function YopassVsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
