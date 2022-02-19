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
  },
  colors: {
    surface: {
      main: "#1d1e1e",
      light: "#3a3b3c",
      dark: "#1a1b1b",
      active: "#3a3b3c",
      background: "#242526",
      paper: "#272829",
    },
    text: {
      main: "#E3E6EA",
    },
  },
});

export { lightTheme, darkTheme };
