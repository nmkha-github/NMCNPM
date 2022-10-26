import { Box } from "@mui/material";
import React from "react";

const RoomItem = ({ data }: { data: any }) => {
  return (
    <Box
      style={{
        backgroundColor: "black",
        width: 200,
        height: 200,
        color: "white",
      }}
    >
      {data.name}
    </Box>
  );
};

export default RoomItem;
