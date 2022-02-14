import { SwipeableDrawer } from "@mui/material";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { isMobile } from "react-device-detect";

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
    {!isMobile && (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        sx={{
          display: "flex",
        }}
      >
        {children}
      </Popover>
    )}
    {isMobile && (
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        sx={{
          display: "flex",
        }}
      >
        {children}
      </SwipeableDrawer>
    )}
  </>
);

export default ResponsivePopover;
