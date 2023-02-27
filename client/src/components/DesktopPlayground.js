import Split from "react-split";
import CodeEditor from "./PlaygroundCodeEditor";
import Sidebar from "./PlaygroundSidebar";
import Output from "./PlaygroundOutput";
// import "./Desktop.css";
const Desktop = (props) => {
  return (
    <div style={{ display: "flex", paddingTop: "70px" }}>
      <Sidebar />
      <Split
        className="split"
        style={{
          height: "calc(100vh - 65px)",
          width: "calc(100vw - 58px)",
          display: "flex",
        }}
      >
        <CodeEditor toggle={props.toggleTheme} />
        <Output />
      </Split>
    </div>
  );
};
export default Desktop;
