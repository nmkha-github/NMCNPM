import {
  Box,
  Button,
  Fade,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import CreateRoomDialog from "../CreateRoomDialog/CreateRoomDialog";
import JoinRoomDialog from "../JoinRoomDialog/JoinRoomDialog";

const AddRoomButton = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openJoinRoomDialog, setOpenJoinRoomDialog] = React.useState(false);
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = React.useState(false);

  return (
    <Box>
      <Button
        id="positioned-button"
        aria-controls={openMenu ? "positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={() => setOpenMenu(true)}
      >
        <AddIcon />
        <Typography>Add</Typography>
      </Button>

      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            setOpenMenu(false);
            setOpenJoinRoomDialog(true);
          }}
        >
          Join Room
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenMenu(false);
            setOpenCreateRoomDialog(true);
          }}
        >
          Create new room
        </MenuItem>
      </Menu>

      <JoinRoomDialog
        open={openJoinRoomDialog}
        onClose={() => setOpenJoinRoomDialog(false)}
      />

      <CreateRoomDialog
        open={openCreateRoomDialog}
        onClose={() => setOpenCreateRoomDialog(false)}
      />
    </Box>
  );
};

export default AddRoomButton;
