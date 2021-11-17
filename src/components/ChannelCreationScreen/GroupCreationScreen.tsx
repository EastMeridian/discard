import Button from "@mui/material/Button";
import React, { useState } from "react";
import TextInput from "../TextInput";
import Divider from "@mui/material/Divider";
import { User } from "models/user";
import ListItemPickableUser from "./ListItemPickableUser";
import { useUserSearch } from "hooks/useUserSearch";
import { Chip, Typography } from "@mui/material";

interface Props {
  onCreateChannel: (members: User[]) => void;
  style?: React.CSSProperties;
}

const isUserSelected = (user: User, users: User[]) =>
  users.some((u) => u.uid === user.uid);

const GroupCreationScreen = ({ onCreateChannel, style }: Props) => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <div style={{ padding: "1rem" }}>
        <Typography variant="h6" component="div">
          Select one user
        </Typography>
      </div>
      {selectedUsers.length > 0 && (
        <div style={{ padding: "1rem" }}>
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
        </div>
      )}
      <div style={{ padding: "1rem", display: "flex" }}>
        <TextInput value={value} onChange={onSearch} placeholder="Search" />
      </div>
      <Divider />
      <div
        style={{
          overflowY: "scroll",
          height: "10rem",
          padding: "0.5rem 0",
        }}
      >
        {users.map((user) => (
          <ListItemPickableUser
            user={user}
            key={user.uid}
            selected={isUserSelected(user, selectedUsers)}
            onClick={handleSelectUser}
          />
        ))}
      </div>
      <Divider />
      <div
        style={{ padding: "1rem", display: "flex", flexDirection: "column" }}
      >
        <Button
          sx={{ marginTop: "1rem" }}
          disabled={disabled}
          onClick={() => onCreateChannel(selectedUsers)}
          variant="contained"
        >
          Create Channel
        </Button>
      </div>
    </div>
  );
};

export default GroupCreationScreen;
