import { styled, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "react-i18next";

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: theme.colors.surface.main + "e9",
  color: theme.colors.text.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  zIndex: 10,
  fontSize: 64,
  flexDirection: "column",
}));

export const DropzoneOverlay = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <CloudUploadIcon fontSize="inherit" color="inherit" />
      <Typography variant="button" display="block">
        {t("uploadFile")}
      </Typography>
    </Container>
  );
};
