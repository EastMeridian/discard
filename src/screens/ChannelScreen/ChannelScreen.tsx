import React, { useState } from "react";
import { useChannels } from "hooks/useChannels";
import { auth, db } from "services/firestore";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { Channel } from "models/channel";
import { User } from "models/user";
import ChatHeader from "screens/ChatScreen/components/ChatHeader";
import ResponsiveDrawer from "components/ResponsiveDrawer";
import ResponsivePopover from "components/ResponsivePopover";
import ListItemGroup from "components/ListItemChannel";
import Header from "components/Header";
import ChannelCreationScreen from "screens/ChannelCreationScreen";
import { useSelectedChannel } from "hooks/useSelectedChannel";
import { useHiddenChannel } from "hooks/useHiddenChannel";
import { useTranslation } from "react-i18next";
import {
  ContentContainer,
  FooterUsername,
  MenuContainer,
  MenuContentContainer,
  MenuFooterContainer,
  MenuHeaderContainer,
  ScreenContainer,
} from "./layouts";
import ChatScreen from "../ChatScreen";
import ChannelScreenSkeletons from "./components/ChannelScreenSkeletons";

function SignOut() {
  const { t } = useTranslation();
  return (
    auth.currentUser && (
      <Button onClick={() => auth.signOut()}>{t("login.signOut")}</Button>
    )
  );
}

const ChannelScreen = () => {
  const { t } = useTranslation();
  const { hiddenChannels, hideChannel, unhideChannel } = useHiddenChannel();
  const [{ channels, loading }, createChannel] = useChannels(auth, db);
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
    <ScreenContainer>
      <ResponsiveDrawer
        width="15rem"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <MenuContainer>
          <Header></Header>
          <MenuHeaderContainer>
            <Typography variant="h6" gutterBottom component="div">
              {t("messages")}
            </Typography>

            <Tooltip title="Create a channel" arrow>
              <IconButton aria-label="add" onClick={handleOpenPopover}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </MenuHeaderContainer>
          <MenuContentContainer>
            {loading && <ChannelScreenSkeletons />}
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
          </MenuContentContainer>
          <MenuFooterContainer>
            <Avatar
              src={auth.currentUser?.photoURL || undefined}
              sx={{ width: "1.5rem", height: "1.5rem" }}
            />
            <FooterUsername>{auth.currentUser?.displayName}</FooterUsername>
            <SignOut />
          </MenuFooterContainer>
        </MenuContainer>
      </ResponsiveDrawer>
      <ContentContainer>
        <ChatHeader
          members={selectedChannel?.members}
          onToggleDrawer={handleDrawerToggle}
        />
        {selectedChannel && <ChatScreen channel={selectedChannel} />}
      </ContentContainer>
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
    </ScreenContainer>
  );
};

export default ChannelScreen;
