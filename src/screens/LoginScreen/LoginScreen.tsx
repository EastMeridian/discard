import { Typography } from "@mui/material";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import SignIn from "./components/SignIn";
import { CenterLayout, PrivacyAndTermsLink, ScreenContainer } from "./layouts";

const sentence1Style: CSSProperties = {
  marginBottom: "1rem",
  textAlign: "center",
  width: "32rem",
  maxWidth: "100%",
};

const sentence2style: CSSProperties = {
  marginBottom: "2rem",
  textAlign: "center",
};

const LoginScreen = () => {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <Typography variant="h3">{t("discard")}</Typography>
      <CenterLayout>
        <Typography variant="h3" style={sentence1Style}>
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
    </ScreenContainer>
  );
};

export default LoginScreen;
