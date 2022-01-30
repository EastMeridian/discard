import { extractFileFromURL } from "./../utils/url";
import { useState } from "react";
import { FileUpload } from "models/file";

export const useFileSelector = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([]);

  const removeFile = (file: string) => {
    console.log({ file, selectedFiles });
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((item) => item.localURL !== file)
    );
  };

  const addFiles = (nextFiles: FileList) => {
    console.log({ nextFiles });
    setSelectedFiles(
      Array.from(nextFiles)
        .slice(0, 3)
        .map((file) => {
          const localURL = URL.createObjectURL(file);
          const name = extractFileFromURL(localURL);
          return { localURL, name, file };
        })
    );
  };

  const resetSelectedFiles = () => setSelectedFiles([]);

  return { selectedFiles, removeFile, addFiles, resetSelectedFiles };
};
