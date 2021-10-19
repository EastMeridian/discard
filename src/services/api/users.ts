import { User as AuthUser } from "@firebase/auth";
import {
  collection,
  doc,
  endAt,
  getDoc,
  limit,
  query,
  setDoc,
  startAt,
  orderBy,
  getDocs,
} from "@firebase/firestore";
import { User } from "models/user";
import { auth, db } from "services/firestore";

export const createUser = async ({
  uid,
  displayName,
  photoURL,
  email,
}: User) => {
  const userRef = doc(db, "users", uid);

  const exist = await userExists(uid);

  if (!exist) {
    await setDoc(userRef, {
      uid,
      displayName,
      photoURL,
      email,
    });
  }
};

export const userExists = async (uid: User["uid"]) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists();
};

export const getUser = ({ uid, displayName, photoURL, email }: AuthUser) => ({
  uid,
  displayName,
  photoURL,
  email,
});

export const searchUser = async (text: string) => {
  const usersRef = collection(db, "users");

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
