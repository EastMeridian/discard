import PrivateRoute from "navigation/PrivateRoute";
import LoginPage from "screens/LoginPage";
import { Switch, Route, Redirect } from "react-router-dom";
import ChannelScreen from "screens/ChannelScreen";

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
    <PrivateRoute path="/channels/:channelID?">
      <ChannelScreen />
    </PrivateRoute>
  </Switch>
);

export default RootSwitch;
