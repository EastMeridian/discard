import { Channel } from "models/channel";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "@firebase/firestore";
import { db } from "services/firestore";
import { User } from "models/user";
import { sortMemberByName } from "utils/members";

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
  const finalMembers = [...members, createdBy].sort(sortMemberByName);
  const memberUIDs = finalMembers.map(({ uid }) => uid);

  const exist = await findChannelByMembers(memberUIDs);

  if (!exist.empty) {
    return exist.docs[0].id;
  }

  await addDoc(channelsRef, {
    createdBy: createdBy.uid,
    members: finalMembers,
    memberUIDs,
    createdAt: serverTimestamp(),
  });
};

export const findChannelByMembers = async (memberUIDs: string[]) => {
  const channelRef = query(channelsRef, where("memberUIDs", "==", memberUIDs));
  const docSnap = await getDocs(channelRef);
  return docSnap;
};

export const deleteChannel = async (id: Channel["id"]) => {
  await deleteDoc(doc(db, "channels", id));
};
