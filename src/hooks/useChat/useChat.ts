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
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { useMemo, useState } from "react";
import { useMessageStore } from "utils/MessagesContext";
import { dispatchMessageSnapshot } from "./utils";
import { createNextMessagesQuery } from "utils/createNextMessageQuery";
import { Message } from "models/message";
import { RawDraftContentState } from "draft-js";
import { FileUpload } from "models/file";
import { uploadManyFiles } from "services/api/upload";

type ChatAction = (
  text: RawDraftContentState | null,
  files: FileUpload[]
) => void;

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
  nextChunkDelay?: number;
}

export const useChat = ({
  currentUser,
  db,
  channelID,
  onMessageSent,
  nextChunkDelay = 250,
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

  useSnapshotManager(
    { channelID, query: messageQuery },
    (snapshot: QuerySnapshot<DocumentData>) => {
      /*       const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      console.log({ lastVisible }, snapshot, snapshot.docs.length); */

      const { added } = dispatchMessageSnapshot(snapshot);
      addMessages(channelID, added);
    }
  );

  const requestNextChunk = async () => {
    if (!topReached) {
      const nextQuery = createNextMessagesQuery(messagesRef, messages);
      if (!nextQuery) return setTopReached(channelID);
      setLoading(channelID, true);
      setTimeout(async () => {
        const snapshots = await getDocs(nextQuery);
        const nextMessages = snapshots.docs.map((doc) => {
          const id = doc.id;
          return { id, ...doc.data() } as Message;
        });
        addNextMessages(channelID, nextMessages);
      }, nextChunkDelay);
    }
  };

  const sendMessage = async (
    text: RawDraftContentState | null,
    files: FileUpload[]
  ) => {
    if (currentUser) {
      try {
        const { uid, photoURL, displayName } = currentUser;
        console.log({ text });
        if (text) {
          createMessage({
            uid,
            text,
            photoURL,
            channelID,
            displayName,
            type: "text",
          });
        }

        if (files.length > 0) {
          console.log(
            "[upload] uploading",
            files.map(({ name }) => name)
          );
          uploadManyFiles(files).then((snapshots) => {
            console.log("Uploaded images!", snapshots);
            createMessage({
              uid,
              photoURL,
              channelID,
              displayName,
              type: "file",
              files: snapshots.map((snapshot) => snapshot.metadata.fullPath),
            });
          });
        }
        onMessageSent?.();
      } catch (e: any) {
        setError(e.message);
      }
    }
  };

  const data = useMemo(
    () => ({
      messages,
      topReached,
      loading,
      error,
      lastMessageTime,
    }),
    [lastMessageTime, loading]
  );

  return useMemo(
    () => ({
      data,
      sendMessage,
      requestNextChunk,
    }),
    [data]
  );
};
