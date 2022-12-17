/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../../lib/provider/AuthProvider";
import { useRooms } from "../../lib/provider/RoomsProvider";
import { useUser } from "../../lib/provider/UserProvider";
import AddRoomButton from "../../modules/room/components/AddRoomButton/AddRoomButton";
import RoomItem from "../../modules/room/components/RoomItem/RoomItem";
<<<<<<< HEAD
import RoomPage from "../RoomPage/RoomPage";
=======
import UploadFile from "../../lib/components/UploadFile/UploadFile";
>>>>>>> 47d802d104d32aa08701a5567762e85d7287fd19

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

      <RoomItem
        roomData={{
          id: "SHUBA1",
          name: "Lớp tập huấn 1",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA2",
          name: "Lớp tập huấn 2",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA3",
          name: "Lớp tập huấn 3",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA4",
          name: "Lớp tập huấn 4",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA5",
          name: "Lớp tập huấn 5",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA6",
          name: "Lớp tập huấn 6",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA4",
          name: "Lớp tập huấn 4",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA5",
          name: "Lớp tập huấn 5",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
      <RoomItem
        roomData={{
          id: "SHUBA6",
          name: "Lớp tập huấn 6",
          avatar:
            "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg",
          created_at: "",
        }}
      />
    </div>
  );
};

export default HomePage;
