import { FileUpload } from "models/file";
import { useCallback, useMemo, useState } from "react";
import { createGenericContext } from "utils/createGenericContext";
import { extractFileFromURL } from "utils/url";

interface FileSelectorContext {
  selectedFiles: FileUpload[];
  removeFile: (file: string) => void;
  addFiles: (nextFiles: FileList | File[]) => void;
  resetSelectedFiles: () => void;
}

const [useFileSelector, FileSelectorContextProvider] =
  createGenericContext<FileSelectorContext>();

interface FileSelectorContextProviderProps {
  children: React.ReactNode;
}

const FileSelectorProvider = ({
  children,
}: FileSelectorContextProviderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([]);

  const removeFile = useCallback((file: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((item) => item.localURL !== file)
    );
  }, []);

  const addFiles = (nextFiles: FileList | File[]) => {
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

  const value = useMemo(
    () => ({
      selectedFiles,
      removeFile,
      addFiles,
      resetSelectedFiles,
    }),
    [selectedFiles, removeFile]
  );

  return (
    <FileSelectorContextProvider value={value}>
      {children}
    </FileSelectorContextProvider>
  );
};

export { useFileSelector, FileSelectorProvider };
