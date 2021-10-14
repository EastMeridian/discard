import { Redirect, Route, RouteProps } from "react-router";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firestore";

interface Props extends RouteProps {}

function PrivateRoute({ children, ...rest }: Props) {
  const [user, loading] = useAuthState(auth);
  if (loading) return null;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
