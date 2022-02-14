import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "services/firestore";

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  const location = useLocation();
  const [user, loaded] = useAuthState(auth);
  console.log("currentUser", loaded, user);

  if (loaded) return null;
  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
