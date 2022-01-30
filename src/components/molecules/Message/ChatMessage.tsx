import { Avatar, Typography } from "@mui/material";
import { Message, MessageType } from "models/message";
import styled from "styled-components";
import FileContent from "./components/FileContent";
import TextContent from "./components/TextContent";

export interface MessageProps {
  message: Message;
  style?: React.CSSProperties;
}

const Container = styled.div`
  display: flex;
  align-items: start;
  &:hover {
    background-color: #fafafa;
  }
  padding: 0.5rem 1rem;
`;

export const MessageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1rem;
  margin: 0 1rem;
`;

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
  const { photoURL, displayName, type } = message;

  const Component = getMessageContent(type);
  console.log({ type });
  return (
    <Container style={style}>
      <Avatar src={photoURL || undefined} alt={displayName || "user"} />
      <MessageContentContainer>
        <Typography>{displayName}</Typography>
        <Component message={message} />
      </MessageContentContainer>
    </Container>
  );
};

export default ChatMessage;
