import { Channel } from "models/channel";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useSelectedChannel = (
  channels?: Channel[]
): [Channel | undefined, (channel?: Channel) => void] => {
  const navigate = useNavigate();
  const { channelID } = useParams<{ channelID: string }>();
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();

  const handleSelectChannel = useCallback(
    (channel?: Channel) => {
      const nextChannel = channel ?? channels?.[0];
      if (nextChannel) {
        setSelectedChannel(nextChannel);
        navigate(`/channels/${nextChannel.id}`);
      }
    },
    [navigate, channels]
  );

  useEffect(() => {
    if (!selectedChannel && channels && channels.length > 0) {
      const found = channelID
        ? channels.find(({ id }) => id === channelID)
        : undefined;
      const nextChannel = found ?? channels[0];
      handleSelectChannel(nextChannel);
    }
  }, [selectedChannel, channels, channelID, handleSelectChannel]);

  return [selectedChannel, handleSelectChannel];
};
