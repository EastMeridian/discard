import { Unsubscribe } from "firebase/auth";

export const createSnapshotManager = (maxIDs: number) => {
  const IDs: string[] = [];
  const listeners: Record<string, Unsubscribe> = {};

  const hasReachedLimit = () => IDs.length >= maxIDs;

  const exist = (channelID: string) => IDs.includes(channelID);

  const pop = () => {
    const channelID = IDs.pop();
    if (channelID) {
      listeners[channelID]();
      delete listeners[channelID];
    }
  };

  const add = (channelID: string, unsubscribe: Unsubscribe) => {
    if (exist(channelID)) return;
    if (hasReachedLimit()) {
      pop();
    }
    IDs.push(channelID);
    listeners[channelID] = unsubscribe;
  };

  const clear = () => {
    IDs.forEach((channelID) => {
      listeners[channelID]();
    });
  };

  return {
    add,
    clear,
    hasReachedLimit,
    exist,
    value: {
      IDs,
      listeners,
    },
  };
};
