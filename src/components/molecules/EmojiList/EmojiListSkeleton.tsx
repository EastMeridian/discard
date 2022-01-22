import React from "react";
import styled from "styled-components";

const EmojiSkeleton = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 2px;
  background-color: #00000019;
`;

const EmojiListSkeleton = () => {
  return (
    <>
      {Array.from(Array(64).keys()).map((value, index) => (
        <EmojiSkeleton key={value + index} />
      ))}
    </>
  );
};

export default EmojiListSkeleton;
