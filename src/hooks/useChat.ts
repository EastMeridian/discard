/* eslint-disable react-hooks/exhaustive-deps */
import { Channel } from "models/channel";
import { createMessage } from "../services/api/messages";
import {
  collection,
  query,
  orderBy,
  limitToLast,
  Firestore,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { useEffect, useRef, useState } from "react";
import { Message } from "models/message";
import { useMessageStore } from "utils/MessagesContext";

type ChatAction = (text: string) => void;

type ChatValue = {
  messages: DocumentData | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
};

interface ChatOptions {
  currentUser: User;
  db: Firestore;
  channelID: Channel["id"];
  onMessageSent?: () => void;
}

export const useChat = ({
  currentUser,
  db,
  channelID,
  onMessageSent,
}: ChatOptions): [ChatValue, ChatAction] => {
  const lastMessageRef = useRef<Message>();
  const { messages, loading, addMessages, setLoading } =
    useMessageStore(channelID);

  const [error, setError] = useState<FirestoreError>();

  const messagesRef = collection(db, "channels", channelID, "messages");

  const messageQuery = query(
    messagesRef,
    orderBy("createdAt"),
    limitToLast(25)
  );

  useEffect(() => {
    /* console.log("[subscribe]"); */
    setLoading();
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      /* console.log("snapshot received", snapshot.docs); */
      snapshot.docChanges().forEach((change) => {
        const source = change.doc.metadata.hasPendingWrites
          ? "Local"
          : "Server";
        /* console.log("[type change]", source, change.type, change.doc.data()); */
      });
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      addMessages(messages);
    });
    return () => {
      /* console.log("[unsubscribe]"); */
      unsubscribe();
    };
  }, [channelID, lastMessageRef?.current?.id]);

  const sendMessage = async (text: string) => {
    if (currentUser) {
      try {
        const { uid, photoURL, displayName } = currentUser;
        await createMessage({ uid, text, photoURL, channelID, displayName });
        onMessageSent?.();
      } catch (e: any) {
        setError(e.message);
      }
    }
  };

  const data = { messages, loading, error };

  return [data, sendMessage];
};
