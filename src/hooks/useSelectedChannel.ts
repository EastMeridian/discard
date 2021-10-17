import { Channel } from "models/channel";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export const useSelectedChannel = (
  channels?: Channel[]
): [Channel | undefined, (channel: Channel) => void] => {
  const history = useHistory();
  const { channelID } = useParams<{ channelID: string }>();
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();

  const handleSelectChannel = useCallback(
    (channel: Channel) => {
      setSelectedChannel(channel);
      history.push(`/channels/${channel.id}`);
    },
    [history]
  );

  useEffect(() => {
    if (!selectedChannel && channels && channels.length > 0) {
      const found = channelID
        ? channels.find(({ id }) => id === channelID)
        : undefined;
      const nextChannel = found ?? channels[0];
      handleSelectChannel(nextChannel);
    }
  }, [selectedChannel, channels, history, channelID, handleSelectChannel]);

  return [selectedChannel, handleSelectChannel];
};
