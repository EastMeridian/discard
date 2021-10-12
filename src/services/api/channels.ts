import { Channel } from "models/channel";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "services/firestore";
import { User } from "models/user";

export const createGroup = async ({
  createdBy,
  members = [],
}: Omit<
  Channel,
  "createdAt" | "createdBy" | "id" | "members" | "membersUID"
> & {
  members?: User[];
  createdBy: User;
}) => {
  const groupsRef = collection(db, "channels");
  const finalMembers = [...members, createdBy];
  const memberUIDs = finalMembers.map(({ uid }) => uid);

  await addDoc(groupsRef, {
    createdBy: createdBy.uid,
    members: finalMembers,
    memberUIDs,
    createdAt: serverTimestamp(),
  });
};

export const deleteChannel = async (id: Channel["id"]) => {
  await deleteDoc(doc(db, "channels", id));
};
