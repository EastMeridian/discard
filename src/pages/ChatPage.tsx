import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import AddIcon from "@mui/icons-material/Add";
import GroupCreationScreen from "components/ChannelCreationScreen";
import React, { useEffect, useState } from "react";
import { useChannels } from "hooks/useChannels";
import { auth, db } from "services/firestore";
import ListItemGroup from "components/ListItemChannel";
import Popover from "@mui/material/Popover";
import { User } from "models/user";
import { useHistory, useRouteMatch } from "react-router";
import Header from "components/Header";
import { debounce } from "lodash";
import { deleteChannel } from "services/api/channels";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import ChatSwitch from "navigation/ChatSwitch";
import { Channel } from "models/channel";
import ChatHeader from "components/ChatScreen/ChatHeader";
import ResponsiveDrawer from "components/ResponsiveDrawer";

const debounceDeleteChannel = debounce(
  (id) => {
    deleteChannel(id);
  },
  1000,
  { leading: true }
);

function SignOut() {
  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign Out</Button>
  );
}

const ChatPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();
  const [{ channels, loading, error }, createGroup] = useChannels({ auth, db });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!selectedChannel && channels && channels.length > 0) {
      setSelectedChannel(channels[0]);
    }
  }, [selectedChannel, channels]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGroup = (members: User[]) => {
    handleClose();
    createGroup(members);
  };

  const handleDeleteChannel = (id: string) => {
    console.log("handleDeleteChannel");
    debounceDeleteChannel(id);
  };

  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    history.push(`${url}/${channel.id}`);
    console.log("handleSelectChannel");
  };

  const popoverOpen = Boolean(anchorEl);

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
              <IconButton aria-label="add" onClick={handleClick}>
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
              channels?.map((channel) => {
                const { id, members } = channel;
                return (
                  <ListItemGroup
                    members={members}
                    key={id}
                    selected={selectedChannel?.id === id}
                    onClick={() => handleSelectChannel(channel)}
                    onDelete={() => handleDeleteChannel(id)}
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
        <ChatSwitch selected={selectedChannel} channels={channels} />
      </div>
      <Popover
        id={popoverOpen ? "channel-popover" : undefined}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <GroupCreationScreen
          onCreateChannel={handleCreateGroup}
          style={{ width: "30rem" }}
        />
      </Popover>
    </div>
  );
};

export default ChatPage;
