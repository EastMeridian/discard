import ChatScreen from "components/ChatScreen";
import { Channel } from "models/channel";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";

interface Props {
  channel?: Channel;
  channels?: Channel[];
}

const ChatSwitch = ({ channel, channels }: Props) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {channel && (
        <Route
          exact
          path={path}
          render={() => {
            return <Redirect to={`${path}/${channel.id}`} />;
          }}
        />
      )}
      {/*  <Route path={`${path}/:channelID`}>
        <ChatScreen channel={channel} />
      </Route> */}
      {channels?.map((c) => (
        <Route path={`${path}/:channelID`}>
          <ChatScreen channel={channel} key={c.id} />
        </Route>
      ))}
    </Switch>
  );
};

export default ChatSwitch;
