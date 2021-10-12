import styled from "styled-components";

const OuterLayout = styled.div`
  height: 3rem;
  padding-bottom: 1px;
  overflow: hidden;
`;

const InnerLayout = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 1px 0 rgba(6, 6, 7, 0.1), 0 1.5px 0 rgba(6, 6, 7, 0.025),
    0 2px 0 rgba(6, 6, 7, 0.025);
`;

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Header = ({ children, style }: Props) => (
  <OuterLayout>
    <InnerLayout style={style}>{children}</InnerLayout>
  </OuterLayout>
);

export default Header;
