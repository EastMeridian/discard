import {
  Editor,
  EditorState,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding,
  convertToRaw,
  RawDraftContentState,
} from "draft-js";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "draft-js/dist/Draft.css";
import {
  RichEditorContainer,
  RichEditorLayout,
  RichEditorPaper,
} from "./layouts";
import RichEditorActionBar from "./RichEditorActionBar";
import { Divider, Popover, useMediaQuery } from "@mui/material";
import SendButton from "./SendButton";
import { EditorUtils } from "./EditorUtils";
import EmojiList from "components/molecules/EmojiList";

const { isSoftNewlineEvent } = KeyBindingUtil;

/* function myBlockStyleFn(contentBlock: ContentBlock) {
  const type = contentBlock.getType();
  console.log({ type });
  return null;
} */

const myKeyBindingFn = (e: KeyboardEvent): string | null => {
  if (isSoftNewlineEvent(e)) {
    return "split-block";
  }
  if (e.key === "Enter") {
    return "submit-content";
  }

  return getDefaultKeyBinding(e);
};

interface Props {
  onSubmit: (raw: RawDraftContentState) => void;
  channelID?: string;
  placeholder: string;
}

const RichEditor = ({ onSubmit, channelID, placeholder }: Props) => {
  console.log("RENDER", channelID);
  const editorRef = useRef<Editor>(null);
  const matches = useMediaQuery("(max-width:320px)");
  const [displayActions, setDisplayActions] = useState(!matches);
  const focusedRef = useRef(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    console.log(
      "FLUSH EDITOR before",
      editorState,
      editorState.getCurrentContent().hasText()
    );
    flushEditorState();
    setTimeout(() => onFocus(), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelID]);

  useEffect(() => {
    if (matches) setDisplayActions(false);
  }, [matches]);

  const onChange = (value: EditorState) => {
    console.log("ONCHANGE", convertToRaw(value.getCurrentContent()));
    setEditorState(value);
  };

  const flushEditorState = () => {
    onChange(EditorUtils.getResetEditorState(editorState));
  };

  const onSubmitContent = (editorState: EditorState) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    onSubmit(raw);
    flushEditorState();
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    console.log({ command });
    if (command === "submit-content") {
      onSubmitContent(editorState);
      return "handled";
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const onFocus = () => {
    const editor = editorRef.current;
    const focused = focusedRef.current;
    console.log({ editor, focused });
    if (editor && !focused) {
      editor.focus();
    }
  };

  const onSelectEmoji = (emoji: string) => {
    const newEditorState = EditorUtils.insertCharacter(emoji, editorState);
    setEditorState(newEditorState);
  };

  const sendDisabled = !editorState.getCurrentContent().hasText();

  const popoverOpen = Boolean(anchorEl);

  return (
    <RichEditorPaper onFocus={onFocus}>
      <RichEditorLayout>
        {matches && (
          <IconButton
            onClick={() => setDisplayActions(!displayActions)}
            size="small"
          >
            <AddIcon />
          </IconButton>
        )}
        <RichEditorContainer>
          <Editor
            ref={editorRef}
            placeholder={EditorUtils.maybePlaceholder(editorState, placeholder)}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
            onFocus={() => (focusedRef.current = true)}
            onBlur={() => (focusedRef.current = false)}
          />
        </RichEditorContainer>
        {matches && (
          <SendButton
            onClick={() => onSubmitContent(editorState)}
            disabled={sendDisabled}
          />
        )}
      </RichEditorLayout>
      {displayActions && (
        <>
          <Divider style={{ margin: "0.25rem 0" }} />
          <RichEditorActionBar
            styleFormats={editorState.getCurrentInlineStyle().toObject()}
            currentBlockType={EditorUtils.getCurrentBlockType(editorState)}
            onFormatStyle={(format) =>
              setEditorState(RichUtils.toggleInlineStyle(editorState, format))
            }
            onFormatBlock={(format) =>
              setEditorState(RichUtils.toggleBlockType(editorState, format))
            }
            onClickAttachFile={() => {}}
            onClickEmoji={(event: React.MouseEvent<HTMLButtonElement>) => {
              setAnchorEl(event.currentTarget);
            }}
            onClickSubmit={() => onSubmitContent(editorState)}
            submitDisabled={sendDisabled}
            shouldDisplaySubmit={!matches}
          />
        </>
      )}
      <Popover
        id={popoverOpen ? "icons-popover" : undefined}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            padding: "1rem",
            height: "24rem",
          }}
        >
          <EmojiList onClick={onSelectEmoji} />
        </div>
      </Popover>
    </RichEditorPaper>
  );
};

export default RichEditor;
