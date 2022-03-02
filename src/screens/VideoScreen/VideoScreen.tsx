/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Peer from "simple-peer";
import { ScreenContainer } from "./components/layouts";
import AuthorizationView from "./components/AuthorizationView";
import { useMediaDevices } from "react-use";
import ActionBar from "./components/ActionBar";

const VideoView = () => {
  const theme = useTheme();
  let [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [micOff, setMicOff] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [authorizedMedia, setAuthorizedMedia] = useState(false);
  const state = useMediaDevices();

  const [accepted, setAccepted] = useState();
  const [stream, setStream] = useState<MediaStream>();

  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>();

  console.log({ state });

  const onUserMedia = (stream: MediaStream) => {
    setAuthorizedMedia(true);
    setStream(stream);
    setLoading(false);

    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        onUserMedia(stream);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();
  }, []);

  console.log(userVideo);
  return (
    <ScreenContainer>
      {loading && <CircularProgress color="inherit" />}
      {!authorizedMedia && !loading && <AuthorizationView />}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            flex: 1,
            /*             position: "relative", */
            display: "flex",
            margin: "0 2rem",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <div style={{ backgroundColor: "green" }}>
            <video
              ref={userVideo}
              style={{
                transform: "scaleX(-1)",
              }}
              autoPlay
              muted
            />
          </div>
          <video
            ref={userVideo}
            style={{
              /* width: "100%", */
              transform: "scaleX(-1)",
            }}
            autoPlay
            muted
          />
          {/*  <video
            ref={userVideo}
            style={{
              width: "100%",
              transform: "scaleX(-1)",
              objectFit: "contain",
            }}
            autoPlay
            muted
          /> */}
        </div>
        <ActionBar
          micOff={micOff}
          onTurnMicOff={() => setMicOff((value) => !value)}
          cameraOff={cameraOff}
          onTurnOffCamera={() => setCameraOff((value) => !value)}
        />
      </div>
    </ScreenContainer>
  );
};

export default VideoView;
