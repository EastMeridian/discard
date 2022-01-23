import Header from "components/atoms/Header";
import { User } from "models/user";
import { classifyMembers } from "utils/members";
import AvatarMembersGroup from "components/molecules/AvatarMembersGroup";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firestore";
interface Props {
  members?: User[];
  onToggleDrawer?: () => void;
}

const ChatHeader = ({ members = [], onToggleDrawer }: Props) => {
  const [user] = useAuthState(auth);
  const { others } = classifyMembers(members, user);

  return (
    <Header>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleDrawer}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <AvatarMembersGroup members={others} />
        <div style={{ marginLeft: "0.5rem" }}>
          {others.map(({ displayName }) => displayName).join(", ")}
        </div>
      </div>
    </Header>
  );
};

export default ChatHeader;
