import { getAuth } from "@firebase/auth";
import { useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  limit,
} from "@firebase/firestore";
import { db } from "services/firestore";
import { User } from "models/user";

const usersRef = collection(db, "users");

const auth = getAuth();

const searchUser = async (text: string) => {
  const q = query(
    usersRef,
    orderBy("displayName"),
    startAt(text),
    endAt(text + "\uf8ff"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => {
      const id = doc.id;
      const user = doc.data() as User;
      return { id, ...user };
    })
    .filter(({ uid }) => uid !== auth.currentUser?.uid);
};

const debouncedSearchUser = debounce(
  async (text, callback) => {
    const users = await searchUser(text);
    callback(users);
  },
  500,
  { leading: true }
);

type UserSearchValue = [
  value: { users: User[]; value: string },
  onSearch: (text: string) => void
];

const getAllUsers = query(usersRef, orderBy("displayName"), limit(10));

export const useUserSearch = (): UserSearchValue => {
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const searchValueRef = useRef("");

  const onSearch = (text: string) => {
    setSearchValue(text);
    searchValueRef.current = text;
  };

  useEffect(() => {
    (async () => {
      if (searchValue === "") {
        const snapshot = await getDocs(getAllUsers);
        if (searchValueRef.current === "") {
          setFoundUsers(
            snapshot.docs
              .map((doc) => {
                const id = doc.id;
                const user = doc.data() as User;
                return { id, ...user };
              })
              .filter(({ uid }) => uid !== auth.currentUser?.uid)
          );
        }
      }
    })();
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      debouncedSearchUser(searchValue, (users: User[]) => {
        if (searchValueRef.current !== "") {
          setFoundUsers(users);
        }
      });
    }
  }, [searchValue]);

  return [{ users: foundUsers, value: searchValue }, onSearch];
};
