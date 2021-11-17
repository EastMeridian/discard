import { useLocalStorage } from "./useLocalStorage";

type HiddenChannelStore = Partial<Record<string, boolean>>;

export const useHiddenChannel = (): {
  hiddenChannels: HiddenChannelStore;
  hideChannel: (id: string) => void;
  unhideChannel: (id: string) => void;
} => {
  const [hiddenChannels, setHiddenChannels] =
    useLocalStorage<HiddenChannelStore>("hiddenChannels", {});

  const hideChannel = (id: string) => {
    setHiddenChannels((prevChannels) => {
      const nextChannel = { ...prevChannels };
      if (nextChannel[id] === true) {
        delete nextChannel[id];
      }
      nextChannel[id] = true;
      return nextChannel;
    });
  };

  const unhideChannel = (id: string) => {
    setHiddenChannels((prevChannels) => {
      const nextChannel = { ...prevChannels };
      if (nextChannel[id] === true) {
        delete nextChannel[id];
      }
      return nextChannel;
    });
  };
  return { hiddenChannels, hideChannel, unhideChannel };
};
