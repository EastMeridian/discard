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
import { compactObject } from "utils/object";

export const createMessage = async ({
  channelID,
  text,
  files,
  uid,
  photoURL,
  displayName,
  type,
}: Omit<Message, "createdAt" | "id"> & { channelID: Channel["id"] }) => {
  const channelRef = doc(db, "channels", channelID);
  const messagesRef = collection(channelRef, "messages");
  try {
    const message = await addDoc(
      messagesRef,
      compactObject({
        uid,
        text,
        files,
        displayName,
        photoURL,
        createdAt: serverTimestamp(),
        type,
      })
    );
    await updateDoc(channelRef, { lastMessage: message.id });
  } catch (e) {
    console.log(e);
  }
};
