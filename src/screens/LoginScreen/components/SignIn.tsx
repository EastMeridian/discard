import { Button } from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  UserCredential,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { createUser } from "services/api/users";
import { auth } from "services/firestore";
import { useTranslation } from "react-i18next";

const onSignInSucceed = async ({ user }: UserCredential) => {
  const { uid, displayName, photoURL, email } = user;

  await createUser({ uid, displayName, photoURL, email });
};

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const pathname = (location as any).state?.from.pathname || "/";

  console.log(pathname);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(onSignInSucceed)
      .then(() => {
        navigate(pathname, { replace: true });
      });
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then(onSignInSucceed)
      .then(() => {
        navigate(pathname, { replace: true });
      });
  };

  return (
    <div
      style={{
        maxWidth: "24rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        onClick={signInWithGoogle}
        variant="outlined"
        sx={{ height: "2.5rem", backgroundColor: "white" }}
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
