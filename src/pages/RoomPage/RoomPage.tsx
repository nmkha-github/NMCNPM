/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState, useEffect } from "react";

import {
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  InputBase,
  Paper,
  TextField,
  Divider,
  IconButton, 
  CircularProgress,
  Grid } from "@mui/material";

import { 
  BiSearchAlt2, 
  BiFilterAlt, 
  BiLogIn } from "react-icons/bi";

import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import CreateRoomDialog from "../../modules/room/components/CreateRoomDialog/CreateRoomDialog";
import RoomData from "../../modules/room/interface/room-data";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../../lib/provider/RoomsProvider"
import RoomItem from "../../modules/room/components/RoomItem/RoomItem";
const ITEM_HEIGHT = 48;


const RoomPage = () => {
  const {rooms, getRooms, loadingRooms, loadingMoreRooms, loadedAllRooms} = useRooms()
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showRooms, setShowRooms] = useState<RoomData[]>([]);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();
  useEffect(() => { getRooms({});}, []);
  useEffect(() => {setShowRooms(rooms); }, [rooms])
  return (
    <Box>
      <Box 
      width="100%"
      height="30px">
      </Box>
      
      <Paper
        component="form"
        sx={{ 
          p: '2px 4px', 
          display: 'flex', 
          alignItems: 'center', 
          width: '98%', 
          justifyContent: 'center', 
          border: '1px solid', 
          m: '1%' }}
      >
        <Button
          onClick={() => { setOpenCreateRoomDialog(true); }}
          sx ={{
            backgroundColor: '#82dcff',
            color: 'black',
            fontWeight: 'bold',
            width: "7%",
            fontSize: "17px" }} > + CREAT </Button>

        <CreateRoomDialog
          open={openCreateRoomDialog}
          onClose={() => setOpenCreateRoomDialog(false)}
        />

        <TextField
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search ..."
          inputProps={{ 'aria-label': 'Search ...' }}
          onChange={(event)=>{
            //setShowRooms(showRooms)
            setShowRooms(showRooms.filter((room: { name: string | string[]; })=> room.name.includes(event.target.value)))
          }}
          InputProps= {{
            endAdornment :(
              <SearchIcon/>
            )
          }

          }
        />
      
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
        <Box>
          <IconButton 
            type="button" 
            id ="filter-button"
            sx={{ p: '10px' , fontSize: "xx-large"}} 
            aria-label="filter"
            aria-controls={open ? 'FilterMenu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget)}}>
              <BiFilterAlt></BiFilterAlt>
          </IconButton>

          <Menu
            id="FilterMenu"
            MenuListProps={{'aria-labelledby': 'filter-button'}}
            anchorEl={anchorEl}
            open={open}
            onClose={()=>{setAnchorEl(null);}}
            PaperProps={{ style: {maxHeight: ITEM_HEIGHT * 4.5, width: '8ch' }}}>
            
            <MenuItem onClick={()=>{navigate("/room/")}} >
              <ImSortAlphaAsc fontSize="xx-large" color="#1a6eff"></ImSortAlphaAsc>  
            </MenuItem>

            <MenuItem onClick={()=>{navigate("/room/")}} >
              <ImSortAlphaDesc fontSize="xx-large" color="#1a6eff"></ImSortAlphaDesc>  
            </MenuItem>
        
          </Menu>
        </Box>
      
      </Paper>

      <Box id="ShowRooms">
        {loadingRooms && <CircularProgress/>}
        {!loadingRooms && rooms && rooms.length > 0 && 
          <Box>
            <Grid container spacing={1} rowSpacing={1} columnSpacing={3} p="2%">
              {showRooms.map((room) => (
                <Grid xs={4} sm={3} md={4}>
                  <RoomItem roomData={room}></RoomItem>
                </Grid>
              ))}
            </Grid>

            {!loadedAllRooms && !loadingMoreRooms &&
              <Box id="ButtonLoadMoreRoom"> 
                <Button onClick={async ()=> await getRooms({})} sx={{
                  p: '2px 4px', 
                  display: 'block', 
                  alignItems: 'center',  
                  justifyContent: 'center', 
                  border: '1px solid', 
                  m: '1%' 
                }}>
                  MORE
                </Button>
              </Box>
            } 

            {loadingMoreRooms && <CircularProgress/>}
          </Box>
        }   
      </Box>

      <Box id="Sort">
        
      </Box>
    </Box>
  );
};

export default RoomPage;


