import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTranslations } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || 'en'
  const t = await getTranslations(acceptLanguage)

  return {
    title: t.vs.onetimesecret.metaTitle,
    description: t.vs.onetimesecret.metaDescription,
    openGraph: {
      title: t.vs.onetimesecret.metaOgTitle,
      description: t.vs.onetimesecret.metaOgDescription,
      images: ['/SEO.png'],
    },
  }
}

export default function OneTimeSecretVsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
