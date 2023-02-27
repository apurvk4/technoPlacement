import { useState } from "react";
import LangContext from "./langContext";
function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const LangProvider = ({ children }) => {
  const [language, sLanguage] = useState("cpp");
  function setLanguage(lang) {
    let l = lang == "python3" ? "python" : lang;
    document.title = "Online " + capFirstLetter(l) + " Compiler";
    sLanguage(lang);
  }
  return (
    <LangContext.Provider value={{ language, setLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
