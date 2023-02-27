import { createContext } from "react";

const ResultContext = createContext({
  output: null,
  input: null,
  code: {
    cpp: undefined,
    c: undefined,
    python3: undefined,
    java: undefined,
  },
  setOutput: () => {},
  setInput: () => {},
  setCode: () => {},
});
export default ResultContext;
