import React, { useEffect } from "react";

import { Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../../lib/provider/UserProvider";
import { useRooms } from "../../../../../lib/provider/RoomsProvider";
import { useStatistic } from "../../../../../lib/provider/StatisticProvider";
import LeftSideBar from "../../../../../modules/room/components/LeftSideBar/LeftSideBar";
import useAppSnackbar from "../../../../../lib/hook/useAppSnackBar";

const MemberPage = () => {
  const { roomId, memberId } = useParams();
  const { user } = useUser();
  const { currentRoom, getCurrentRoom, loadingCurrentRoom } = useRooms();
  const { member, getMember, loadingMember } = useStatistic();

  const { showSnackbarError } = useAppSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  useEffect(() => {
    if (user?.id !== currentRoom.manager_id || user?.id !== memberId) {
      showSnackbarError("Bạn không có quyền xem thông tin này");
      navigate(`/room`);
      return;
    }
    getMember({ room_id: roomId || "", member_id: memberId });
  }, [currentRoom]);

  useEffect(() => {});

  return (
    <LeftSideBar>
      {loadingCurrentRoom ? (
        <Box style={{ marginTop: 16 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>{/* UI here */}</Box>
      )}
    </LeftSideBar>
  );
};

export default MemberPage;
