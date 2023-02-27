import React, { useState } from "react";
// import "./App.css";
// import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
// import Header from "../Sidebar/Sidebar";
// import "@fontsource/roboto";
import LangProvider from "../contexts/langProvider";
import LoadingProvider from "../contexts/loadingProvider";
import ResultProvider from "../contexts/resultProvider";
import { DarkTheme, LightTheme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./PlaygroundHome";

// import useMediaQuery from
const PlayGround = () => {
  const [theme, setTheme] = useState("light");
  // useEffect(() => {
  //   document.getElementById("preload").classList.add("hide");
  //   setLoading(false);
  // }, []);

  return (
    <ResultProvider>
      <LoadingProvider>
        <LangProvider>
          <ThemeProvider theme={theme == "light" ? LightTheme : DarkTheme}>
            <Home theme={theme} setTheme={setTheme} />
          </ThemeProvider>
        </LangProvider>
      </LoadingProvider>
    </ResultProvider>
  );
};
export default PlayGround;
