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
} from "firebase/firestore";
import { User } from "firebase/auth";

import { useCollectionSubscription } from "./useCollectionSubscription";
import { useState } from "react";
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
}: ChatOptions): [ChatValue, ChatAction] => {
  const [addError, setAddError] = useState(null);
  const messagesRef = collection(db, "channels", channelID, "messages");
  const messageQuery = query(
    messagesRef,
    orderBy("createdAt"),
    limitToLast(25)
  );

  const [loading, messages, error] = useCollectionSubscription<Message[]>(
    messageQuery,
    [channelID]
  );

  const sendMessage = async (text: string) => {
    if (currentUser) {
      try {
        const { uid, photoURL, displayName } = currentUser;
        await createMessage({ uid, text, photoURL, channelID, displayName });
        onMessageSent?.();
      } catch (e: any) {
        setAddError(e.message);
      }
    }
  };

  const data = { messages, loading, error: addError || error };
  return [data, sendMessage];
};
