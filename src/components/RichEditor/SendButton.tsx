import Button, { ButtonProps } from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export interface SendButtonProps extends ButtonProps {}

const SendButton = (props: SendButtonProps) => (
  <Button
    variant="contained"
    size="small"
    {...props}
    sx={{
      marginLeft: "0.25rem",
      maxWidth: "32px",
      maxHeight: "32px",
      minWidth: "32px",
      minHeight: "32px",
    }}
  >
    <SendIcon sx={{ fontSize: 18 }} />
  </Button>
);

export default SendButton;
