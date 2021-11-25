import styled from "styled-components";

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 2.5rem 1rem;
  background-image: url(/blob.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90%;
`;

export const CenterLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PrivacyAndTermsLink = styled.a`
  color: gray;
`;
