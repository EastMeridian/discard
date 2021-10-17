import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "models/user";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firestore";
import { classifyMembers } from "utils/members";

interface Props {
  members: User[];
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDelete?: () => void;
}

const ListItemGroup = ({ members, selected, onClick, onDelete }: Props) => {
  const [user] = useAuthState(auth);
  const [hovered, setHovered] = useState(false);

  const { firstMember, others } = classifyMembers(members, user);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          padding: " 0 0.5rem",
          minWidth: 0,
          height: "3rem",
        }}
      >
        {members.length < 3 && (
          <Avatar
            src={firstMember?.photoURL || undefined}
            sx={{ width: "2rem", height: "2rem" }}
          />
        )}
        {members.length > 2 && (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={others.length}
            color="primary"
          >
            <Avatar
              src={firstMember?.photoURL || undefined}
              sx={{ width: 30, height: 30 }}
            />
          </Badge>
        )}
        <div
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginLeft: "0.5rem",
          }}
        >
          {others.map(({ displayName }) => displayName).join(", ")}
        </div>
        {hovered && (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "0.5rem",
            }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete?.();
            }}
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <CloseIcon fontSize={"small"} />
          </div>
        )}
      </div>
    </ListItemButton>
  );
};
export default ListItemGroup;
