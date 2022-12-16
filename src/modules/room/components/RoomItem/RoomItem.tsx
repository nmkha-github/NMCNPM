/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import RoomItemMenu from "./RoomItemMenu";
import RoomData from "../../../room/interface/room-data";

const RoomItem = ({ roomData }: { roomData: RoomData }) => {
  let navigate = useNavigate();
  const [hide, setHide] = useState(false);
  return (
    <Box style={{
        backgroundColor: "#c0feff",
        width: 600,
        height: 300,
        color: "white",
        margin: "1%",    
        float: "left",
        borderRadius: "3%",
        borderColor: "#1da6fa",
        borderWidth: "medium",
        }}
        onDoubleClick={()=>{navigate("/room/");}}
    >

      <Box style = {{
        width: "100%",
        height: 220,
        display: "block",
        backgroundColor: "white",
        borderRadius: "5% 5% 0 0",
        }}>
          <img src={roomData.avatar} alt="" style={{
              width: "100%", 
              height: "100%",
              
              }} />
      </Box>
       
      <Box style = {{
          color: "black",
          padding: "2% 3% 0 3%",
          float: "left",
          }}>
            <Box style ={{
              fontSize: 18,
              fontWeight: "bold",
              overflow: "hidden",
              cursor: "pointer",
              }}>
              {roomData.name}
            </Box>

            <Box style={{
              fontSize: 14,
              paddingTop: "3%"
              }}>
              Mã phòng : {roomData.id}
            </Box>
      </Box>
      
      
      <Box style={{
        float: "right",
        padding: "3%",
      }}>
        <RoomItemMenu roomData={roomData}/>
      </Box>
    </Box>
  );
};

export default RoomItem;