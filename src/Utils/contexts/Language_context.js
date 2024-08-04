import React, { useState } from "react";
import languages from "../Translation/translation";
import { LanguageContext } from "./all_contexts";
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");
  languages.locale = language;
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
