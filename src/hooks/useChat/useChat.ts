import { useSnapshotManager } from "../useSnapshotManager";
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
  QuerySnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { useEffect, useMemo, useState } from "react";
import { useMessageStore } from "utils/MessagesContext";
import { dispatchMessageSnapshot } from "./utils";
import { createNextMessagesQuery } from "utils/createNextMessageQuery";
import { Message } from "models/message";

type ChatAction = (text: string) => void;

type ChatValue = {
  messages: DocumentData | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
  topReached?: boolean;
  lastMessageTime: Date;
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
  sendMessage: ChatAction;
  requestNextChunk: () => void;
} => {
  const {
    messages,
    lastMessageTime,
    loading,
    topReached,
    addMessages,
    addNextMessages,
    setTopReached,
    setLoading,
  } = useMessageStore(channelID);

  const [error, setError] = useState<FirestoreError>();

  const messagesRef = collection(db, "channels", channelID, "messages");

  const messageQuery = query(
    messagesRef,
    orderBy("createdAt"),
    where("createdAt", ">", lastMessageTime),
    limitToLast(25)
  );

  const onNextSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    console.log({ lastVisible }, snapshot.docs.length);

    const { added, modified } = dispatchMessageSnapshot(snapshot);
    console.log("length", added.length, modified.length);
    addMessages(added);
  };

  useSnapshotManager(channelID, messageQuery, onNextSnapshot);

  const requestNextChunk = async () => {
    console.log("[requestNextChunk]");
    if (!topReached) {
      const nextQuery = createNextMessagesQuery(messagesRef, messages);
      if (!nextQuery) return setTopReached();
      setLoading(true);
      setTimeout(async () => {
        const snapshots = await getDocs(nextQuery);
        const nextMessages = snapshots.docs.map((doc) => {
          const id = doc.id;
          return { id, ...doc.data() } as Message;
        });
        addNextMessages(nextMessages);
        console.log({ nextMessages });
      }, 500);
    }
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

  const data = { messages, topReached, loading, error, lastMessageTime };

  return { data, sendMessage, requestNextChunk };
};
