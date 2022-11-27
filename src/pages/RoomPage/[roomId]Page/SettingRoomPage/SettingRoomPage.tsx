import React from "react";
import { Box, Typography,Button } from "@mui/material";
import "./SettingRoomPage.css";
import { Container,Switch } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FileUploadSharpIcon from '@mui/icons-material/FileUploadSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
interface props{
  name: string;
}
const backToWorkspace=()=>{
   var newPath = window.location.pathname.split('/').slice(0,3).join('/');
   window.location.pathname=newPath;
}
const SettingRoomPage = ({name}:props) => {
  return <Box>
    <button 
    onClick={backToWorkspace}
    id="back_to_workspace"
    ><ArrowBackSharpIcon/> Back to workspace</button>
    <Container maxWidth="sm">
    <h2 id="setting_main">Setting</h2>
      <Box id="room_name">
        {name}
      </Box>
      <Box className="setting_row">
        <Box className="setting_name">
        <AddIcon fontSize="large"/>
        <h3>Permission 1</h3>
        </Box>
        <Switch />
      </Box>
      <Box className="setting_row">
        <Box className="setting_name">
        <AddIcon fontSize="large"/>
        <h3>Permission 2</h3>
        </Box>
        <Switch />
      </Box>
      <Box className="setting_row">
        <Box className="setting_name">
        <AddIcon fontSize="large"/>
        <h3>Permission 3</h3>
        </Box>
        <Switch size="medium"/>
      </Box>
      <button id="avatar_change">
        <h1><FileUploadSharpIcon sx={{ fontSize: 40 }}/>Drag file here</h1>
      </button>
    </Container>
    </Box>;
};

export default SettingRoomPage;
