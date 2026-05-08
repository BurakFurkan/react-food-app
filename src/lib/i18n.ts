import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translationsEn, translationsTr } from '@/features/translations'

// Initialize synchronously at module load so useTranslation() always has an instance
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: { translation: translationsEn },
      tr: { translation: translationsTr },
    },
    interpolation: { escapeValue: false },
  })
}

export function initI18n(lang = 'en') {
  if (i18n.language !== lang) i18n.changeLanguage(lang)
  return i18n
}

export default i18n
