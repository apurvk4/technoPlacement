import { createContext } from "react";

const LangContext = createContext({
  language: "cpp",
  setLanguage: () => {},
});
export default LangContext;
