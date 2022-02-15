import styled from "styled-components";

export const ScreenContainer = styled.div`
  height: 100%;
  display: flex;
`;

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
