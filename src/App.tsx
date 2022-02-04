import "services/firestore";
import "services/i18n";
import RootSwitch from "navigation/RootSwitch";
import MessagesContextProvider from "contexts/MessagesContext";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { logEvent, setCurrentScreen } from "firebase/analytics";
import { analytics } from "services/firestore";
import { FileSelectorProvider } from "contexts/FileSelectorContext";
import { Box, LinearProgress } from "@mui/material";
import { SnackbarProvider } from "contexts/SnackbarContext";

function App() {
  const { listen } = useHistory();
  useEffect(() => {
    const unlisten = listen(({ pathname }) => {
      setCurrentScreen(analytics, pathname);
      logEvent(analytics, "page_view", { pathname });
    });

    return () => unlisten();
  });

  return (
    <FileSelectorProvider>
      <MessagesContextProvider>
        <SnackbarProvider>
          <RootSwitch />
        </SnackbarProvider>
      </MessagesContextProvider>
    </FileSelectorProvider>
  );
}

export default App;
