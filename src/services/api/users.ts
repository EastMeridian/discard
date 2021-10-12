import { User as AuthUser } from "@firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { User } from "models/user";
import { db } from "services/firestore";

export const createUser = async ({
  uid,
  displayName,
  photoURL,
  email,
}: User) => {
  const usersRef = doc(db, "users", uid);
  await setDoc(usersRef, {
    uid,
    displayName,
    photoURL,
    email,
  });
};

export const userExists = async (uid: User["uid"]) => {
  const usersRef = doc(db, "users", uid);
  const docSnap = await getDoc(usersRef);
  return docSnap.exists();
};

export const getUser = ({ uid, displayName, photoURL, email }: AuthUser) => ({
  uid,
  displayName,
  photoURL,
  email,
});
