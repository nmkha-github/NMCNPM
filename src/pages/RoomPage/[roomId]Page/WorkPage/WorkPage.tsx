import React, { useEffect } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";

const WorkPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  return (
    <div>
      <LeftSideBar />
    </div>
  );
};

export default WorkPage;
