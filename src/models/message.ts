import { Timestamp } from "@firebase/firestore";
import { RawDraftContentState } from "draft-js";
import { User } from "./user";

export interface Message {
  id: string;
  uid: User["uid"];
  text: RawDraftContentState;
  createdAt: Timestamp;
  photoURL: string | null;
  displayName: string | null;
}
