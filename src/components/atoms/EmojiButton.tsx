import styled from "styled-components";

const EmojiButton = styled("div")(({ theme }) => ({
  fontSize: "2rem",
  lineHeight: 0,
  width: "2.5rem",
  height: "2.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.surface.main,
  },
  "&:active": {
    backgroundColor: theme.colors.surface.active,
  },
}));

export default EmojiButton;
