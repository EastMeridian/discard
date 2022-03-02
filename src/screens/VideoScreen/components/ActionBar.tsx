import styled from "styled-components";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, useTheme } from "@mui/material";

export const ActionBarContainer = styled("div")(({ theme }) => ({
  height: "6rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  color: "#E3E6EA",
}));

export const IconButtonContainer = styled("div")<{ color?: string }>(
  ({ theme, color }) => ({
    borderRadius: "2rem",
    backgroundColor: color ?? "#ffffff30",
  })
);

export const CallEndButtonContainer = styled("div")(({ theme }) => ({
  borderRadius: "2rem",
  backgroundColor: theme.palette.error.main,
  padding: "0 0.5rem",
}));

export interface ActionBarProps {
  micOff?: boolean;
  onTurnMicOff?: () => void;
  cameraOff?: boolean;
  onTurnOffCamera?: () => void;
  onCallEnd?: () => void;
}

const ActionBar = ({
  micOff,
  onTurnMicOff,
  cameraOff,
  onTurnOffCamera,
  onCallEnd,
}: ActionBarProps) => {
  const theme = useTheme();
  return (
    <ActionBarContainer>
      <IconButtonContainer
        color={micOff ? theme.palette.error.light : undefined}
      >
        <IconButton aria-label="mic" color="inherit" onClick={onTurnMicOff}>
          {micOff ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
      </IconButtonContainer>
      <IconButtonContainer
        color={cameraOff ? theme.palette.error.light : undefined}
      >
        <IconButton aria-label="cam" color="inherit" onClick={onTurnOffCamera}>
          {cameraOff ? <VideocamOffIcon /> : <VideocamIcon />}
        </IconButton>
      </IconButtonContainer>
      <IconButtonContainer>
        <IconButton aria-label="more" color="inherit">
          <MoreVertIcon />
        </IconButton>
      </IconButtonContainer>
      <CallEndButtonContainer>
        <IconButton aria-label="call-end" color="inherit" onClick={onCallEnd}>
          <CallEndIcon />
        </IconButton>
      </CallEndButtonContainer>
    </ActionBarContainer>
  );
};

export default ActionBar;
