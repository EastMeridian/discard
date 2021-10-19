import { Message } from "models/message";
import React, { createContext, Dispatch, useContext, useReducer } from "react";

export const messagesInitialeState = {
  channels: {},
  loading: true,
};

type ReducerState = {
  loading: boolean;
  channels: Partial<Record<string, Message[]>>;
};

type AddMessageAction = {
  type: "ADD_MESSAGE";
  value: { channelID: string; messages: Message[] };
};

type SetLoadingAction = {
  type: "SET_LOADING";
  value: boolean;
};

type ReducerAction = AddMessageAction | SetLoadingAction;

const MessagesContext = createContext<{
  value: ReducerState;
  dispatch: Dispatch<ReducerAction>;
}>({
  value: messagesInitialeState,
  dispatch: () => {},
});

const messagesReducer = () => (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        loading: false,
        channels: {
          ...state.channels,
          [action.value.channelID]: action.value.messages,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.value,
      };
    default:
      return state;
  }
};

export const useMessageStore = (channelID: string) => {
  const { value, dispatch } = useContext(MessagesContext);
  const { channels, loading } = value;
  /* console.log("useMessageStore", channelID, channels); */
  const addMessages = (messages: Message[]) => {
    dispatch({ type: "ADD_MESSAGE", value: { channelID, messages } });
  };

  const setLoading = (loading = true) => {
    dispatch({ type: "SET_LOADING", value: loading });
  };
  return {
    messages: channels[channelID] || [],
    loading,
    addMessages,
    setLoading,
  };
};

interface MessageContextProviderProps {
  children: React.ReactNode;
}
const MessagesContextProvider = ({ children }: MessageContextProviderProps) => {
  const [value, dispatch] = useReducer(
    messagesReducer(),
    messagesInitialeState
  );

  return (
    <MessagesContext.Provider value={{ value, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
