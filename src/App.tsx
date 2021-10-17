import "services/firestore";
import "services/i18n";
import RootSwitch from "navigation/RootSwitch";
import MessagesContextProvider from "utils/MessagesContext";

function App() {
  return (
    <MessagesContextProvider>
      <RootSwitch />
    </MessagesContextProvider>
  );
}

export default App;
