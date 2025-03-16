import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: require("./locales/en.json"),
      },
      es: {
        translation: require("./locales/es.json"),
      }, hi: {
        translation: require("./locales/hi.json"),
      },
    },
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18n;
