import { useState } from "react";
import { useChannels } from "hooks/useChannels";
import { auth, db } from "services/firestore";
import { Channel } from "models/channel";
import { User } from "models/user";
import ChatHeader from "components/organims/ChatView/components/ChatHeader";
import ResponsiveDrawer from "components/templates/ResponsiveDrawer";
import ListItemChannel from "components/molecules/ListItemChannel";
import Header from "components/atoms/Header";
import { useSelectedChannel } from "hooks/useSelectedChannel";
import { useHiddenChannel } from "hooks/useHiddenChannel";
import { useTranslation } from "react-i18next";
import {
  ContentContainer,
  MenuContentContainer,
  ScreenContainer,
} from "./layouts";
import ChatView from "components/organims/ChatView";
import ChannelSkeletons from "./components/ChannelsSkeletons";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuHeader from "./components/MenuHeader";
import MenuFooter from "./components/MenuFooter";
import { MenuContainer } from "./components/MenuContainer";
import DiscardLogo from "components/atoms/DiscardLogo";

const ChannelScreen = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();
  const { hiddenChannels, hideChannel, unhideChannel } = useHiddenChannel();
  const [{ channels, loading }, createChannel] = useChannels(auth, db);
  const [selectedChannel, setSelectedChannel] = useSelectedChannel(channels);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCreateChannel = async (members: User[]) => {
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
    hideChannel(id);
    setSelectedChannel();
  };

  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    handleDrawerToggle();
  };

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
          <Header style={{ justifyContent: "flex-start" }}>
            <DiscardLogo />
          </Header>
          <MenuHeader onCreateChannel={handleCreateChannel} />
          <MenuContentContainer>
            {loading && <ChannelSkeletons />}
            {!loading &&
              filteredChannels?.map((channel) => {
                const { id, members } = channel;
                return (
                  <ListItemChannel
                    members={members}
                    key={id}
                    selected={selectedChannel?.id === id}
                    onClick={() => handleSelectChannel(channel)}
                    onDelete={() => handleHideChannel(id)}
                    user={user}
                  />
                );
              })}
          </MenuContentContainer>
          <MenuFooter />
        </MenuContainer>
      </ResponsiveDrawer>
      <ContentContainer>
        <ChatHeader
          members={selectedChannel?.members}
          onToggleDrawer={handleDrawerToggle}
        />
        {selectedChannel && <ChatView channel={selectedChannel} />}
      </ContentContainer>
    </ScreenContainer>
  );
};

export default ChannelScreen;
