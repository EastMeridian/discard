import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const DiscardLogo = () => {
  const { t } = useTranslation();

  return (
    <>
      <img
        src="/logo.png"
        height="32px"
        width="32px"
        alt=""
        style={{ marginRight: "0.5rem" }}
      />
      <Typography variant="h5">{t("discard")}</Typography>
    </>
  );
};

export default DiscardLogo;
