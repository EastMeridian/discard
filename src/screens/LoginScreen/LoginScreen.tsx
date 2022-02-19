import { Typography } from "@mui/material";
import { CSSProperties } from "react";
import { isMobile } from "react-device-detect";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "services/firestore";
import SignIn from "./components/SignIn";
import {
  CenterLayout,
  ContentContainer,
  DesktopImage,
  PrivacyAndTermsLink,
  ScreenContainer,
} from "./layouts";

const sentence1Style: CSSProperties = {
  marginBottom: "1rem",
  textAlign: "center",
  width: isMobile ? "16rem" : "32rem",
  maxWidth: "100%",
  fontSize: isMobile ? "1.8rem" : "3rem",
};

const sentence2style: CSSProperties = {
  marginBottom: "2rem",
  textAlign: "center",
};

const LoginScreen = () => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  console.log("LoginScreen", user);

  return (
    <ScreenContainer>
      {!isMobile && <DesktopImage src="/login.webp" alt="message" />}
      <ContentContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            height="40px"
            width="40px"
            alt=""
            style={{ marginRight: "0.5rem" }}
          />
          <Typography variant="h3" color="inherit">
            {t("discard")}
          </Typography>
        </div>
        <CenterLayout>
          <Typography variant="h3" style={sentence1Style} color="inherit">
            {t("login.sentence1")}
          </Typography>
          <Typography style={sentence2style}>{t("login.sentence2")}</Typography>
          <SignIn />
        </CenterLayout>
        <PrivacyAndTermsLink
          href="https://www.privacypolicygenerator.info/live.php?token=YXeF1ojUzIyz3dVI4RIm1vDfsCf86azo"
          target="_blank"
          rel="noreferrer"
        >
          {t("login.privacyAndTerms")}
        </PrivacyAndTermsLink>
      </ContentContainer>
    </ScreenContainer>
  );
};

export default LoginScreen;
