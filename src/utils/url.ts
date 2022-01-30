import { User } from "models/user";

export const extractFileFromURL = (path: string) => {
  const name = path.split(/(\\|\/)/g).pop();
  if (!name) throw new Error(`No name found on path ${path}`);
  return name;
};
export const createImageStorageURL = (uid: User["uid"], file: string) =>
  `images/${uid}/${file}`;
