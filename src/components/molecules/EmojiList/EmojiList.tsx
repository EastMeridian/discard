import React from "react";
import emojis from "constants/emojis";
import styled from "styled-components";

console.log("EmojiListFile loaded");

const EmojiButton = styled.div`
  font-size: 2rem;
  line-height: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin: 2px;
  cursor: pointer;
  &:hover {
    background-color: #f2f3f5;
  }
  &:active {
    background-color: #d2d2d3;
  }
`;

export interface EmojiListProps {
  onClick?: (emoji: string) => void;
}

const EmojiList = ({ onClick }: EmojiListProps) => {
  return (
    <>
      {emojis.map((emoji) => (
        <EmojiButton key={emoji} onClick={() => onClick?.(emoji)}>
          <div>{emoji}</div>
        </EmojiButton>
      ))}
    </>
  );
};

export default EmojiList;
