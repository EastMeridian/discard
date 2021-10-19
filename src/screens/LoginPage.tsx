import { Button, Typography } from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  UserCredential,
} from "firebase/auth";
import { useHistory, useLocation } from "react-router-dom";
import { createUser, userExists } from "services/api/users";
import { auth } from "services/firestore";

interface LocationState {
  from: {
    pathname: string;
  };
}

const onSignInSucceed = async ({ user }: UserCredential) => {
  const { uid, displayName, photoURL, email } = user;

  await createUser({ uid, displayName, photoURL, email });
};

const SignIn = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: "/" } };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(onSignInSucceed)
      .then(() => {
        history.push(from);
      });
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then(onSignInSucceed)
      .then(() => {
        history.push(from);
      });
  };

  return (
    <div
      style={{
        width: "24rem",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
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
        Continue with google
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
        Continue with facebook
      </Button>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "2.5rem 1rem",
        backgroundImage: "url(/blob.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "90%",
      }}
    >
      <Typography variant="h3">discard</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          style={{
            marginBottom: "1rem",
            textAlign: "center",
            width: "32rem",
            maxWidth: "100%",
          }}
        >
          First of all, connect using a service
        </Typography>
        <Typography style={{ marginBottom: "2rem", textAlign: "center" }}>
          Yes, this is like discord, but cheaper, what you gonna do
        </Typography>
        <SignIn />
      </div>
      <a
        href="https://www.privacypolicygenerator.info/live.php?token=YXeF1ojUzIyz3dVI4RIm1vDfsCf86azo"
        target="_blank"
        rel="noreferrer"
        style={{ color: "gray" }}
      >
        Privacy & terms
      </a>
    </div>
  );
};

export default LoginPage;
