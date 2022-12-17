/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, IconButton, Typography, ListItemIcon, Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { BiLogIn, BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import RoomData from "../../../room/interface/room-data";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
const ITEM_HEIGHT = 48;

const RoomItemMenu = ({ roomData }: { roomData: RoomData }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { deleteRoom, deletingRoom } = useRooms();
  let navigate = useNavigate();
  return (
    <Box>
      <IconButton
        type="button"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        style={{
          color: "black",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <MenuItem
          style={{ display: "flex", padding: 8 }}
          onClick={() => {
            navigate("/room/" + roomData.id + "/newsfeed");
          }}
        >
          <ListItemIcon>
            <BiLogIn fontSize="large" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap width="12ch">
            Vào phòng
          </Typography>
        </MenuItem>

        <MenuItem
          style={{ display: "flex", padding: 8 }}
          onClick={() => {
            navigate("/room/" + roomData.id + "/setting-room");
          }}
        >
          <ListItemIcon>
            <BiEdit fontSize="large" />{" "}
          </ListItemIcon>
          <Typography variant="inherit" noWrap width="12ch">
            Chỉnh sửa
          </Typography>
        </MenuItem>

        {deletingRoom ? (
          <CircularProgress />
        ) : (
          <MenuItem
            style={{ display: "flex", padding: 8 }}
            onClick={async () => await deleteRoom({ id: roomData.id })}
          >
            <ListItemIcon>
              {" "}
              <BiTrash fontSize="large" />{" "}
            </ListItemIcon>
            <Typography variant="inherit" noWrap width="12ch">
              Xóa phòng
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default RoomItemMenu;
