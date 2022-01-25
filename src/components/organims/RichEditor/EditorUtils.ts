import { EditorState, Modifier, RichUtils } from "draft-js";

export class EditorUtils {
  static maybePlaceholder = (editorState: EditorState, placeholder: string) => {
    const contentState = editorState.getCurrentContent();
    const shouldHide =
      contentState.hasText() ||
      contentState.getBlockMap().first().getType() !== "unstyled";
    return shouldHide ? "" : placeholder;
  };

  static getCurrentBlockType = (editorState: EditorState) => {
    const selectionState = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const anchorKey = selectionState.getAnchorKey();
    return currentContent.getBlockForKey(anchorKey).getType();
  };

  static removeSelectedBlocksStyle = (editorState: EditorState) => {
    const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
    if (newContentState) {
      return EditorState.push(
        editorState,
        newContentState,
        "change-block-type"
      );
    }
    return editorState;
  };

  static getResetEditorState = (editorState: EditorState) => {
    const blocks = editorState.getCurrentContent().getBlockMap().toList();
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: blocks.first().get("key"),
      anchorOffset: 0,
      focusKey: blocks.last().get("key"),
      focusOffset: blocks.last().getLength(),
    });

    const newContentState = Modifier.removeRange(
      editorState.getCurrentContent(),
      updatedSelection,
      "forward"
    );

    const newState = EditorState.push(
      editorState,
      newContentState,
      "remove-range"
    );

    return newState; /* this.removeSelectedBlocksStyle(newState); */
  };

  static insertCharacter = (
    characterToInsert: string,
    editorState: EditorState
  ) => {
    const newContent = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      characterToInsert
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );

    return EditorState.forceSelection(
      newEditorState,
      newContent.getSelectionAfter()
    );
  };
}
