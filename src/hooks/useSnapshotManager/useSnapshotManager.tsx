/* eslint-disable react-hooks/exhaustive-deps */
import {
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useRef } from "react";
import { createSnapshotManager } from "./createSnapshotManager";

const DEFAULT_MAX_LISTENERS = 60;

interface Options {
  channelID: string;
  query: Query<DocumentData>;
  maxListeners?: number;
}

export const useSnapshotManager = (
  { channelID, query, maxListeners = DEFAULT_MAX_LISTENERS }: Options,
  onNext: (snapshot: QuerySnapshot<DocumentData>) => void
) => {
  const managerRef = useRef(createSnapshotManager(maxListeners));

  useEffect(() => {
    const manager = managerRef.current;
    return () => {
      manager.clear();
    };
  }, []);

  useEffect(() => {
    const manager = managerRef.current;
    if (manager.exist(channelID)) return;
    manager.add(channelID, onSnapshot(query, onNext));
  }, [channelID]);
};
