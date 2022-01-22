import "@mui/material/styles/createTheme";

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    colors: {
      surface: {
        main: string;
        dark: string;
        active: string;
        paper: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors: {
      surface: {
        main: string;
        dark: string;
        active: string;
        paper: string;
      };
    };
  }
}
