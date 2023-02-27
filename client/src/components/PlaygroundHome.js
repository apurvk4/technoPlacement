import Desktop from "./DesktopPlayground";
import Mobile from "./PlaygroundMobile";
import useMediaQuery from "../mediaquery";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../contexts/userContext";
import LangContext from "../contexts/langContext";
const enums = ["c", "cpp", "python3", "java"];
const Home = ({ theme, setTheme }) => {

  const [lang, setLang] = useSearchParams();
  const { setLanguage } = useContext(LangContext);
  const isDesktop = useMediaQuery("(min-width: 800px)");
  const { login, level } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!login && typeof level == "undefined") {
      navigate("/login");
    }
  }, [login]);
  function toggleTheme() {
    setTheme(theme == "light" ? "dark" : "light");
  }
  useEffect(() => {
    if (lang.has("lang")) {
      if (enums.includes(lang.get("lang"))) {
        setLanguage(lang.get("lang"));
      }
    }
  }, [lang]);
  function setView() {
    if (isDesktop) {
      return <Desktop toggleTheme={toggleTheme} />;
    } else {
      return <Mobile toggle={toggleTheme} />;
    }
  }
  return <> {setView()}</>;
};

export default Home;
