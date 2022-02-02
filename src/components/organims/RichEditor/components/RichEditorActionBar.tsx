import IconButton from "@mui/material/IconButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CodeIcon from "@mui/icons-material/Code";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {
  ActionsContainer,
  FormatContainer,
  InsertContainer,
  StyledToggleButton,
  StyledToggleButtonGroup,
} from "../layouts";
import React, { useRef } from "react";
import SendButton from "./SendButton";
import { styled } from "@mui/system";

const Input = styled("input")({
  display: "none",
});

export interface RichEditorActionBarProps {
  styleFormats?: Record<string, string>;
  currentBlockType?: string;
  onFormatStyle?: (nextFormat: string) => void;
  onFormatBlock?: (nextBlock: string) => void;
  onClickAttachFile?: (files: FileList) => void;
  onClickEmoji?: React.MouseEventHandler<HTMLButtonElement>;
  onClickSubmit?: () => void;
  submitDisabled?: boolean;
  shouldDisplaySubmit?: boolean;
}

const RichEditorActionBar = ({
  styleFormats = {},
  currentBlockType,
  onFormatStyle,
  onFormatBlock,
  onClickAttachFile,
  onClickEmoji,
  onClickSubmit,
  submitDisabled,
  shouldDisplaySubmit = true,
}: RichEditorActionBarProps) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleAttachFile = () => {
    inputFile.current?.click();
  };

  return (
    <ActionsContainer>
      <FormatContainer>
        <StyledToggleButton
          value="BOLD"
          selected={Boolean(styleFormats.BOLD)}
          size="small"
          onChange={() => onFormatStyle?.("BOLD")}
        >
          <FormatBoldIcon />
        </StyledToggleButton>
        <StyledToggleButton
          value="ITALIC"
          selected={Boolean(styleFormats.ITALIC)}
          size="small"
          onChange={() => onFormatStyle?.("ITALIC")}
        >
          <FormatItalicIcon />
        </StyledToggleButton>
        <StyledToggleButton
          value="UNDERLINE"
          selected={Boolean(styleFormats.UNDERLINE)}
          size="small"
          onChange={() => onFormatStyle?.("UNDERLINE")}
        >
          <FormatUnderlinedIcon />
        </StyledToggleButton>
        <StyledToggleButtonGroup
          exclusive
          value={currentBlockType}
          onChange={(_, nextBlock) => onFormatBlock?.(nextBlock)}
        >
          <StyledToggleButton value="code-block" size="small">
            <CodeIcon />
          </StyledToggleButton>
          <StyledToggleButton value="unordered-list-item" size="small">
            <FormatListBulletedIcon />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </FormatContainer>
      <InsertContainer>
        <Input
          ref={inputFile}
          accept="image/*"
          multiple
          type="file"
          onChange={(e) =>
            e.target.files && onClickAttachFile?.(e.target.files)
          }
          onClick={(e) => {
            const element = e.currentTarget as any;
            element.value = null;
          }}
        />
        <IconButton onClick={handleAttachFile} size="small">
          <AttachFileIcon />
        </IconButton>

        <IconButton
          onClick={onClickEmoji}
          size="small"
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          <EmojiEmotionsIcon />
        </IconButton>
        {shouldDisplaySubmit && (
          <SendButton onClick={onClickSubmit} disabled={submitDisabled} />
        )}
      </InsertContainer>
    </ActionsContainer>
  );
};

export default RichEditorActionBar;
