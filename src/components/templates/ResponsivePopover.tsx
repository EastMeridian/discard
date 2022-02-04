import { SwipeableDrawer } from "@mui/material";
import Popover, { PopoverProps } from "@mui/material/Popover";

export interface ResponsivePopoverProps
  extends Pick<
    PopoverProps,
    "id" | "open" | "anchorEl" | "children" | "anchorOrigin" | "transformOrigin"
  > {
  onClose: () => void;
  onOpen: React.ReactEventHandler;
}

const ResponsivePopover = ({
  id,
  open,
  anchorEl,
  onClose,
  onOpen,
  children,
  anchorOrigin,
  transformOrigin,
}: ResponsivePopoverProps) => (
  <>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      sx={{
        display: { xs: "none", sm: "flex" },
      }}
    >
      {children}
    </Popover>
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        display: { xs: "flex", sm: "none" },
      }}
    >
      {children}
    </SwipeableDrawer>
  </>
);

export default ResponsivePopover;
