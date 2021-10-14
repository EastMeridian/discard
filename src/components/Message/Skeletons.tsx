import AvatarSkeleton from "components/skeletons/AvatarSkeleton";
import ImgSkeleton from "components/skeletons/ImgSkeleton";
import TextSkeleton from "components/skeletons/TextSkeleton";
import { memo } from "react";
import styled from "styled-components";
import { MessageContentContainer } from "./ChatMessage";

const Container = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
`;

const TextLineLayout = styled.div`
  display: flex;
  & > div {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const getRandomRange = (minimum: number, maximum: number) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

const getRandomTextNumber = () => getRandomRange(4, 8);

const getRandomWidth = () => getRandomRange(2, 6);

const RandomTextLine = () => (
  <TextLineLayout>
    {Array.from(Array(getRandomTextNumber()).keys()).map(() => (
      <TextSkeleton width={getRandomWidth() + "rem"} />
    ))}
  </TextLineLayout>
);

const MessageSkeletonA = () => (
  <Container>
    <AvatarSkeleton />
    <MessageContentContainer>
      <TextLineLayout>
        <TextSkeleton width="7rem" variant="dark" />
      </TextLineLayout>
      <RandomTextLine />
      <RandomTextLine />
      <RandomTextLine />
      <RandomTextLine />
    </MessageContentContainer>
  </Container>
);

const MessageSkeletonB = () => (
  <Container>
    <AvatarSkeleton />
    <MessageContentContainer>
      <TextLineLayout>
        <TextSkeleton width="7rem" variant="dark" />
      </TextLineLayout>
      <RandomTextLine />
      <ImgSkeleton width="18rem" height="7rem" />
    </MessageContentContainer>
  </Container>
);

const MessageSkeletonC = () => (
  <Container>
    <AvatarSkeleton />
    <MessageContentContainer>
      <TextLineLayout>
        <TextSkeleton width="7rem" variant="dark" />
      </TextLineLayout>
      <RandomTextLine />
      <TextLineLayout>
        <ImgSkeleton width="12rem" height="12rem" />
      </TextLineLayout>
      <RandomTextLine />
    </MessageContentContainer>
  </Container>
);

interface MessageSkeletonsProps {
  key: string;
}

const MessageSkeletons = memo(
  (props: MessageSkeletonsProps) => (
    <>
      <MessageSkeletonA />
      <MessageSkeletonB />
      <MessageSkeletonC />
      <MessageSkeletonA />
    </>
  ),
  (prevProps, nextProps) => prevProps.key === nextProps.key
);

export default MessageSkeletons;
