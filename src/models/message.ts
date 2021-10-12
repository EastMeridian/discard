import { FieldValue } from "@firebase/firestore";
import { User } from "./user";

export interface Message {
  id: string;
  uid: User["uid"];
  text: string;
  createdAt: FieldValue;
  photoURL: string | null;
  displayName: string | null;
}
