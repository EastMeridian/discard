import { Avatar, Typography } from "@mui/material";
import { Message } from "models/message";
import styled from "styled-components";

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
  margin: 0 1rem;
`;

const ChatMessage = ({ message, style }: MessageProps) => {
  const { text, photoURL, displayName } = message;

  return (
    <Container style={style}>
      <Avatar src={photoURL || undefined} alt="user" />
      <MessageContentContainer>
        <Typography>{displayName}</Typography>
        <div>{text}</div>
      </MessageContentContainer>
    </Container>
  );
};

export default ChatMessage;
