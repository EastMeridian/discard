import { getDownloadURL, ref } from "firebase/storage";
import { FileMessage } from "models/message";
import { useEffect, useState } from "react";
import { storage } from "services/firestore";
import styled from "styled-components";

export interface FileContentProps {
  message: FileMessage;
}

const FilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0;
  min-height: 9rem;
`;

const FileThumbnail = styled("img")(({ theme }) => ({
  borderRadius: "0.25rem",
  cursor: "zoom-in",
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    width: "9rem",
    height: "7rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "16rem",
    height: "9rem",
  },
  backgroundColor: theme.colors.surface.main,
}));

const FileContent = ({ message }: FileContentProps) => {
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { files } = message;
      const nextSources = await Promise.all(
        files.map((file) => getDownloadURL(ref(storage, file)))
      );
      console.log({ nextSources });
      setSources(nextSources);
    })();
  }, [message]);

  return (
    <FilesContainer>
      {sources.map((src) => (
        <FileThumbnail alt={src} src={src} key={src} />
      ))}
    </FilesContainer>
  );
};

export default FileContent;
