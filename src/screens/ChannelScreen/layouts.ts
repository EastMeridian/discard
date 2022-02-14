import styled from "styled-components";
import { styled as styledMui } from "@mui/material";

export const ScreenContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const MenuHeaderContainer = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuContentContainer = styled.div`
  flex: 1;
  padding: 0 0.5rem;
`;

export const MenuFooterContainer = styledMui("div")(({ theme }) => ({
  backgroundColor: theme.colors.surface.dark,
  height: "3rem",
  padding: "0 1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const FooterUsername = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.5rem;
`;

export const ContentContainer = styledMui("div")(({ theme }) => ({
  backgroundColor: theme.colors.surface.background,
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));
