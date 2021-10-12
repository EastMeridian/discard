import { Avatar, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { Message } from "models/message";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const auth = getAuth();

interface Props {
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

const ChatMessage = ({ message, style }: Props) => {
  const [user] = useAuthState(auth);
  const { text, uid, photoURL, displayName } = message;
  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    <Container style={style}>
      <Avatar src={photoURL || undefined} alt="user" />
      <ContentContainer>
        <Typography>{displayName}</Typography>
        <div>{text}</div>
      </ContentContainer>
    </Container>
  );
};

export default ChatMessage;
