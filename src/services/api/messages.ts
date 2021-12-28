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

export const createMessage = async ({
  channelID,
  text,
  uid,
  photoURL,
  displayName,
}: Omit<Message, "createdAt" | "id"> & { channelID: Channel["id"] }) => {
  const channelRef = doc(db, "channels", channelID);
  const messagesRef = collection(channelRef, "messages");

  const message = await addDoc(messagesRef, {
    uid,
    text,
    displayName,
    photoURL,
    createdAt: serverTimestamp(),
  });
  await updateDoc(channelRef, { lastMessage: message.id });
};
