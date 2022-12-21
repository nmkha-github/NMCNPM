import React, { useEffect } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useStatistic } from "../../../../lib/provider/StatisticProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../lib/provider/UserProvider";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { Box, CircularProgress } from "@mui/material";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";

const MembersPage = () => {
  const { roomId } = useParams();
  const { user } = useUser();
  const { currentRoom, getCurrentRoom, loadingCurrentRoom } = useRooms();
  const {
    members,
    getMembers,
    loadingMembers,
    roomStatistic,
    getRoomStatistic,
    loadingRoomStatistic,
  } = useStatistic();

  const { showSnackbarError } = useAppSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  useEffect(() => {
    if (currentRoom) {
      if (user?.id !== currentRoom.manager_id) {
        showSnackbarError("Bạn không có quyền xem thông tin này");
        navigate(`/room`);
        return;
      }
      getMembers({ room_id: currentRoom.id });
      getRoomStatistic({ room_id: currentRoom.id });
    }
  }, [currentRoom]);

  return (
    <Box style={{ display: "flex" }}>
      <LeftSideBar />

      {loadingCurrentRoom ? (
        <Box style={{ marginTop: 16 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default MembersPage;
