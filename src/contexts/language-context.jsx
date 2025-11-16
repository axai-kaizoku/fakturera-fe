import { createContext, useEffect, useState } from "react";
import { getTranslations } from "../api/translations";
import { useTranslationStore } from "../store";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const [translations, setTranslations] = useState({});
  const cachedTranslations = useTranslationStore((store) => store.translation);
  const setCachedTranslations = useTranslationStore((store) => store.setTranslation);

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  const loadTranslations = async (language) => {
    if (language in cachedTranslations) {
      setTranslations(cachedTranslations[language]);
      return;
    }
    const data = await getTranslations(language);
    if (data.data) {
      setCachedTranslations({ ...cachedTranslations, ...{ [language]: data.data } });
    }
    setTranslations(data.data);
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key, defaultValue) => {
    return translations[key] || defaultValue;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, changeLanguage }}>{children}</LanguageContext.Provider>
  );
};
