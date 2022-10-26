import React, { useEffect } from "react";
import RoomItem from "../../modules/home/components/RoomItem/RoomItem";

const HomePage = () => {
  const dataName = false;

  useEffect(() => {}, []);

  return (
    <div>
      <RoomItem data={{ id: "100", name: "abc" }} />
    </div>
  );
};

export default HomePage;
