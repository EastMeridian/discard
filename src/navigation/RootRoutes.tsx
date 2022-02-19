import LoginPage from "screens/LoginScreen";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { Suspense, lazy } from "react";
import ChannelScreenSkeletons from "screens/ChannelScreen/components/ChannelScreenSkeleton";

const ChannelScreen = lazy(() => import("screens/ChannelScreen"));

const RootRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/channels">
      <Route
        path=":channelID"
        element={
          <RequireAuth>
            <Suspense fallback={<ChannelScreenSkeletons />}>
              <ChannelScreen />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path=""
        element={
          <RequireAuth>
            <Suspense fallback={<ChannelScreenSkeletons />}>
              <ChannelScreen />
            </Suspense>
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
