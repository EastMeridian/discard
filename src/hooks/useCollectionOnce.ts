import {
  collectionReducer,
  collectionInitialeState,
} from "reducers/collectionReducer";
import {
  Query,
  DocumentData,
  getDocs,
  FirestoreError,
} from "firebase/firestore";
import { useEffect, useReducer } from "react";

type CollectionValue<T, E> = [loading: boolean, value: T, error?: E];

export const useCollectionOnce = <T = DocumentData, Q = any>(
  query: Query<Q>
): CollectionValue<T, FirestoreError> => {
  const [{ loading, value, error }, dispatch] = useReducer(
    collectionReducer<FirestoreError>(),
    collectionInitialeState
  );

  useEffect(() => {
    (async () => {
      if (loading) {
        try {
          const result = await getDocs(query);
          dispatch({
            type: "value",
            value: result.docs.map((doc) => {
              const id = doc.id;
              return { id, ...doc.data() };
            }),
          });
        } catch (error: any) {
          dispatch({ type: "error", error });
        }
      }
    })();
  }, [query, loading]);

  /* return useMemo(() => [loading, value, error], [loading, value, error]); */
  return [loading, value, error];
};
