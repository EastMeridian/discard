import styled from "styled-components";
import { styled as styledMui } from "@mui/material";

const OuterLayout = styled.div`
  height: 3rem;
  padding-bottom: 1px;
  overflow: hidden;
`;

export const InnerLayout = styledMui("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1rem",
  color: theme.colors.text.main,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 1px 0 rgba(6, 6, 7, 0.1), 0 1.5px 0 rgba(6, 6, 7, 0.025), 0 2px 0 rgba(6, 6, 7, 0.025)"
      : "0 1px 0 rgba(249, 249, 248, 0.1), 0 1.5px 0 rgba(249, 249, 248, 0.025), 0 2px 0 rgba(249, 249, 248, 0.025)",
}));

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
