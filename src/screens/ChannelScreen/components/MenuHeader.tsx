import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import ChannelCreationView from "components/organims/ChannelCreationView";
import ResponsivePopover from "components/templates/ResponsivePopover";
import { User } from "models/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuHeaderContainer } from "../layouts";

interface MenuHeaderProps {
  onCreateChannel: (members: User[]) => void;
}

const MenuHeader = ({ onCreateChannel }: MenuHeaderProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <>
      <MenuHeaderContainer>
        <Typography variant="h6" gutterBottom component="div">
          {t("messages")}
        </Typography>

        <Tooltip title="Create a channel" arrow>
          <IconButton aria-label="add" onClick={handleOpenPopover}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </MenuHeaderContainer>
      <ResponsivePopover
        id={popoverOpen ? "channel-popover" : undefined}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        onOpen={handleOpenPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <ChannelCreationView
          onCreateChannel={(members) => {
            handleClosePopover();
            onCreateChannel(members);
          }}
          style={{ width: "30rem", maxWidth: "100%" }}
        />
      </ResponsivePopover>
    </>
  );
};

export default MenuHeader;
