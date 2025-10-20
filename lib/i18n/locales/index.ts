import { en } from './en';
import { sq } from './sq';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';

export const resources = {
  en: { translation: en },
  sq: { translation: sq },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
} as const;

export const languages = {
  en: 'English',
  sq: 'Shqip',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
} as const;

export type Language = keyof typeof languages;
