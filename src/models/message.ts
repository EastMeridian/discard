import { Timestamp } from "@firebase/firestore";
import { RawDraftContentState } from "draft-js";
import { User } from "./user";

export type MessageType = "text" | "file";

export interface Message {
  id: string;
  uid: User["uid"];
  createdAt: Timestamp;
  photoURL: string | null;
  displayName: string | null;
  type: MessageType;
  text?: RawDraftContentState | null;
  files?: string[] | null;
}
export interface TextMessage extends Message {
  type: "text";
  text: RawDraftContentState;
}

export interface FileMessage extends Message {
  type: "file";
  files: string[];
}
