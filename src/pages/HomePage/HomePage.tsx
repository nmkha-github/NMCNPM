import React, { useEffect } from "react";
import RoomItem from "../../modules/home/components/RoomItem/RoomItem";
const HomePage = () => {
  const dataName = false;

  useEffect(() => {}, []);

  return (
    <div>
      <RoomItem data="hello" />
    </div>
  );
};

export default HomePage;
