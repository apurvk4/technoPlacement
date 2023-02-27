import { createTheme } from "@mui/material/styles";

const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#e254ff",
      main: "#aa00ff",
      dark: "#7200ca",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
      contrastText: "#ffffff",
    },
  },
});
const DarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  primary: {
    light: "#ff5bff",
    main: "#d500f9",
    dark: "#9e00c5",
    contrastText: "#000000",
  },
  secondary: {
    light: "#8f9bff",
    main: "#536dfe",
    dark: "#0043ca",
    contrastText: "#000000",
  },
});
export { LightTheme, DarkTheme };
