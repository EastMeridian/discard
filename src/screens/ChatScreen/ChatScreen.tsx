import { useChat } from "hooks/useChat";
import { useEffect, useRef, useLayoutEffect } from "react";
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
import RichEditor from "components/RichEditor";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const firstElementRef = useRef<Element>();

  const { ref: topCursorRef, inView: topCursorInView } = useInView({
    threshold: 0,
  });
  const { data, sendMessage, requestNextChunk } = useChat({
    currentUser: user,
    db,
    channelID: channel.id,
  });
  const { messages, loading, topReached, lastMessageTime } = data;

  useLayoutEffect(() => {
    const { current } = bottomCursor;
    if (current) {
      current.scrollIntoView();
    }
  }, [lastMessageTime]);

  useLayoutEffect(() => {
    const { current } = firstElementRef;
    if (current) {
      current.scrollIntoView();
    }
  }, [loading]);

  const getFirstMessageElement = () => {
    // Find all elements in container which will be checked if are in view or not
    const nodeElements = containerRef.current?.querySelectorAll("[data-item]");
    const firstChild = nodeElements?.[0];
    console.log({ nodeElements });
    return firstChild;
  };

  useEffect(() => {
    console.log("TopCursor is", topCursorInView);
    if (topCursorInView && !loading) {
      firstElementRef.current = getFirstMessageElement();
      console.log("getFirstMessageElement", getFirstMessageElement());
      requestNextChunk();
    }
  }, [topCursorInView, requestNextChunk, loading]);

  const isLoadingScreen = loading && !(messages?.length > 1);

  console.log("loading ?", loading);
  return (
    <MainLayout>
      <ScrollView ref={containerRef}>
        {!isLoadingScreen && topReached && (
          <InitialMessage members={channel?.members || []} />
        )}
        {loading && <MessageSkeletons channelID={channel.id} />}
        {!loading && <div ref={topCursorRef} />}
        {messages?.map((msg: Message) => (
          <div data-item={true} key={msg.id}>
            <ChatMessage message={msg} style={{ marginTop: "0.5rem" }} />
          </div>
        ))}

        <div ref={bottomCursor} />
      </ScrollView>
      <div style={{ padding: "0 0.5rem 1rem 0.5rem" }}>
        <RichEditor
          onSubmit={(message) => sendMessage(message)}
          channelID={channel.id}
        />
      </div>
    </MainLayout>
  );
};

export default ChatScreen;
