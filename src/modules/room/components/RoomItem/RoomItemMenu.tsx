import React from "react";
import { Box } from "@mui/material";
import { MenuItem } from '@mui/material';
import { useState } from "react";
import { BiLogIn, BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import Menu from '@mui/material/Menu';
import RoomData from "../../../room/interface/room-data";
import RoomItem from "./RoomItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useRooms } from "../../../../lib/provider/RoomsProvider";
const ITEM_HEIGHT = 48;
  
const RoomItemMenu = ({roomData}: {roomData: RoomData}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {deleteRoom} = useRooms();
    const deletingRoom = useRooms();
    let navigate = useNavigate();
    return (
      <Box>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget)}}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={()=>{setAnchorEl(null);}}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
            <MenuItem onClick={()=>{navigate("/room/" + roomData.id + "/newsfeed")}}>
                <ListItemIcon>  <BiLogIn fontSize="large" />   </ListItemIcon>
                <Typography variant="inherit">Vào phòng</Typography>
            </MenuItem>
        
            <MenuItem onClick={()=>{navigate("/room/" + roomData.id + "/setting-room")}}>
                <ListItemIcon>  <BiEdit fontSize="large" />    </ListItemIcon>
                <Typography variant="inherit">Chỉnh sửa</Typography>
            </MenuItem>
            
            {deletingRoom
              ? <CircularProgress/>
              : <MenuItem onClick={async () => await deleteRoom({id: roomData.id})}>
                  <ListItemIcon>  <BiTrash fontSize="large" />   </ListItemIcon>
                  <Typography variant="inherit" noWrap>Xóa phòng</Typography>
              </MenuItem> 
            }
        </Menu>
      </Box>
    );
}

export default RoomItemMenu;
