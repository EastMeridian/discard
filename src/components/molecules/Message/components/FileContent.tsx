import { FileMessage } from "models/message";

export interface FileContentProps {
  message: FileMessage;
}

const FileContent = ({ message }: FileContentProps) => {
  const { files } = message;

  return (
    <>
      {files.map((src) => (
        <img alt={src} src={src} />
      ))}
    </>
  );
};

export default FileContent;
