import "services/firestore";
import "services/i18n";
import RootRoutes from "navigation/RootRoutes";
import MessagesContextProvider from "contexts/MessagesContext";
import { useEffect } from "react";
import { createBrowserHistory } from "history";
import { logEvent, setCurrentScreen } from "firebase/analytics";
import { analytics } from "services/firestore";
import { FileSelectorProvider } from "contexts/FileSelectorContext";
import { SnackbarProvider } from "contexts/SnackbarContext";

function App() {
  const { listen } = createBrowserHistory();

  useEffect(() => {
    const unlisten = listen(({ location }) => {
      console.log(location);
      setCurrentScreen(analytics, location.pathname);
      logEvent(analytics, "page_view", { location: location.pathname });
    });

    return () => unlisten();
  }, [listen]);

  return (
    <FileSelectorProvider>
      <MessagesContextProvider>
        <SnackbarProvider>
          <RootRoutes />
        </SnackbarProvider>
      </MessagesContextProvider>
    </FileSelectorProvider>
  );
}

export default App;
