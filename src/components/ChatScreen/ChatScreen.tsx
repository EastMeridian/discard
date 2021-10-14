import { useChat } from "hooks/useChat";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { auth, db } from "services/firestore";
import ChatMessage from "../Message/ChatMessage";
import ScrollView from "../ScrollView";
import Paper from "@mui/material/Paper";
import ChatHeader from "./ChatHeader";
import { useParams } from "react-router";
import { Channel } from "models/channel";
import InitialMessage from "./InitialMessage";
import { Message } from "models/message";
import { MessageSkeletons } from "components/Message";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  channel?: Channel;
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
  const cursorRef = useRef<HTMLDivElement>(null);
  const { channelID } = useParams<{ channelID: string }>();
  const [formValue, setFormValue] = useState("");
  const [{ messages, loading }, sendMessage] = useChat({
    currentUser: user,
    db,
    channelID,
  });

  console.log({ messages });

  useEffect(() => {
    const { current } = cursorRef;
    if (current) {
      current.scrollIntoView();
    }
  }, [messages]);

  const handleOnSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (auth.currentUser) {
      sendMessage(formValue);
      setFormValue("");
    }
  };

  console.log("ChatScreen", loading);
  return (
    <MainLayout>
      <ScrollView>
        {loading && <MessageSkeletons channelID={channelID} />}
        {!loading && (
          <>
            <InitialMessage members={channel?.members || []} />
            {messages &&
              messages.map((msg: Message) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  style={{ marginTop: "0.5rem" }}
                />
              ))}
          </>
        )}
        <div ref={cursorRef} className="" />
      </ScrollView>
      <form
        onSubmit={handleOnSendMessage}
        style={{ padding: "0 0.5rem 1rem 0.5rem" }}
      >
        <Paper
          style={{
            padding: "0.5rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#EAEDEF",
          }}
        >
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              backgroundColor: "#EAEDEF",
            }}
          />

          <button type="submit" disabled={!formValue}>
            🕊️
          </button>
        </Paper>
      </form>
    </MainLayout>
  );
};

export default ChatScreen;
