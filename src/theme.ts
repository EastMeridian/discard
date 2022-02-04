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
      dark: "#ebedef",
      active: "#d2d2d3",
      paper: "#ffffff",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
  colors: {
    surface: {
      main: "#000000",
      dark: "#000000",
      active: "#000000",
      paper: "#000000",
    },
  },
});

export { lightTheme, darkTheme };
