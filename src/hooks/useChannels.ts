import { getUser } from "../services/api/users";
import * as api from "services/api/channels";
import { Channel } from "models/channel";
import {
  collection,
  query,
  Firestore,
  FirestoreError,
  where,
} from "firebase/firestore";
import { Auth } from "firebase/auth";
import { useCollectionSubscription } from "./useCollectionSubscription";
import { useState } from "react";
import { User } from "models/user";

type GroupAction = (members?: User[]) => Promise<string | undefined>;

type GroupValue = {
  channels: Channel[] | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
};

interface GroupsOptions {
  auth: Auth;
  db: Firestore;
}

export const useChannels = ({
  auth,
  db,
}: GroupsOptions): [GroupValue, GroupAction] => {
  const [creationError, setCreationError] = useState(null);
  const groupsRef = collection(db, "channels");
  const groupsQuery = query(
    groupsRef,
    where("memberUIDs", "array-contains", auth.currentUser?.uid)
  );

  const [loading, channels, error] =
    useCollectionSubscription<Channel[]>(groupsQuery);

  const createChannel = async (members?: User[]) => {
    if (auth.currentUser) {
      try {
        const channel = await api.createChannel({
          createdBy: getUser(auth.currentUser),
          members,
        });
        return channel;
      } catch (e: any) {
        setCreationError(e.message);
      }
    }
  };

  const data = { channels, loading, error: creationError || error };
  return [data, createChannel];
};
