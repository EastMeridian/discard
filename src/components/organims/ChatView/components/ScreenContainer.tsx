import { DropzoneOverlay } from "components/molecules/DropzoneOverlay";
import { useFileSelector } from "contexts/FileSelectorContext";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Container = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding: 0;
`;

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
