/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/provider/AuthProvider";
import { useRooms } from "../../lib/provider/RoomsProvider";
import AddRoomButton from "../../modules/room/components/AddRoomButton/AddRoomButton";
import UploadFile from "../../lib/components/UploadFile/UploadFile";

const HomePage = () => {
  const dataName = false;

  const { logOut } = useAuth();
  const { rooms, getRooms } = useRooms();
  useEffect(() => {
    getRooms({ getStart: 0 });
  }, []);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  return (
    <div>
      <UploadFile
        onSuccess={(file) => {
          console.log(file.url);
          console.log(file.name);
        }}
      >
        <Button>ABC</Button>
      </UploadFile>
      <AddRoomButton />
    </div>
  );
};

export default HomePage;
