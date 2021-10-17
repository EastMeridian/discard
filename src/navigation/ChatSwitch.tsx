import ChatScreen from "screens/ChatScreen";
import { Channel } from "models/channel";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";

interface Props {
  selected?: Channel;
  channels?: Channel[];
}

const ChatSwitch = ({ selected, channels }: Props) => {
  const { path, ...rest } = useRouteMatch();
  console.log(path, rest, selected);
  return (
    <Switch>
      {selected && (
        <Route
          exact
          path={path}
          render={() => {
            return <Redirect to={`${path}/${selected.id}`} />;
          }}
        />
      )}
      <Route path={`${path}/:channelID`}>
        <ChatScreen channel={selected} />
      </Route>
      {/* {channels?.map((channel) => (
        <Route path={`${path}/:${channel.id}`} key={channel.id}>
          <ChatScreen channel={channel} />
        </Route>
      ))} */}
    </Switch>
  );
};

export default ChatSwitch;
