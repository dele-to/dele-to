import { resources } from './locales'
import type { TranslationKeys } from './types'

const translations: Record<string, TranslationKeys> = {
  sq: resources.sq.translation,
  en: resources.en.translation,
  es: resources.es.translation,
  fr: resources.fr.translation,
  de: resources.de.translation,
}

export async function getTranslations(acceptLanguage: string): Promise<TranslationKeys> {
  // Parse accept-language header to get preferred language
  const preferredLang = acceptLanguage
    .split(',')[0]
    .split('-')[0]
    .toLowerCase()

  // Return the appropriate translation or fallback to English
  return translations[preferredLang] || translations.en
}
