import LoginPage from "screens/LoginScreen";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { Suspense, lazy } from "react";
import ChannelScreenSkeletons from "screens/ChannelScreen/components/ChannelScreenSkeleton";
import VideoScreen from "screens/VideoScreen";

const ChannelScreen = lazy(() => import("screens/ChannelScreen"));

const ChannelScreenElement = () => (
  <RequireAuth>
    <Suspense fallback={<ChannelScreenSkeletons />}>
      <ChannelScreen />
    </Suspense>
  </RequireAuth>
);

const VideoScreenElement = () => (
  <RequireAuth>
    <VideoScreen />
  </RequireAuth>
);

const RootRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />}>
      <Route path=":token" element={<LoginPage />} />
    </Route>
    <Route path="/channels" element={<ChannelScreenElement />}>
      <Route path=":channelID" element={<ChannelScreenElement />} />
    </Route>
    <Route path="/call" element={<VideoScreenElement />}>
      <Route path=":userId" element={<VideoScreenElement />} />
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
