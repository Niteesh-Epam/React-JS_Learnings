import React, { useContext } from "react";
import { TransContext } from "../Patterns/Context/TranslationContext";
import { translations } from "../Patterns/Context/TranslationContext";
import { Theme } from "../Patterns/Context/ThemeContext";

const Translation = () => {
  const { translation, setLanguage } = useContext(TransContext);
  const { backgroundColor, handleToggle } = useContext(Theme);
  const transoptions = Object.keys(translations);

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)}>
        {transoptions.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </select>
      <div
        style={{
          backgroundColor: backgroundColor,
          color: backgroundColor === "black" ? "white" : "",
        }}>
        Hi Niteesh .. {translation.welcomeMessage}
      </div>
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
};

export default Translation;
