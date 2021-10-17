import PrivateRoute from "navigation/PrivateRoute";
import ChannelScreen from "screens/ChannelScreen";
import LoginPage from "screens/LoginPage";
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
      <ChannelScreen />
    </PrivateRoute>
  </Switch>
);

export default RootSwitch;
