import PrivateRoute from "navigation/PrivateRoute";
import ChatPage from "pages/ChatPage";
import LoginPage from "pages/LoginPage";
import { Switch, Route, Redirect } from "react-router-dom";

const RootSwitch = () => (
  <Switch>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route
      exact
      path="/"
      render={() => {
        return <Redirect to="/channels" />;
      }}
    />
    <PrivateRoute path="/channels">
      <ChatPage />
    </PrivateRoute>
  </Switch>
);

export default RootSwitch;
