import { User } from "./../models/user";
import {
  ref,
  StorageReference,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { useRef, useState } from "react";
import { storage } from "services/firestore";

interface FileUpload {
  localURL: string;
  bucketURL?: string;
  loaded: boolean;
  ref: StorageReference;
}

export const useFileUpload = (uid: User["uid"]) => {
  const tasks = useRef<UploadTask[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([]);

  /*   const cancelTasks = () => {
    tasks.current.map((task) => task.cancel());
    tasks.current = [];
  };
 */
  const removeFile = (file: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((item) => item.localURL !== file)
    );
  };

  const createUploadFile = (file: File) => {
    const localURL = URL.createObjectURL(file);
    const fileRef = ref(storage, `images/${uid}/${file}`);
    const task = uploadBytesResumable(fileRef, file);

    task.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("state_changed", snapshot.state, progress);

      if (progress === 100) {
        setSelectedFiles((prevFiles) =>
          prevFiles.map((prevFile) =>
            prevFile.localURL === localURL
              ? { ...prevFile, loaded: true }
              : prevFile
          )
        );
      }
    });

    tasks.current.push(task);

    return {
      localURL,
      loaded: false,
      ref: fileRef,
    };
  };

  const uploadFiles = (nextFiles: FileList) => {
    setSelectedFiles(Array.from(nextFiles).slice(0, 3).map(createUploadFile));
  };

  console.log({ tasks, selectedFiles });

  return { selectedFiles, uploadFiles, removeFile };
};
