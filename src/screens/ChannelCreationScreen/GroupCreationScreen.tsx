import Button from "@mui/material/Button";
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import Divider from "@mui/material/Divider";
import { User } from "models/user";
import ListItemPickableUser from "./components/ListItemPickableUser";
import { useUserSearch } from "hooks/useUserSearch";
import { Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ScreenContainer, ScrollView, SectionContainer } from "./layouts";

interface Props {
  onCreateChannel: (members: User[]) => void;
  style?: React.CSSProperties;
}

const isUserSelected = (user: User, users: User[]) =>
  users.some((u) => u.uid === user.uid);

const GroupCreationScreen = ({ onCreateChannel, style }: Props) => {
  const { t } = useTranslation();
  const [selectedUsers, setSelectedusers] = useState<User[]>([]);
  const [{ users, value }, onSearch] = useUserSearch();

  const handleRemoveUser = (user: User) => {
    const nextArray = selectedUsers.filter((u) => u.uid !== user.uid);
    setSelectedusers(nextArray);
  };

  const handleSelectUser = (user: User) => {
    if (isUserSelected(user, selectedUsers)) {
      return handleRemoveUser(user);
    }
    setSelectedusers([user]);
  };

  const disabled = selectedUsers.length === 0;

  return (
    <ScreenContainer style={style}>
      <SectionContainer>
        <Typography variant="h6" component="div">
          {t("channel.select")}
        </Typography>
      </SectionContainer>
      {selectedUsers.length > 0 && (
        <SectionContainer>
          {selectedUsers.map((user) => (
            <Chip
              label={user.displayName}
              key={user.uid}
              variant="outlined"
              onClick={() => handleRemoveUser(user)}
              onDelete={() => handleRemoveUser(user)}
              sx={{ margin: "0.1rem" }}
            />
          ))}
        </SectionContainer>
      )}
      <SectionContainer>
        <TextInput value={value} onChange={onSearch} placeholder="Search" />
      </SectionContainer>
      <Divider />
      <ScrollView>
        {users.map((user) => (
          <ListItemPickableUser
            user={user}
            key={user.uid}
            selected={isUserSelected(user, selectedUsers)}
            onClick={handleSelectUser}
          />
        ))}
      </ScrollView>
      <Divider />
      <SectionContainer style={{ flexDirection: "column" }}>
        <Button
          sx={{ marginTop: "1rem" }}
          disabled={disabled}
          onClick={() => onCreateChannel(selectedUsers)}
          variant="contained"
        >
          {t("channel.create")}
        </Button>
      </SectionContainer>
    </ScreenContainer>
  );
};

export default GroupCreationScreen;
