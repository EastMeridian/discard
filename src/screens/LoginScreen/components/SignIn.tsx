import { Button, FormControl, FormHelperText } from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  UserCredential,
  AuthProvider,
} from "firebase/auth";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { createUser } from "services/api/users";
import { auth } from "services/firestore";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import TextInput from "components/atoms/TextInput";
import { config } from "services/config";

const onSignInSucceed = async ({
  user,
  token,
}: Pick<UserCredential, "user"> & { token?: string }) => {
  const { uid, displayName, photoURL, email } = user;

  await createUser({
    uid,
    displayName,
    photoURL,
    email,
    token,
  });
};

const SignIn = () => {
  let [params] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(params.get("token") ?? "");
  const [error, setError] = useState<string | null>(null);
  const pathname = (location as any).state?.from.pathname || "/";

  const signIn = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then(({ user }) => onSignInSucceed({ user, token }))
      .then(() => navigate(pathname, { replace: true }))
      .catch((e) => setError(e.message));
  };

  const signInWithGoogle = () => {
    if (config.tokenAuthentication && token === "") {
      return setError("Signup token must be provided.");
    }
    const provider = new GoogleAuthProvider();
    signIn(provider);
  };

  const signInWithFacebook = () => {
    if (config.tokenAuthentication && token === "") {
      return setError("Signup token must be provided.");
    }
    const provider = new FacebookAuthProvider();
    signIn(provider);
  };

  const onTokenChange = (value: string) => {
    if (error !== null) setError(null);
    setToken(value);
  };

  return (
    <div
      style={{
        maxWidth: "24rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {config.tokenAuthentication && (
        <FormControl error={Boolean(error)} variant="standard">
          <TextInput
            value={token}
            onChange={onTokenChange}
            placeholder="TOKEN"
            autoFocus
          />

          <FormHelperText id="component-error-text">{error}</FormHelperText>
        </FormControl>
      )}
      <Button
        onClick={signInWithGoogle}
        variant="outlined"
        sx={{ height: "2.5rem", marginTop: "1rem" }}
      >
        <img
          src={"/google.png"}
          alt="sign in with google"
          width={16}
          style={{ marginRight: "1rem" }}
        />
        {t("login.signInWithGoogle")}
      </Button>
      <Button
        onClick={signInWithFacebook}
        variant="contained"
        sx={{ height: "2.5rem", marginTop: "1rem", backgroundColor: "#4267B2" }}
      >
        <img
          src={"/facebook.png"}
          alt="sign in with google"
          width={16}
          style={{ marginRight: "1rem", paddingLeft: "1rem" }}
        />
        {t("login.signInWithFacebook")}
      </Button>
    </div>
  );
};

export default SignIn;
