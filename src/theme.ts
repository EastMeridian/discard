import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
  colors: {
    surface: {
      main: "#f2f3f5",
      light: "#fafafa",
      dark: "#ebedef",
      active: "#d2d2d3",
      background: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      main: "black",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
  colors: {
    surface: {
      main: "#242526",
      light: "#3a3b3c",
      dark: "#1d1e1e",
      active: "#0e0f0f",
      background: "#18191A",
      paper: "#242526",
    },
    text: {
      main: "white",
    },
  },
});

export { lightTheme, darkTheme };
