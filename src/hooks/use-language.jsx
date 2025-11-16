import { useContext } from "react";
import { LanguageContext } from "../contexts/language-context";

export const useLanguage = () => {
  const language = useContext(LanguageContext);

  return language;
};
