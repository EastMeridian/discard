import { useMemo, useState } from "react";
import { createGenericContext } from "utils/createGenericContext";
import { ThemeProvider } from "@mui/system";

import { lightTheme, darkTheme } from "theme";

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
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const value = useMemo(() => ({ setThemeMode, themeMode }), [themeMode]);

  const theme = themeMode === "light" ? lightTheme : darkTheme;

  console.log({ themeMode });
  return (
    <ThemeContextProvider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContextProvider>
  );
};

export { useThemeMode, ThemeModeProvider };
