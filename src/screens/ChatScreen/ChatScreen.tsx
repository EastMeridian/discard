import { useChat } from "hooks/useChat";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { auth, db } from "services/firestore";
import ChatMessage from "components/Message/ChatMessage";
import ScrollView from "components/ScrollView";
import { Channel } from "models/channel";
import InitialMessage from "./components/InitialMessage";
import { Message } from "models/message";
import { MessageSkeletons } from "components/Message";
import { useAuthState } from "react-firebase-hooks/auth";
import { useInView } from "react-intersection-observer";
import TextFieldMessage from "components/TextFieldMessage";

interface Props {
  channel: Channel;
}

const MainLayout = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding: 0;
`;

const ChatScreen = ({ channel }: Props) => {
  const [user] = useAuthState(auth);
  const bottomCursor = useRef<HTMLDivElement>(null);
  const { ref, inView: topCursorInView } = useInView({
    threshold: 0,
  });
  const { data, topReached, sendMessage, requestNextChunk } = useChat({
    currentUser: user,
    db,
    channelID: channel.id,
  });
  const { messages, loading } = data;

  useEffect(() => {
    const { current } = bottomCursor;
    if (current) {
      current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    console.log("TopCursor is", topCursorInView);
    if (topCursorInView) {
      requestNextChunk();
    }
  }, [topCursorInView, requestNextChunk]);

  const isLoadingScreen = loading && !(messages?.length > 1);

  console.log("loading ?", loading);
  return (
    <MainLayout>
      <ScrollView>
        {!isLoadingScreen && topReached && (
          <InitialMessage members={channel?.members || []} />
        )}
        {!loading && <div ref={ref} />}
        {loading && <MessageSkeletons channelID={channel.id} />}
        {messages?.map((msg: Message) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            style={{ marginTop: "0.5rem" }}
          />
        ))}
        <div ref={bottomCursor} />
      </ScrollView>
      <TextFieldMessage onSendMessage={(message) => sendMessage(message)} />
    </MainLayout>
  );
};

export default ChatScreen;
