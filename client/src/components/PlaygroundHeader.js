// import "./Header.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";
import { useContext, useState } from "react";
import LangContext from "../contexts/langContext";
import ResultContext from "../contexts/resultContext";
import LoadingContext from "../contexts/loadingContext";
import solution from "../solution";
const Header = (props) => {
  // const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  async function handleClick() {
    updateLoading(true);
    setOutput(null);
    const res = await solution(language, code[language], input);
    updateLoading(false);
    setOutput(res);
  }
  const mode = useTheme();
  const { language, setLanguage } = useContext(LangContext);
  const { setOutput, setCode, code, input } = useContext(ResultContext);
  const { loading, updateLoading } = useContext(LoadingContext);
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  function handle() {
    setChecked(!checked);
    props.toggle();
  }
  return (
    <div className="editor-header">
      <div
        className={
          mode.palette.mode == "light" ? "file-name" : "file-name dark"
        }
      >
        {language == "python3" ? "code.py" : "code." + language}
      </div>
      <div className="editor-btns">
        {/* <button
          type="button"
          className="themebutton light-mode"
          name="dark_light"
          onClick={(e) => {
            toggleDarkLight(e.target);
          }}
          title="Toggle dark/light mode"
        >
          <svg
            className="light"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            onClick={(e) => {
              toggleDarkLight(e.target.parentElement);
            }}
            viewBox="0 0 24 24"
          >
            <path
              fill="#FFFFFF"
              d="M22.534 17.043a.769.769 0 0 0-.854-.238 8.11 8.11 0 0 1-2.747.462c-4.65 0-8.433-3.785-8.433-8.434a8.407 8.407 0 0 1 3.695-6.97.768.768 0 0 0-.32-1.394A7.442 7.442 0 0 0 12.8.4C6.458.4 1.3 5.558 1.3 11.9s5.158 11.5 11.5 11.5c4.025 0 7.687-2.045 9.792-5.47a.772.772 0 0 0-.058-.887z"
            />
          </svg>
          <svg
            className="dark"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            onClick={(e) => {
              toggleDarkLight(e.target.parentElement);
            }}
          >
            <path d="M22.534 17.043a.769.769 0 0 0-.854-.238 8.11 8.11 0 0 1-2.747.462c-4.65 0-8.433-3.785-8.433-8.434a8.407 8.407 0 0 1 3.695-6.97.768.768 0 0 0-.32-1.394A7.442 7.442 0 0 0 12.8.4C6.458.4 1.3 5.558 1.3 11.9s5.158 11.5 11.5 11.5c4.025 0 7.687-2.045 9.792-5.47a.772.772 0 0 0-.058-.887z" />
          </svg>
        </button> */}
        <FormGroup>
          <FormControlLabel
            // onClick={handle}
            onChange={handle}
            checked={checked}
            control={<MaterialUISwitch sx={{ m: 1 }} />}
          />
        </FormGroup>
        {/* <Button variant="contained" className="run">
          Run
        </Button> */}
        <LoadingButton
          size="small"
          onClick={handleClick}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Run
        </LoadingButton>
      </div>
    </div>
  );
};
export default Header;
