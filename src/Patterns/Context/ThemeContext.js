import React, { createContext, useState } from "react";

export const Theme = createContext();

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const handleToggle = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const backgroundColor = theme === "light" ? "white" : "black";
  return (
    <Theme.Provider value={{ backgroundColor, handleToggle }}>
      {children}
    </Theme.Provider>
  );
};

export default ThemeContext;
