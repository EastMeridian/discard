import { ForwardedRef, forwardRef } from "react";
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
  overflow-anchor: none;
  flex-grow: 1;
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

const ScrollView = forwardRef(
  ({ children }: Props, ref: ForwardedRef<HTMLDivElement>) => (
    <Container>
      <Scroller ref={ref}>
        <ScrollerContent>{children}</ScrollerContent>
      </Scroller>
    </Container>
  )
);

export default ScrollView;
