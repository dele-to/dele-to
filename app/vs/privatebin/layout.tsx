import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTranslations } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || 'en'
  const t = await getTranslations(acceptLanguage)

  return {
    title: t.vs.privatebin.metaTitle,
    description: t.vs.privatebin.metaDescription,
    openGraph: {
      title: t.vs.privatebin.metaOgTitle,
      description: t.vs.privatebin.metaOgDescription,
      images: ['/SEO.png'],
    },
  }
}

export default function PrivateBinVsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
