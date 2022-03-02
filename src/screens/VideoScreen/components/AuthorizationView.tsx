import { Typography, useTheme } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useTranslation } from "react-i18next";

const AuthorizationView = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "28rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <DisabledByDefaultIcon sx={{ marginRight: "0.5rem" }} />
        <Typography>{t("authorization.authorizeApp")}</Typography>
      </div>
      <Typography
        sx={{ color: theme.colors.text.subtitle, fontSize: "0.8rem" }}
      >
        {t("authorization.authorizeAppSubtitle")}
      </Typography>
    </div>
  );
};

export default AuthorizationView;
