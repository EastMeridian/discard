import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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

export default theme;
