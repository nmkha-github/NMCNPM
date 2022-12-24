import { useEffect } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";

const NewsfeedPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  return <LeftSideBar></LeftSideBar>;
};

export default NewsfeedPage;
