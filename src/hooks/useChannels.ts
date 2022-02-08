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
import { debounce } from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";

type GroupAction = (members?: User[]) => Promise<string | undefined>;

type GroupValue = {
  channels: Channel[];
  loading: boolean;
  error: FirestoreError | undefined;
};

const debounceCreateChannel = debounce(
  (options) => api.createChannel(options),
  1000,
  { leading: true }
);

export const useChannels = (
  auth: Auth,
  db: Firestore
): [GroupValue, GroupAction] => {
  const [user] = useAuthState(auth);
  const [creationError, setCreationError] = useState(null);
  const groupsRef = collection(db, "channels");
  const groupsQuery = query(
    groupsRef,
    where("memberUIDs", "array-contains", user?.uid)
  );

  const [loading, channels, error] =
    useCollectionSubscription<Channel[]>(groupsQuery);

  const createChannel = async (members?: User[]) => {
    if (auth.currentUser) {
      try {
        const channelID = await debounceCreateChannel({
          createdBy: getUser(auth.currentUser),
          members,
        });
        return channelID;
      } catch (e: any) {
        setCreationError(e.message);
      }
    }
  };

  const data = {
    channels: channels || [],
    loading,
    error: creationError || error,
  };
  return [data, createChannel];
};
