import FileContentPopover from "components/templates/FileContentPopover";
import { FileMessage } from "models/message";
import { useState } from "react";
import styled from "styled-components";

export interface FileContentProps {
  message: FileMessage;
}

const FilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0;
`;

const FileThumbnail = styled("img")(({ theme }) => ({
  borderRadius: "0.25rem",
  cursor: "zoom-in",
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    maxWidth: "12rem",
    height: "6.75rem",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "16rem",
    height: "9rem",
  },
  backgroundColor: theme.colors.surface.main,
}));

const FileContent = ({ message }: FileContentProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <FilesContainer>
        {message.files.map((src, index) => (
          <FileThumbnail
            alt={src}
            src={src}
            key={src}
            onClick={() => {
              setIndex(index);
              setOpen(true);
            }}
          />
        ))}
      </FilesContainer>

      <FileContentPopover
        open={open}
        message={message}
        initialIndex={index}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default FileContent;
