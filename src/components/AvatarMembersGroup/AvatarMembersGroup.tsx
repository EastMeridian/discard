import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import "./AvatarGroup.css";
import { User } from "models/user";

interface Props {
  members: User[];
  style?: React.CSSProperties;
  max?: number;
}

const AvatarMembersGroup = ({ members, style, max = 3 }: Props) => (
  <AvatarGroup max={max} className="avatar-group">
    {members.map((member) => (
      <Avatar
        src={member?.photoURL || undefined}
        key={member.uid}
        style={style}
        alt={member.displayName || "user"}
      />
    ))}
  </AvatarGroup>
);

export default AvatarMembersGroup;
