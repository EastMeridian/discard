/* eslint-disable react-hooks/exhaustive-deps */
import { Channel } from "models/channel";
import { createMessage } from "services/api/messages";
import {
  collection,
  query,
  orderBy,
  limitToLast,
  Firestore,
  DocumentData,
  FirestoreError,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useMessageStore } from "utils/MessagesContext";
import { dispatchMessageSnapshot } from "./utils";
import { createNextMessagesQuery } from "utils/createNextMessageQuery";
import { Message } from "models/message";

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
}: ChatOptions): {
  data: ChatValue;
  topReached: boolean;
  sendMessage: ChatAction;
  requestNextChunk: () => void;
} => {
  const [topReached, setTopReached] = useState(false);
  const { messages, lastMessageTime, loading, addMessages, addNextMessages } =
    useMessageStore(channelID);

  const [error, setError] = useState<FirestoreError>();

  const messagesRef = collection(db, "channels", channelID, "messages");

  const messageQuery = query(
    messagesRef,
    orderBy("createdAt"),
    where("createdAt", ">", lastMessageTime),
    limitToLast(25)
  );

  useEffect(() => {
    /* console.log("[subscribe]"); */
    console.log("subscribe with date: ", messages, lastMessageTime, channelID);
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      console.log({ lastVisible }, snapshot.docs.length);

      const { added, modified } = dispatchMessageSnapshot(snapshot);
      console.log("length", added.length, modified.length);
      addMessages(added);
    });
    return () => {
      /* console.log("[unsubscribe]"); */
      unsubscribe();
    };
  }, [channelID]);

  const requestNextChunk = async () => {
    const nextQuery = createNextMessagesQuery(messagesRef, messages);
    if (!nextQuery) return setTopReached(true);
    const snapshots = await getDocs(nextQuery);
    console.log("[requestNextChunk]");
    if (snapshots.docs.length > 0) {
      const nextMessages = snapshots.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() } as Message;
      });
      addNextMessages(nextMessages);
      console.log({ nextMessages });
    }
    if (snapshots.docs.length < 25) setTopReached(true);
  };

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

  return { data, topReached, sendMessage, requestNextChunk };
};
