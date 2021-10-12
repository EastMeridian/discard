import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "components/Header";
import { User } from "models/user";
import { classifyMembers } from "utils/members";
import AvatarMembersGroup from "components/AvatarMembersGroup";

const auth = getAuth();

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

interface Props {
  members: User[];
}

const ChatHeader = ({ members }: Props) => {
  const { firstMember, others } = classifyMembers(members, auth.currentUser);

  return (
    <Header>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AvatarMembersGroup members={members} />
        <div style={{ marginLeft: "0.5rem" }}>
          {others.map(({ displayName }) => displayName).join(", ")}
        </div>
      </div>
    </Header>
  );
};

export default ChatHeader;
