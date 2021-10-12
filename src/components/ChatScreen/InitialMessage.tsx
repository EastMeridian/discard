import { getAuth } from "@firebase/auth";
import { Typography } from "@mui/material";
import AvatarMembersGroup from "components/AvatarMembersGroup";
import { User } from "models/user";
import styled from "styled-components";
import { classifyMembers } from "utils/members";

interface Props {
  members: User[];
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const auth = getAuth();

const InitialMessage = ({ members }: Props) => {
  const { others } = classifyMembers(members, auth.currentUser);
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <AvatarMembersGroup
          members={members}
          style={{ width: 64, height: 64 }}
        />
      </div>
      <Typography variant="h5" sx={{ marginTop: "1rem" }}>
        {others.map(({ displayName }) => displayName).join(", ")}
      </Typography>
      <div>
        Ceci est le tout début de votre historique des messages directs avec{" "}
        {others.map(({ displayName }) => displayName).join(", ")}
      </div>
    </Container>
  );
};
export default InitialMessage;
