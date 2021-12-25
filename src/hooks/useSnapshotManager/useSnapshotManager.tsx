/* eslint-disable react-hooks/exhaustive-deps */
import {
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useRef } from "react";
import { createSnapshotManager } from "./createSnapshotManager";

const MAX_LISTENERS = 60;

export const useSnapshotManager = (
  options: {
    channelID: string;
    query: Query<DocumentData>;
    maxListeners: number;
  },
  onNext: (snapshot: QuerySnapshot<DocumentData>) => void
) => {
  const { channelID, query, maxListeners = MAX_LISTENERS } = options;
  const managerRef = useRef(createSnapshotManager(maxListeners));

  useEffect(() => {
    const manager = managerRef.current;
    return () => {
      manager.clear();
    };
  }, []);

  useEffect(() => {
    const manager = managerRef.current;
    manager.add(channelID, onSnapshot(query, onNext));
  }, [channelID]);
};
