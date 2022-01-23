import styled from "styled-components";

interface ImgSkeletonProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
}

const ImgSkeleton = styled.div<ImgSkeletonProps>`
  background-color: #00000019;
  border-radius: 0.25rem;
  width: ${(props) => props.width || "4rem"};
  height: ${(props) => props.height || "1rem"};
`;

export default ImgSkeleton;
