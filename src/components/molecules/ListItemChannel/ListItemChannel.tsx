import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "models/user";
import React, { useState } from "react";
import { classifyMembers } from "utils/members";
import styled from "styled-components";

interface Props {
  members: User[];
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDelete?: () => void;
  user: User;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 0.5rem;
  min-width: 0;
  height: 3rem;
`;

const TextContainer = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.5rem;
`;

const CloseButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
`;

const ListItemChannel = ({
  members,
  selected,
  onClick,
  onDelete,
  user,
}: Props) => {
  const [hovered, setHovered] = useState(false);

  const classified = classifyMembers(members, user);

  return (
    <ListItemButton
      sx={{
        borderRadius: "6px",
        padding: 0,
        backgroundColor: selected ? "#d3d7db" : "transparent",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Container>
        {members.length < 3 && (
          <Avatar
            src={classified.members[0]?.photoURL || undefined}
            sx={{ width: "2rem", height: "2rem" }}
          />
        )}
        {members.length > 2 && (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={classified.others.length}
            color="primary"
          >
            <Avatar
              src={classified.members[0]?.photoURL || undefined}
              sx={{ width: 30, height: 30 }}
            />
          </Badge>
        )}
        <TextContainer>
          {classified.others.map(({ displayName }) => displayName).join(", ")}
        </TextContainer>
        {hovered && (
          <CloseButton
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete?.();
            }}
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <CloseIcon fontSize={"small"} />
          </CloseButton>
        )}
      </Container>
    </ListItemButton>
  );
};
export default ListItemChannel;
