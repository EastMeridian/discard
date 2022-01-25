import { Editor, convertFromRaw, EditorState } from "draft-js";
import { noop } from "lodash";
import { TextMessage } from "models/message";

export interface TextContentProps {
  message: TextMessage;
}

const TextContent = ({ message }: TextContentProps) => {
  const { text } = message;

  const contentState = convertFromRaw(text);
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div>
      <Editor editorState={editorState} readOnly={true} onChange={noop} />
    </div>
  );
};

export default TextContent;
