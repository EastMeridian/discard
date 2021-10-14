/* eslint-disable react-hooks/exhaustive-deps */
import {
  collectionReducer,
  collectionInitialeState,
} from "reducers/collectionReducer";

import {
  Query,
  DocumentData,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";

import { useEffect, useReducer } from "react";

type CollectionValue<T, E> = [loading: boolean, value?: T, error?: E];

export const useCollectionSubscription = <T = DocumentData, Q = any>(
  query: Query<Q>,
  dependencies: React.DependencyList = []
): CollectionValue<T, FirestoreError> => {
  const [{ loading, value, error }, dispatch] = useReducer(
    collectionReducer<FirestoreError>(),
    collectionInitialeState
  );

  useEffect(() => {
    dispatch({ type: "reset" });
    const unsubscribe = onSnapshot(query, (snapshot) => {
      dispatch({
        type: "value",
        value: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      });
      snapshot.docChanges().forEach(({ type, doc }) => {
        console.log("New type", type, doc.data());
        if (type === "added") {
          /* console.log("New object: ", doc.data()); */
        }
        if (type === "modified") {
          /* console.log("Modified object: ", doc.data()); */
        }
        if (type === "removed") {
          /*  console.log("Removed object: ", doc.data()); */
        }
      });
    });
    /*           result.forEach((doc) => console.log("doc", doc));
          dispatch({
            type: "value",
            value: result.docs.map((doc) => {
              const id = doc.id;
              return { id, ...doc.data() };
            }),
          }); */

    return () => {
      console.log("UNSUBSCRIBE");
      unsubscribe();
    };
  }, dependencies);

  console.log("useCollection");
  /* return useMemo(() => [loading, value, error], [loading, value, error]); */
  return [loading, value, error];
};
