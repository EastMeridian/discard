import Drawer, { DrawerProps } from "@mui/material/Drawer";
import Box from "@mui/material/Box";

export interface ResponsiveDrawerProps extends DrawerProps {
  width?: React.CSSProperties["width"];
}

const ResponsiveDrawer = ({
  open,
  onClose,
  children,
  width,
}: ResponsiveDrawerProps) => {
  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "flex", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width },
        }}
      >
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "flex" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width },
        }}
        open
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default ResponsiveDrawer;
