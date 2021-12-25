import { Message } from "models/message";
import React, { createContext, Dispatch, useContext, useReducer } from "react";

const START_DATE = new Date(0);

export const messagesInitialeState = {};

type ReducerState = Partial<
  Record<
    string,
    {
      loading?: boolean;
      topReached?: boolean;
      lastMessageTime?: Date;
      messages?: Message[];
    }
  >
>;

type AddMessagesAction = {
  type: "ADD_MESSAGES";
  value: { channelID: string; messages: Message[] };
};

type NextMessagesAction = {
  type: "NEXT_MESSAGES";
  value: { channelID: string; messages: Message[] };
};

type SetTopReachedAction = {
  type: "SET_TOP_REACHED";
  value: { channelID: string };
};

type SetLoadingAction = {
  type: "SET_LOADING";
  value: { channelID: string; loading: boolean };
};

type ReducerAction =
  | AddMessagesAction
  | NextMessagesAction
  | SetTopReachedAction
  | SetLoadingAction;

const MessagesContext = createContext<{
  value: ReducerState;
  dispatch: Dispatch<ReducerAction>;
}>({
  value: messagesInitialeState,
  dispatch: () => {},
});

const getLastMessageTime = (messages: Message[], currentTime?: Date) => {
  if (messages.length === 0) return currentTime;
  return messages[messages.length - 1].createdAt.toDate();
};

const messagesReducer = (state: ReducerState, action: ReducerAction) => {
  const channel = state[action.value.channelID];
  console.log("[messageReducer] next action", action.type);
  switch (action.type) {
    case "ADD_MESSAGES": {
      const { messages } = action.value;
      const lastMessageTime = getLastMessageTime(
        messages,
        channel?.lastMessageTime || START_DATE
      );

      return {
        ...state,
        [action.value.channelID]: {
          loading: false,
          lastMessageTime,
          topReached: messages.length < 25,
          messages: [...(channel?.messages || []), ...messages],
        },
      };
    }
    case "NEXT_MESSAGES": {
      const { messages } = action.value;
      return {
        ...state,
        [action.value.channelID]: {
          ...channel,
          loading: false,
          topReached: messages.length < 25,
          messages: [...messages, ...(channel?.messages || [])],
        },
      };
    }
    case "SET_TOP_REACHED": {
      return {
        ...state,
        [action.value.channelID]: {
          ...channel,
          topReached: true,
          loading: false,
        },
      };
    }
    case "SET_LOADING": {
      const { loading } = action.value;
      return {
        ...state,
        [action.value.channelID]: {
          ...channel,
          loading,
        },
      };
    }
    default:
      return state;
  }
};

export const useMessageStore = (channelID: string) => {
  const { value, dispatch } = useContext(MessagesContext);
  console.log("useMessageStore", channelID, value);

  const addMessages = (messages: Message[]) => {
    dispatch({ type: "ADD_MESSAGES", value: { channelID, messages } });
  };

  const addNextMessages = (messages: Message[]) => {
    dispatch({ type: "NEXT_MESSAGES", value: { channelID, messages } });
  };

  const setTopReached = () => {
    dispatch({
      type: "SET_TOP_REACHED",
      value: { channelID },
    });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", value: { channelID, loading } });
  };

  const channel = value[channelID];

  return {
    messages: channel?.messages || [],
    lastMessageTime: channel?.lastMessageTime || START_DATE,
    loading: channel?.loading !== undefined ? channel.loading : true,
    topReached: channel?.topReached,
    addMessages,
    addNextMessages,
    setTopReached,
    setLoading,
  };
};

interface MessageContextProviderProps {
  children: React.ReactNode;
}
const MessagesContextProvider = ({ children }: MessageContextProviderProps) => {
  const [value, dispatch] = useReducer(messagesReducer, messagesInitialeState);

  return (
    <MessagesContext.Provider value={{ value, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
