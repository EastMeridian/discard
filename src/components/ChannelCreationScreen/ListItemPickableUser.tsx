import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import { User } from "models/user";
import styled from "styled-components";

interface Props {
  user: User;
  onClick: (user: User) => void;
  selected?: boolean;
}

const ListItemPickableUserLayout = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  &:hover {
    background-color: #fafafa;
  }
  cursor: pointer;
  justify-content: space-between;
`;

const ListItemPickableUser = ({ user, onClick, selected }: Props) => {
  const { photoURL, displayName } = user;
  return (
    <ListItemPickableUserLayout onClick={() => onClick(user)}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={photoURL || undefined} sx={{ width: 24, height: 24 }} />
        <div style={{ marginLeft: "0.5rem" }}>{displayName}</div>
      </div>
      <Checkbox checked={selected} />
    </ListItemPickableUserLayout>
  );
};

export default ListItemPickableUser;
