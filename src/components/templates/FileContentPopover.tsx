import { Dialog } from "@mui/material";
import { FileMessage } from "models/message";
import styled from "styled-components";

export interface FileContentDialogProps {
  open: boolean;
  initialIndex?: number;
  message: FileMessage;
  onClose?: () => void;
}

const PopoverImage = styled.img`
  object-fit: contain;
  max-width: 100vw;
  max-height: 100vh;
`;

const FileContentPopover = ({
  onClose,
  open,
  message,
  initialIndex = 0,
}: FileContentDialogProps) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <PopoverImage src={message.files[initialIndex]} alt="fullscreen" />
    </Dialog>
  );
};

export default FileContentPopover;
