import { FileUpload } from "models/file";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { extractFileFromURL } from "utils/url";

const FileSelectorContext = createContext<
  | {
      selectedFiles: FileUpload[];
      removeFile: (file: string) => void;
      addFiles: (nextFiles: FileList | File[]) => void;
      resetSelectedFiles: () => void;
    }
  | undefined
>(undefined);

interface FileSelectorContextProviderProps {
  children: React.ReactNode;
}

export const FileSelectorContextProvider = ({
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
    <FileSelectorContext.Provider value={value}>
      {children}
    </FileSelectorContext.Provider>
  );
};

export const useFileSelector = () => {
  const contextIsDefined = useContext(FileSelectorContext);

  if (!contextIsDefined) {
    throw new Error("useGenericContext must be used within a Provider");
  }

  return contextIsDefined;
};
