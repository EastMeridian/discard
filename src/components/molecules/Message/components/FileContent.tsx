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
  gap: 0.5rem;
  padding: 1rem 0;
`;

const FileContainer = styled("div")(({ theme }) => ({
  borderRadius: "0.5rem",
  height: "16rem",
  flex: 0.33,
  backgroundColor: theme.colors.surface.main,
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
}));

const FileThumbnail = styled.img`
  width: 100%;
  height: 100%;
  cursor: zoom-in;
  object-fit: cover;
`;

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
        <FileContainer>
          <FileThumbnail alt={src} src={src} key={src} />
        </FileContainer>
      ))}
    </FilesContainer>
  );
};

export default FileContent;
