/* eslint-disable react-hooks/exhaustive-deps */
import {
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useRef } from "react";
import { createSnapshotManager } from "./createSnapshotManager";

const MAX_LISTENERS = 50;

export const useSnapshotManager = (
  channelID: string,
  query: Query<DocumentData>,
  onNext: (snapshot: QuerySnapshot<DocumentData>) => void
) => {
  const managerRef = useRef(createSnapshotManager(MAX_LISTENERS));

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
