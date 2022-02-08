import { styled } from "@mui/material";

export const MenuContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.colors.surface.main,
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));
