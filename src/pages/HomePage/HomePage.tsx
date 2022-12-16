import { Button } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../lib/components/Header/Header";
import { useAuth } from "../../lib/provider/AuthProvider";
import { useRooms } from "../../lib/provider/RoomsProvider";
import { useUser } from "../../lib/provider/UserProvider";
import AddRoomButton from "../../modules/room/components/AddRoomButton/AddRoomButton";
import RoomItem from "../../modules/room/components/RoomItem/RoomItem";

const HomePage = () => {
  const dataName = false;

  const { logOut } = useAuth();
  const { getRooms } = useRooms();
  useEffect(() => {
    getRooms({ getStart: 0 });
  }, []);

  return (
    <Header>
      <div>
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
    </Header>
  );
};

export default HomePage;
