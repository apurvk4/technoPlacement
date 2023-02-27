import { useState } from "react";
import ResultContext from "./resultContext";

const ResultProvider = ({ children }) => {
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState(null);
  const [code, setCode] = useState({
    cpp:
      "#include<iostream>" +
      "\n" +
      "using namespace std;" +
      "\n" +
      "int main(){" +
      "\n\n" +
      "return 0;" +
      "\n" +
      "}",
    c:
      "#include<stdio.h>" +
      "\n" +
      "int main(){" +
      "\n\n" +
      "return 0;" +
      "\n" +
      "}\n",
    python3: "print('hi')",
    java:
      "class code {" +
      "\n" +
      "\t" +
      "public static void main(String[] args) {" +
      "\n" +
      "\t\t" +
      'System.out.println("Hello, World!");' +
      "\n" +
      "\t" +
      "}\n" +
      "}",
  });
  return (
    <ResultContext.Provider
      value={{ code, output, input, setCode, setInput, setOutput }}
    >
      {children}
    </ResultContext.Provider>
  );
};
export default ResultProvider;
