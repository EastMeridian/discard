import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";

export const ScreenContainer = styledMui("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  backgroundColor: theme.colors.surface.background,
  color: theme.colors.text.main,
}));

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 2rem 1rem;
`;

export const CenterLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PrivacyAndTermsLink = styled.a`
  color: gray;
`;

export const DesktopImage = styled.img`
  height: 100%;
  width: 50vw;
  object-fit: cover;
`;
