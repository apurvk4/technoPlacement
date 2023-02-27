// import "./Sidebar.css";
import { useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Cpp from "../images/Cpp.svg";
import C from "../images/C.svg";
import Python from "../images/Python.svg";
import Java from "../images/Java.svg";
import LangContext from "../contexts/langContext";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const { language, setLanguage } = useContext(LangContext);
  const handleChange = (event, nextView) => {
    if (nextView) {
      setLanguage(nextView);
    }
  };
  return (
    <div className="sidebar">
      <ToggleButtonGroup
        orientation="vertical"
        value={language}
        exclusive
        onChange={handleChange}
      >
        <Tooltip value="cpp" title="C++">
          <Link to="/playground?lang=cpp">
            <ToggleButton
              value="cpp"
              className="sidebar-button"
              aria-label="cpp"
              selected={language == "cpp"}
            >
              <img src={Cpp} />
            </ToggleButton>
          </Link>
        </Tooltip>
        <Tooltip value="c" title="C">
          <Link to="/playground?lang=c">
            <ToggleButton
              value="c"
              className="sidebar-button"
              aria-label="c"
              selected={language == "c"}
            >
              <img src={C} />
            </ToggleButton>
          </Link>
        </Tooltip>
        <Tooltip value="python3" title="python3">
          <Link to="/playground?lang=python3">
            <ToggleButton
              value="python3"
              className="sidebar-button"
              aria-label="python3"
              selected={language == "python3"}
            >
              <img src={Python} />
            </ToggleButton>
          </Link>
        </Tooltip>
        <Tooltip value="java" title="java">
          <Link to="/playground?lang=java">
            <ToggleButton
              value="java"
              className="sidebar-button"
              aria-label="java"
              selected={language == "java"}
            >
              <img src={Java} />
            </ToggleButton>
          </Link>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
};
export default Sidebar;
