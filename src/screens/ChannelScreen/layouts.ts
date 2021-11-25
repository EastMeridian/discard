import styled from "styled-components";

export const ScreenContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const MenuContainer = styled.div`
  background-color: #f2f3f5;
  display: flex;
  flex-direction: column;
  flex: 1;
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

export const MenuFooterContainer = styled.div`
  background-color: #ebedef;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterUsername = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.5rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
