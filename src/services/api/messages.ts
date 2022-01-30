import { Channel } from "models/channel";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { Message } from "models/message";
import { db } from "services/firestore";

type MessageFactoryOptions = Omit<Message, "createdAt" | "id"> & {
  channelID: Channel["id"];
};

export const createMessage = async ({
  channelID,
  text = null,
  files = null,
  uid,
  photoURL,
  displayName,
  type,
}: MessageFactoryOptions) => {
  const channelRef = doc(db, "channels", channelID);
  const messagesRef = collection(channelRef, "messages");
  try {
    const message = await addDoc(messagesRef, {
      uid,
      text,
      files,
      displayName,
      photoURL,
      createdAt: serverTimestamp(),
      type,
    });
    await updateDoc(channelRef, { lastMessage: message.id });
  } catch (e) {
    console.log(e);
  }
};
