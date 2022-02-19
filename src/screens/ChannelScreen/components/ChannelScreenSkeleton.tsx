import { styled } from "@mui/material";
import AvatarSkeleton from "components/atoms/AvatarSkeleton";
import TextSkeleton from "components/atoms/TextSkeleton";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.colors.surface.background,
  padding: "0.5rem 1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
}));

const ChannelScreenSkeletons = () => (
  <Container>
    <AvatarSkeleton />
    <TextSkeleton />
  </Container>
);

export default ChannelScreenSkeletons;
