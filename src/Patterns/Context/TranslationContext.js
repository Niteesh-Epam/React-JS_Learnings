import React, { createContext, useState } from "react";

export const translations = {
  english: {
    welcomeMessage: "Welcome!",
    goodbyeMessage: "Goodbye!",
  },
  spanish: {
    welcomeMessage: "¡Bienvenido!",
    goodbyeMessage: "¡Adiós!",
  },
  french: {
    welcomeMessage: "Bienvenue!",
    goodbyeMessage: "Au revoir!",
  },
};

export const TransContext = createContext();

const TranslationContext = ({ children }) => {
  const [language, setLanguage] = useState("english");

  const translation = translations[`${language}`];
  return (
    <TransContext.Provider value={{ translation, setLanguage }}>
      {children}
    </TransContext.Provider>
  );
};

export default TranslationContext;
