import styled from "styled-components";

const Container = styled.div`
  position: relative;
  flex: 1 1 auto;
`;

const Scroller = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 1 1 auto;
  min-height: 0;
  padding: 0.5rem 0;
`;

const ScrollerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
`;

interface Props {
  children: React.ReactNode;
}

const ScrollView = ({ children }: Props) => (
  <Container>
    <Scroller>
      <ScrollerContent>{children}</ScrollerContent>
    </Scroller>
  </Container>
);

export default ScrollView;
