import { Box } from "@mui/material";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const RoomItem = ({ data }: { data: any }) => {
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
    >
      <Box style = {{
        width: "100%",
        height: 184,
        display: "block",
        }}>
          <img src={data.avatar} alt="" style={{
              width: "100%", 
              height: "100%",
              borderRadius: "5% 5% 0 0",
              }} />
      </Box>

      <Box style = {{
          color: "black",
          padding: "4% 3% 0 4%",
          float: "left",
          }}>
            <Box style ={{
              fontSize: 16,
              fontWeight: "bold",
              overflow: "hidden",
              cursor: "pointer",
              }}>
              {data.name}
            </Box>

            <Box style={{
              fontSize: 14,
              paddingTop: "3%"
              }}>
              Mã phòng : {data.id}
            </Box>
      </Box>
      <Box>
          <BiDotsVerticalRounded style={{
            width: "8%", 
            height: "8%",
            borderRadius: "5% 5% 0 0",
            float: "right",
            cursor: "pointer",
            padding: "4%",
            color: "black"
            }} id = "demo"/>
      </Box>
    </Box>
  );
};

export default RoomItem;
