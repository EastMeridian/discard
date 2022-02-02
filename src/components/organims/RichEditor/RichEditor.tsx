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
import {
  KeyboardEvent,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import "draft-js/dist/Draft.css";
import {
  EmojiListContainer,
  FileContainer,
  RichEditorContainer,
  RichEditorLayout,
  RichEditorPaper,
} from "./layouts";
import RichEditorActionBar from "./components/RichEditorActionBar";
import { Divider, Popover, useMediaQuery } from "@mui/material";
import SendButton from "./components/SendButton";
import { EditorUtils } from "./EditorUtils";
import EmojiListSkeleton from "../../molecules/EmojiList/EmojiListSkeleton";
import { UploadImage } from "./components/UploadImage";
import { FileUpload } from "models/file";
import { useFileSelector } from "contexts/FileSelectorContext";

const EmojiList = lazy(() => import("components/molecules/EmojiList"));

const { isSoftNewlineEvent } = KeyBindingUtil;

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
  onSubmit: (raw: RawDraftContentState | null, files: FileUpload[]) => void;
  channelID?: string;
  placeholder: string;
}

const RichEditor = ({ onSubmit, channelID, placeholder }: Props) => {
  const editorRef = useRef<Editor>(null);
  const matches = useMediaQuery("(max-width:320px)");
  const [displayActions, setDisplayActions] = useState(!matches);
  const focusedRef = useRef(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { selectedFiles, addFiles, removeFile, resetSelectedFiles } =
    useFileSelector();

  useEffect(() => {
    flushEditorState();
    setTimeout(() => onFocus(), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelID]);

  useEffect(() => {
    if (matches) setDisplayActions(false);
  }, [matches]);

  const onChange = (value: EditorState) => {
    setEditorState(value);
  };

  const flushEditorState = () => {
    onChange(EditorUtils.getResetEditorState(editorState));
  };

  const onSubmitContent = (editorState: EditorState) => {
    const currentContent = editorState.getCurrentContent();
    const raw = currentContent.hasText() ? convertToRaw(currentContent) : null;
    onSubmit(raw, selectedFiles);
    flushEditorState();
    resetSelectedFiles();
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
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
    if (!anchorEl) {
      const editor = editorRef.current;
      const focused = focusedRef.current;
      if (editor && !focused) {
        focusedRef.current = true;
        editor.focus();
      }
    }
  };

  const onSelectEmoji = (emoji: string) => {
    const newEditorState = EditorUtils.insertCharacter(emoji, editorState);
    setEditorState(newEditorState);
  };

  const sendDisabled = !editorState.getCurrentContent().hasText();

  const popoverOpen = Boolean(anchorEl);

  return (
    <RichEditorPaper
      onFocus={onFocus}
      onBlur={() => (focusedRef.current = false)}
    >
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
          />
        </RichEditorContainer>
        {matches && (
          <SendButton
            onClick={() => onSubmitContent(editorState)}
            disabled={sendDisabled}
          />
        )}
      </RichEditorLayout>
      {selectedFiles.length > 0 && (
        <FileContainer>
          {selectedFiles.map(({ localURL }) => (
            <UploadImage src={localURL} key={localURL} onDelete={removeFile} />
          ))}
        </FileContainer>
      )}
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
            onClickAttachFile={addFiles}
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
        <EmojiListContainer>
          <Suspense fallback={<EmojiListSkeleton />}>
            <EmojiList onClick={onSelectEmoji} />
          </Suspense>
        </EmojiListContainer>
      </Popover>
    </RichEditorPaper>
  );
};

export default RichEditor;
