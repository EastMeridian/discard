import { useEffect, useMemo } from "react";
import { createGenericContext } from "utils/createGenericContext";
import { ThemeProvider } from "@mui/system";

import { lightTheme, darkTheme } from "theme";
import { useLocalStorage } from "hooks/useLocalStorage";

type ThemeMode = "light" | "dark";
interface ThemeModeContext {
  setThemeMode: (mode: ThemeMode) => void;
  themeMode: ThemeMode;
}

const [useThemeMode, ThemeContextProvider] =
  createGenericContext<ThemeModeContext>();

interface ThemeModeContextProviderProviderProps {
  children: React.ReactNode;
}

const ThemeModeProvider = ({
  children,
}: ThemeModeContextProviderProviderProps) => {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    "themeMode",
    "light"
  );

  const theme = themeMode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) =>
        setThemeMode(e.matches ? "dark" : "light")
      );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ setThemeMode, themeMode }),
    [themeMode, setThemeMode]
  );

  return (
    <ThemeContextProvider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContextProvider>
  );
};

export { useThemeMode, ThemeModeProvider };
