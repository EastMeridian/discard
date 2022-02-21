import { Avatar, Typography, useTheme } from "@mui/material";
import { Message, MessageType } from "models/message";
import FileContent from "./components/FileContent";
import TextContent from "./components/TextContent";
import { styled as styledMui } from "@mui/material";
import { format } from "date-fns";

export interface MessageProps {
  message: Message;
  style?: React.CSSProperties;
}

const Container = styledMui("div")(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  "&:hover": {
    backgroundColor: theme.colors.surface.light,
  },
  padding: "0.5rem 1rem",
}));

export const MessageContentContainer = styledMui("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: "1rem",
  margin: "0 1rem",
  color: theme.colors.text.main,
}));

const getMessageContent = (
  type: MessageType
): ((props: { message: Message } & any) => JSX.Element) => {
  switch (type) {
    case "text":
      return TextContent;
    case "file":
      return FileContent;
  }
};

const ChatMessage = ({ message, style }: MessageProps) => {
  const theme = useTheme();
  const { photoURL, displayName, type, createdAt } = message;

  const Component = getMessageContent(type);
  console.log({ type });
  return (
    <Container style={style}>
      <Avatar src={photoURL || undefined} alt={displayName || "user"} />
      <MessageContentContainer>
        <div
          style={{ display: "flex", gap: "0.25rem", alignItems: "flex-end" }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            {displayName}
          </Typography>
          <Typography
            sx={{
              color: theme.colors.text.subtitle,
              fontSize: "0.8rem",
              paddingBottom: "1px",
            }}
          >
            {format(createdAt.toMillis(), "dd/MM/y")}
          </Typography>
        </div>
        <Component message={message} />
      </MessageContentContainer>
    </Container>
  );
};

export default ChatMessage;
