import { Typography } from "@mui/material";
import AvatarMembersGroup from "components/molecules/AvatarMembersGroup";
import { User } from "models/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firestore";
import { styled } from "@mui/material";
import { classifyMembers } from "utils/members";
import { useTranslation } from "react-i18next";

interface Props {
  members: User[];
}

const Container = styled("div")(({ theme }) => ({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  color: theme.colors.text.main,
}));

const InitialMessage = ({ members }: Props) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const classified = classifyMembers(members, user);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <AvatarMembersGroup
          members={classified.members}
          style={{ width: 64, height: 64 }}
        />
      </div>
      <Typography variant="h5" sx={{ marginTop: "1rem" }}>
        {classified.others.map(({ displayName }) => displayName).join(", ")}
      </Typography>
      <div>
        {t("initialMessage")}{" "}
        {classified.others.map(({ displayName }) => displayName).join(", ")}
      </div>
    </Container>
  );
};
export default InitialMessage;
