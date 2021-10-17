import { Channel } from "models/channel";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "@firebase/firestore";
import { db } from "services/firestore";
import { User } from "models/user";

const channelsRef = collection(db, "channels");

export const createChannel = async ({
  createdBy,
  members = [],
}: Omit<
  Channel,
  "createdAt" | "createdBy" | "id" | "members" | "membersUID"
> & {
  members?: User[];
  createdBy: User;
}) => {
  const finalMembers = [...members, createdBy];
  const memberUIDs = finalMembers.map(({ uid }) => uid);

  const exist = await channelExists(memberUIDs);

  if (!exist) {
    const channel = await addDoc(channelsRef, {
      createdBy: createdBy.uid,
      members: finalMembers,
      memberUIDs,
      createdAt: serverTimestamp(),
    });
    return channel.id;
  }
};

export const channelExists = async (memberUIDs: string[]) => {
  const channelRef = query(
    channelsRef,
    where("memberUIDs", "array-contains", memberUIDs)
  );
  const docSnap = await getDocs(channelRef);
  console.log({ memberUIDs });
  console.log("channelExists", docSnap.empty, docSnap, docSnap.docs);
  return !docSnap.empty;
};

export const deleteChannel = async (id: Channel["id"]) => {
  await deleteDoc(doc(db, "channels", id));
};
