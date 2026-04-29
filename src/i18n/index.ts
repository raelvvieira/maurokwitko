import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';
import es from './locales/es.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'pt-BR', short: 'PT', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', short: 'EN', label: 'English', flag: '🇺🇸' },
  { code: 'es', short: 'ES', label: 'Español', flag: '🇪🇸' },
] as const;

export const getArrayTranslation = <T = string,>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      pt: { translation: ptBR },
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'pt', 'en', 'es'],
    nonExplicitSupportedLngs: true,
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false, bindI18n: 'languageChanged loaded' },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

// Keep <html lang> in sync
const updateHtmlLang = (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
};
updateHtmlLang(i18n.language);
i18n.on('languageChanged', updateHtmlLang);

export default i18n;
