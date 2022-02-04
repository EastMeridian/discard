import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { FooterUsername, MenuFooterContainer } from "../layouts";
import { auth } from "services/firestore";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ResponsivePopover from "components/templates/ResponsivePopover";
import ThemeModeSwitch from "components/atoms/ThemeModeSwitch";
import { useThemeMode } from "contexts/ThemeContext";

function SignOut() {
  const { t } = useTranslation();
  return (
    auth.currentUser && (
      <ListItemButton onClick={() => auth.signOut()}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={t("login.signOut")} />
      </ListItemButton>
    )
  );
}

const MenuFooter = () => {
  const { themeMode, setThemeMode } = useThemeMode();
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
      <MenuFooterContainer>
        <Avatar
          src={auth.currentUser?.photoURL || undefined}
          sx={{ width: "1.5rem", height: "1.5rem" }}
        />
        <FooterUsername>{auth.currentUser?.displayName}</FooterUsername>
        <Tooltip title="User settings" arrow>
          <IconButton aria-label="settings" onClick={handleOpenPopover}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </MenuFooterContainer>
      <ResponsivePopover
        id={popoverOpen ? "settings-popover" : undefined}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        onOpen={handleOpenPopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "20rem", maxWidth: "100%" }}>
          <List>
            <ListItem>
              <ListItemText primary="Mode" />
              <div style={{ position: "relative" }}>
                <ThemeModeSwitch
                  checked={themeMode === "light"}
                  onChange={() =>
                    setThemeMode(themeMode === "light" ? "dark" : "light")
                  }
                />
              </div>
            </ListItem>
            <ListItem disablePadding>
              <SignOut />
            </ListItem>
          </List>
        </Box>
      </ResponsivePopover>
    </>
  );
};

export default MenuFooter;
