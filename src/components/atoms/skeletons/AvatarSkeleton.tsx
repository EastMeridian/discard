import { Skeleton, SkeletonProps } from "@mui/material";

interface AvatarSkeletonProps extends SkeletonProps {}

const AvatarSkeleton = ({
  animation = false,
  width = 40,
  height = 40,
}: AvatarSkeletonProps) => (
  <Skeleton
    animation={animation}
    variant="circular"
    width={width}
    height={height}
  />
);

export default AvatarSkeleton;
