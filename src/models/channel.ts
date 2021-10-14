import { FieldValue } from "@firebase/firestore";
import { Message } from "./message";
import { User } from "./user";

export interface Channel {
  id: string;
  createdAt: FieldValue;
  createdBy: User["uid"];
  members: User[]; // temp: should be User["uid"][] with a user context
  membersUID: User["uid"][];
  lastMessage?: Message["id"];
}
