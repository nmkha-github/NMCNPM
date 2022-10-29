import React, { useEffect } from "react";
import RoomItem from "../../modules/home/components/RoomItem/RoomItem";
import LoginForm from "../../modules/home/components/LoginForm/LoginForm";
const HomePage = () => {
  const dataName = false;

  useEffect(() => {}, []);

  return (
    <div>
      <LoginForm/>
    </div>
  );
};

export default HomePage;
