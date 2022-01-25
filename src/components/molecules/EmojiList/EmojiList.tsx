import emojis from "constants/emojis";
import EmojiButton from "components/atoms/EmojiButton";

export interface EmojiListProps {
  onClick?: (emoji: string) => void;
}

const EmojiList = ({ onClick }: EmojiListProps) => (
  <>
    {emojis.map((emoji) => (
      <EmojiButton key={emoji} onClick={() => onClick?.(emoji)}>
        <div>{emoji}</div>
      </EmojiButton>
    ))}
  </>
);

export default EmojiList;
