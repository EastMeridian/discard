import {
  collectionReducer,
  collectionInitialeState,
} from "reducers/collectionReducer";
import { useReducer } from "react";
import { FirestoreError } from "@firebase/firestore";

export const useLoadingValue = () =>
  useReducer(collectionReducer<FirestoreError>(), collectionInitialeState);
