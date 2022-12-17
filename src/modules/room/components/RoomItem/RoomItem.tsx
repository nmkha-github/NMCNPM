/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, BoxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoomItemMenu from "./RoomItemMenu";
import RoomData from "../../../room/interface/room-data";
import { Typography } from "@material-ui/core";

interface RoomItemProps {
  roomData: RoomData;
}

const RoomItem = ({ roomData, ...boxProps }: RoomItemProps & BoxProps) => {
  let navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundColor: "#c0feff",
        color: "white",
        borderRadius: 12,
        borderColor: "#1da6fa",
        borderWidth: "medium",
        overflow: "hidden",
        ...boxProps.style,
      }}
      onDoubleClick={() => {
        navigate(`/room/${roomData.id}/newsfeed`);
      }}
    >
      <img
        src={roomData.avatar}
        alt=""
        style={{
          maxWidth: "100%",
        }}
      />

      <Box
        style={{
          display: "flex",
          padding: 16,
          color: "black",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography style={{ fontWeight: 700 }}>{roomData.name}</Typography>

          <Typography variant="body2">Mã phòng: {roomData.id}</Typography>
        </Box>

        <RoomItemMenu roomData={roomData} />
      </Box>
    </Box>
  );
};

export default RoomItem;
