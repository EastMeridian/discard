import { ref, uploadBytes } from "firebase/storage";
import { FileUpload } from "models/file";
import { auth, storage } from "services/firestore";
import { createImageStorageURL } from "utils/url";

const uploadOneFile = async (fileUpload: FileUpload) => {
  if (!auth.currentUser)
    throw new Error(`Failed to upload file, currentUser: ${auth.currentUser}`);

  const { file, name } = fileUpload;
  const storageRef = ref(
    storage,
    createImageStorageURL(auth.currentUser?.uid, name)
  );
  return uploadBytes(storageRef, file);
};

export const uploadManyFiles = async (fileUploads: FileUpload[]) =>
  await Promise.all(fileUploads.map(uploadOneFile));
