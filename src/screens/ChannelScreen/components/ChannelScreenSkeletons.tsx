import Skeleton from "@mui/material/Skeleton";

const ChannelScreenSkeletons = () => (
  <div style={{ padding: "0 0.5rem" }}>
    <Skeleton height="3rem" />
    <Skeleton height="3rem" sx={{ marginLeft: "1rem" }} />
    <Skeleton height="3rem" sx={{ marginLeft: "2rem" }} />
  </div>
);

export default ChannelScreenSkeletons;
