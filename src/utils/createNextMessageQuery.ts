import {
  query,
  orderBy,
  limitToLast,
  where,
  CollectionReference,
} from "firebase/firestore";
import { Message } from "models/message";

export const createNextMessagesQuery = (
  messagesRef: CollectionReference,
  messages: Message[]
) => {
  if (messages.length === 0) return;
  const firstMessageTime = messages[0].createdAt.toDate();
  return query(
    messagesRef,
    orderBy("createdAt"),
    where("createdAt", "<", firstMessageTime),
    limitToLast(25)
  );
};
