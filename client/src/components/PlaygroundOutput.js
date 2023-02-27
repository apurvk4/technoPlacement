// import "./Output.css";
// import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import ResultContext from "../contexts/resultContext";
import { useContext } from "react";
const Output = () => {
  const theme = useTheme();
  const { output, input, setInput } = useContext(ResultContext);
  const styleLight = {
    backgroundColor: "#fff",
    color: "#000",
    borderBottom: "1px solid rgba(0,0,0,0.125)",
  };
  const styleDark = {
    backgroundColor: "#000",
    color: "#fff",
    borderBottom: "1px solid rgb(52,56,58)",
  };
  return (
    <div className="output">
      <textarea
        disabled
        placeholder="output"
        className="output-result"
        style={theme.palette.mode == "light" ? styleLight : styleDark}
        value={output == null ? "" : output.result}
        readOnly={true}
      />
      <textarea
        className="output-inp"
        placeholder="input"
        style={theme.palette.mode == "light" ? styleLight : styleDark}
        value={input == null ? "" : input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
export default Output;
