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
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import "draft-js/dist/Draft.css";
import {
  RichEditorContainer,
  RichEditorLayout,
  RichEditorPaper,
} from "./layouts";
import RichEditorActionBar from "./RichEditorActionBar";
import { Divider, useMediaQuery } from "@mui/material";
import SendButton from "./SendButton";
import { EditorUtils } from "./EditorUtils";

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
  const editorRef = useRef<Editor>(null);
  const matches = useMediaQuery("(max-width:320px)");
  const [displayActions, setDisplayActions] = useState(!matches);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    setEditorState(EditorUtils.getResetEditorState(editorState));
    onFocus();
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
    if (editor) {
      editor.focus();
      RichUtils.toggleInlineStyle(editorState, "BOLD");
    }
  };

  const sendDisabled = !editorState.getCurrentContent().hasText();

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
            onClickEmoji={() => {}}
            onClickSubmit={() => onSubmitContent(editorState)}
            submitDisabled={sendDisabled}
            shouldDisplaySubmit={!matches}
          />
        </>
      )}
    </RichEditorPaper>
  );
};

export default RichEditor;
