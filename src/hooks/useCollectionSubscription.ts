/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadingValue } from "./useLoadingValue";

import {
  Query,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";

import { useEffect } from "react";

type CollectionValue<T, E> = [loading: boolean, value?: T, error?: E];

export const useCollectionSubscription = <T = DocumentData, Q = any>(
  query: Query<Q>,
  dependencies: React.DependencyList = []
): CollectionValue<T, FirestoreError> => {
  const [{ loading, value, error }, dispatch] = useLoadingValue();

  useEffect(() => {
    dispatch({ type: "reset" });
    const unsubscribe = onSnapshot(query, (snapshot) => {
      dispatch({
        type: "value",
        value: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      });
    });
    return () => {
      unsubscribe();
    };
  }, dependencies);

  /* return useMemo(() => [loading, value, error], [loading, value, error]); */
  return [loading, value, error];
};
