import LoginPage from "screens/LoginScreen";
import { Routes, Route, Navigate } from "react-router-dom";
import ChannelScreen from "screens/ChannelScreen";
import RequireAuth from "./RequireAuth";

const RootRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/channels">
      <Route
        path=":channelID"
        element={
          <RequireAuth>
            <ChannelScreen />
          </RequireAuth>
        }
      />
      <Route
        path=""
        element={
          <RequireAuth>
            <ChannelScreen />
          </RequireAuth>
        }
      />
    </Route>
    <Route
      path="*"
      element={
        <RequireAuth>
          <Navigate to="/channels" replace />
        </RequireAuth>
      }
    />
  </Routes>
);

export default RootRoutes;
