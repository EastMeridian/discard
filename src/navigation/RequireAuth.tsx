import { Navigate, useLocation } from "react-router-dom";
import { auth } from "services/firestore";

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  const location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
