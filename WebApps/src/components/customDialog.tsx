import {
  AppBar,
  Breakpoint,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, forwardRef, ReactElement, ReactNode, Ref } from "react";
import { RxCross2 } from "react-icons/rx";

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogProp {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  dialogSize?: Breakpoint;
  titleCenter?: boolean;
  title?: string | ReactNode;
  headerBackground?: string;
}

export const CustomizableDialog: FC<DialogProp> = ({
  children,
  open,
  onClose,
  titleCenter,
  title,
  headerBackground = "#7C96AB",
}) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: "8px",
        },
      }}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          padding: "1rem",
          backgroundColor: headerBackground,
        }}
        elevation={0}
      >
        <div
          style={{
            display: "flex",
            justifyContent: title ? "space-between" : "right",
            alignItems: "center",
          }}
        >
          {titleCenter && title ? (
            <div>
              <span></span>
            </div>
          ) : null}
          {title ? (
            <div>
              <span
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </span>
            </div>
          ) : null}
          <div>
            <IconButton size="small" onClick={onClose}>
              <RxCross2
                style={{
                  fill: "white",
                  color: "white",
                }}
              />
            </IconButton>
          </div>
        </div>
      </AppBar>

      <DialogContent
        sx={{
          paddingBottom: "0 !important",
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
