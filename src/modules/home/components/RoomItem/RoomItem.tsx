import { Box } from "@mui/material";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type RoomData = any;

const RoomItem = ({ roomData }: { roomData: RoomData }) => {
  let navigate = useNavigate();
  return (
    <Box style={{
        backgroundColor: "rgba(240, 240, 240, 0.8)",
        width: "32%",
        height: 255,
        color: "white",
        margin: "0.6666%",    
        float: "left",
        borderRadius: "5%",
        borderColor: "rgba(51, 51, 255, 1)",
        borderWidth: "thin",
        }}
        onDoubleClick={()=>{navigate("/room/" + roomData.id + "/newsfeed");}}
    >
      <Box style = {{
        width: "100%",
        height: 184,
        display: "block",
        }}>
          <img src={roomData.avatar} alt="" style={{
              width: "100%", 
              height: "100%",
              borderRadius: "5% 5% 0 0",
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
      <Box>
          <BiDotsVerticalRounded style={{
            width: "17%", 
            height: "17%",
            borderRadius: "5% 5% 0 0",
            float: "right",
            cursor: "pointer",
            padding: "4%",
            color: "black"
            }}/>
      </Box>
    </Box>
  );
};

export default RoomItem;
