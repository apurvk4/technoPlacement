import Header from "./PlaygroundHeader";
import Editor from "@monaco-editor/react";
import { useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import LangContext from "../contexts/langContext";
import useMediaQuery from "../mediaquery";
import Fab from "@mui/material/Fab";
import LoadingContext from "../contexts/loadingContext";
import ResultContext from "../contexts/resultContext";
import solution from "../solution";
import Loading from "./Loading";
const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};
const codeEditor = (props) => {
  const handleEditorDidMount = (editor) => {
    updateLoading(false);
  };
  const theme = useTheme();
  const { language } = useContext(LangContext);
  const { loading, updateLoading } = useContext(LoadingContext);
  const isDesktop = useMediaQuery("(min-width : 800px)");
  const { input, code, setCode, setOutput } = useContext(ResultContext);
  function editorUpdate(value) {
    setCode({ ...code, [language]: value });
  }
  function setEditorLang() {
    let v = language == "python3" ? "python" : language;
    return v;
  }
  async function getResult() {
    if (language == "java") {
      alert("donot change the name of the class otherwise it may not work.");
    }
    setOutput(null);
    updateLoading(true);
    const res = await solution(language, code[language], input);
    updateLoading(false);
    setOutput(res);
    // .then((res) => res.json())
    // .then((res) => {
    //   setResult(res.result);
    //   outRef.current.value = result;
    // })
    // .catch((e) => console.log(e));
  }
  return (
    <div className="editor">
      {isDesktop ? <Header toggle={props.toggle} /> : ""}
      <Editor
        theme={theme.palette.mode == "dark" ? "vs-dark" : "light"}
        defaultLanguage="cpp"
        language={setEditorLang()}
        onMount={handleEditorDidMount}
        loading={
          <div style={{ width: "100%", height: "100%" }}>
            {" "}
            <Loading />
          </div>
        }
        options={{
          fontSize: "18px",
        }}
        className="text-editor"
        style={{ borderRadius: "10px" }}
        // defaultValue={code[language] == undefined ? "" : code[language]}
        value={code[language]}
        onChange={editorUpdate}
      />
      {!isDesktop ? (
        <Fab
          onClick={getResult}
          style={style}
          color="primary"
          aria-label="add"
          disabled={loading ? true : false}
        >
          Run
        </Fab>
      ) : (
        ""
      )}
    </div>
  );
};
export default codeEditor;
