import { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const Image = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 0.5rem;
`;

const Container = styled.div`
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #ebebeb;
  border-radius: 50%;
`;

export interface UploadImageProps {
  src: string;
  onDelete?: (src: string) => void;
}

export const UploadImage = ({ src, onDelete }: UploadImageProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={src} alt={src} />
      {hovered && (
        <CloseButton
          onClick={() => onDelete?.(src)}
          onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <CloseIcon fontSize={"small"} />
        </CloseButton>
      )}
    </Container>
  );
};
