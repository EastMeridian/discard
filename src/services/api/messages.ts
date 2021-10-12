import { Channel } from "models/channel";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { Message } from "models/message";
import { db } from "services/firestore";

export const createMessage = async ({
  channelID,
  text,
  uid,
  photoURL,
  displayName,
}: Omit<Message, "createdAt" | "id"> & { channelID: Channel["id"] }) => {
  const messagesRef = collection(db, "channels", channelID, "messages");

  await addDoc(messagesRef, {
    uid,
    text: text.trim(),
    photoURL,
    createdAt: serverTimestamp(),
    displayName,
  });
};
