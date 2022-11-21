import React, { useEffect } from "react";
import RoomItem from "../../modules/home/components/RoomItem/RoomItem";

const HomePage = () => {
  const dataName = false;

  useEffect(() => {}, []);

  return (
    <div>
      <RoomItem data="hello" />
      <RoomItem data={{ id: "SHUBA1", name: "Lớp tập huấn 1", avatar: "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg" }} />
      <RoomItem data={{ id: "SHUBA2", name: "Lớp tập huấn 2", avatar: "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg" }} />
      <RoomItem data={{ id: "SHUBA3", name: "Lớp tập huấn 3", avatar: "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg" }} />
      <RoomItem data={{ id: "SHUBA4", name: "Lớp tập huấn 4", avatar: "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg" }} />
      <RoomItem data={{ id: "SHUBA5", name: "Lớp tập huấn 5", avatar: "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg" }} />
      <RoomItem data={{ id: "SHUBA6", name: "Lớp tập huấn 6", avatar: "https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg" }} />
    </div>
  );
};

export default HomePage;
