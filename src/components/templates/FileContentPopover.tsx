import { Dialog } from "@mui/material";
import { FileMessage } from "models/message";

export interface FileContentDialogProps {
  open: boolean;
  initialIndex?: number;
  message: FileMessage;
  onClose?: () => void;
}

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
      <img
        src={message.files[initialIndex]}
        alt="fullscreen"
        style={{ objectFit: "contain", maxHeight: "90vh", maxWidth: "90vw" }}
      />
    </Dialog>
  );
};

export default FileContentPopover;
