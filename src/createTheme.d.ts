import "@mui/material/styles/createTheme";

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    colors: {
      surface: {
        main: string;
        light: string;
        dark: string;
        active: string;
        background: string;
        paper: string;
      };
      text: {
        main: string;
        subtitle: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors: {
      surface: {
        main: string;
        light: string;
        dark: string;
        active: string;
        background: string;
        paper: string;
      };
      text: {
        main: string;
        subtitle: string;
      };
    };
  }
}
