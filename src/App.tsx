import "services/firestore";
import "services/i18n";
import RootSwitch from "navigation/RootSwitch";
import MessagesContextProvider from "contexts/MessagesContext";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { logEvent, setCurrentScreen } from "firebase/analytics";
import { analytics } from "services/firestore";
import { FileSelectorContextProvider } from "contexts/FileSelectorContext";

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
    <FileSelectorContextProvider>
      <MessagesContextProvider>
        <RootSwitch />
      </MessagesContextProvider>
    </FileSelectorContextProvider>
  );
}

export default App;
