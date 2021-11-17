import { Message } from "models/message";
import React, { createContext, Dispatch, useContext, useReducer } from "react";

const START_DATE = new Date(0);

export const messagesInitialeState = {};

type ReducerState = Partial<
  Record<
    string,
    { loading?: boolean; lastMessageTime?: Date; messages: Message[] }
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

type ModifyMessagesAction = {
  type: "MODIFY_MESSAGES";
  value: { channelID: string; messages: Message[] };
};

type InitializeAction = {
  type: "INITIALIZE";
  value: { channelID: string };
};

type ReducerAction =
  | AddMessagesAction
  | InitializeAction
  | ModifyMessagesAction
  | NextMessagesAction;

const MessagesContext = createContext<{
  value: ReducerState;
  dispatch: Dispatch<ReducerAction>;
}>({
  value: messagesInitialeState,
  dispatch: () => {},
});

const getLastMessageTime = (messages: Message[], currentTime?: Date) => {
  if (messages.length === 0) return currentTime || START_DATE;
  return messages[messages.length - 1].createdAt.toDate();
};

const messagesReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case "ADD_MESSAGES": {
      const { messages } = action.value;
      const channel = state[action.value.channelID];
      const lastMessageTime = getLastMessageTime(
        messages,
        channel?.lastMessageTime
      );

      return {
        ...state,
        [action.value.channelID]: {
          loading: false,
          lastMessageTime,
          messages: [...(channel?.messages || []), ...messages],
        },
      };
    }
    case "NEXT_MESSAGES": {
      const { messages } = action.value;
      const channel = state[action.value.channelID];
      return {
        ...state,
        [action.value.channelID]: {
          ...channel,
          messages: [...messages, ...(channel?.messages || [])],
        },
      };
    }
    case "MODIFY_MESSAGES": {
      return state;
    }
    default:
      return state;
  }
};

export const useMessageStore = (channelID: string) => {
  const { value, dispatch } = useContext(MessagesContext);
  console.log("useMessageStore", channelID, value);

  const addMessages = (messages: Message[]) => {
    console.log("ADDMESSAGE TO", channelID);
    dispatch({ type: "ADD_MESSAGES", value: { channelID, messages } });
  };

  const modifyMessages = (messages: Message[]) => {
    dispatch({ type: "MODIFY_MESSAGES", value: { channelID, messages } });
  };

  const addNextMessages = (messages: Message[]) => {
    dispatch({ type: "NEXT_MESSAGES", value: { channelID, messages } });
  };
  const channel = value[channelID];
  console.log(
    "gonna show this messages",
    channel?.loading,
    channel?.messages,
    channel?.lastMessageTime
  );
  return {
    messages: channel?.messages || [],
    lastMessageTime: channel?.lastMessageTime || START_DATE,
    loading: channel?.loading !== undefined ? channel.loading : true,
    addMessages,
    modifyMessages,
    addNextMessages,
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
