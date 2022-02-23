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
import { useMessageStore } from "contexts/MessagesContext";
import { dispatchMessageSnapshot } from "./utils";
import { createNextMessagesQuery } from "utils/createNextMessageQuery";
import { Message } from "models/message";
import { RawDraftContentState } from "draft-js";
import { FileUpload } from "models/file";
import { uploadManyFiles } from "services/api/upload";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "services/firestore";
import { useSnackbar } from "contexts/SnackbarContext";

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
  const { setLoading: setSnackbarLoading } = useSnackbar();
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
          setSnackbarLoading(true);

          const snapshots = await uploadManyFiles(files);
          const messageFiles = await Promise.all(
            snapshots.map((snapshot) =>
              getDownloadURL(ref(storage, snapshot.metadata.fullPath))
            )
          );
          setSnackbarLoading(false);
          createMessage({
            uid,
            photoURL,
            channelID,
            displayName,
            type: "file",
            files: messageFiles,
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
