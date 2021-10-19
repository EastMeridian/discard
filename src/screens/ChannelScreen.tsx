import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import AddIcon from "@mui/icons-material/Add";
import ChannelCreationScreen from "components/ChannelCreationScreen";
import React, { useState } from "react";
import { useChannels } from "hooks/useChannels";
import { auth, db } from "services/firestore";
import ListItemGroup from "components/ListItemChannel";
import { User } from "models/user";
import Header from "components/Header";
import { debounce } from "lodash";
import { deleteChannel } from "services/api/channels";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import { Channel } from "models/channel";
import ChatHeader from "screens/ChatScreen/components/ChatHeader";
import ResponsiveDrawer from "components/ResponsiveDrawer";
import ResponsivePopover from "components/ResponsivePopover";
import ChatScreen from "./ChatScreen";
import { useSelectedChannel } from "hooks/useSelectedChannel";
import { useHiddenChannel } from "hooks/useHiddenChannel";

function SignOut() {
  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
}

const ChannelScreen = () => {
  const { hiddenChannels, hideChannel, unhideChannel } = useHiddenChannel();
  const [{ channels, loading, error }, createChannel] = useChannels(auth, db);
  const [selectedChannel, setSelectedChannel] = useSelectedChannel(channels);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleCreateChannel = async (members: User[]) => {
    handleClosePopover();
    const foundID = await createChannel(members);
    if (foundID) {
      const foundChannel = channels.find(({ id }) => id === foundID);
      if (foundChannel) {
        handleSelectChannel(foundChannel);
      }
      unhideChannel(foundID);
    }
  };

  const handleHideChannel = (id: string) => {
    console.log("handleHideChannel");
    hideChannel(id);
    setSelectedChannel();
  };

  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    handleDrawerToggle();
  };

  const popoverOpen = Boolean(anchorEl);

  const filteredChannels = channels.filter(
    ({ id }) => hiddenChannels[id] !== true
  );
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <ResponsiveDrawer
        width="15rem"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <div
          style={{
            backgroundColor: "#F2F3F5",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Header></Header>
          <div
            style={{
              padding: "0.5rem 0.5rem 0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" gutterBottom component="div">
              Messages
            </Typography>

            <Tooltip title="Create a channel" arrow>
              <IconButton aria-label="add" onClick={handleOpenPopover}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div style={{ padding: "0 0.5rem", flex: 1 }}>
            {loading && (
              <div style={{ padding: "0 0.5rem" }}>
                <Skeleton height="3rem" />
                <Skeleton height="3rem" sx={{ marginLeft: "1rem" }} />
                <Skeleton height="3rem" sx={{ marginLeft: "2rem" }} />
              </div>
            )}
            {!loading &&
              filteredChannels?.map((channel) => {
                const { id, members } = channel;
                return (
                  <ListItemGroup
                    members={members}
                    key={id}
                    selected={selectedChannel?.id === id}
                    onClick={() => handleSelectChannel(channel)}
                    onDelete={() => handleHideChannel(id)}
                  />
                );
              })}
          </div>
          <div
            style={{
              backgroundColor: "#ebedef",
              height: "3rem",
              padding: "0 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Avatar
              src={auth.currentUser?.photoURL || undefined}
              sx={{ width: "1.5rem", height: "1.5rem" }}
            />
            <div
              style={{
                flex: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginLeft: "0.5rem",
              }}
            >
              {auth.currentUser?.displayName}
            </div>
            <SignOut />
          </div>
        </div>
      </ResponsiveDrawer>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ChatHeader
          members={selectedChannel?.members}
          onToggleDrawer={handleDrawerToggle}
        />
        {selectedChannel && <ChatScreen channel={selectedChannel} />}
      </div>
      <ResponsivePopover
        id={popoverOpen ? "channel-popover" : undefined}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        onOpen={handleOpenPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <ChannelCreationScreen
          onCreateChannel={handleCreateChannel}
          style={{ width: "30rem", maxWidth: "100%" }}
        />
      </ResponsivePopover>
    </div>
  );
};

export default ChannelScreen;
