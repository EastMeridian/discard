import styled from "styled-components";

interface TextSkeletonProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  variant?: "dark" | "light";
}

const TextSkeleton = styled.div<TextSkeletonProps>`
  background-color: ${(props) =>
    props.variant === "dark" ? "#00000033" : "#0000001c"};
  border-radius: 1rem;
  width: ${(props) => props.width || "4rem"};
  height: ${(props) => props.height || "1rem"};
`;

export default TextSkeleton;
