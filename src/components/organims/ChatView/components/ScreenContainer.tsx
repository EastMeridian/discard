import { styled } from "@mui/material";
import { DropzoneOverlay } from "components/molecules/DropzoneOverlay";
import { useFileSelector } from "contexts/FileSelectorContext";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Container = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: theme.colors.surface.paper,
  padding: 0,
}));

interface ScreenContainerProps {
  children: React.ReactNode;
}

export const ScreenContainer = ({ children }: ScreenContainerProps) => {
  const { addFiles } = useFileSelector();

  const onDrop = useCallback(addFiles, [addFiles]);

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
      {isDragActive && <DropzoneOverlay />}
    </Container>
  );
};
