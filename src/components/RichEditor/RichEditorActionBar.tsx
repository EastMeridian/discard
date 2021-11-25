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
} from "./layouts";
import React from "react";
import SendButton from "./SendButton";

export interface RichEditorActionBarProps {
  styleFormats?: Record<string, string>;
  currentBlockType?: string;
  onFormatStyle?: (nextFormat: string) => void;
  onFormatBlock?: (nextBlock: string) => void;
  onClickAttachFile?: () => void;
  onClickEmoji?: () => void;
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
        <IconButton onClick={onClickAttachFile} size="small">
          <AttachFileIcon />
        </IconButton>
        <IconButton onClick={onClickEmoji} size="small">
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
