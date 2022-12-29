import React, { useEffect } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useStatistic } from "../../../../lib/provider/StatisticProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../lib/provider/UserProvider";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { Box, CircularProgress } from "@mui/material";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import BarChart from "../../../../lib/components/BarChart/BarChart";

const MembersPage = () => {
  const { roomId } = useParams();
  const { user } = useUser();
  const { currentRoom, getCurrentRoom } = useRooms();
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
    getRoomStatistic({ room_id: roomId || "" });
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
    <LeftSideBar>
      <Box
        style={{
          height: 400,
          marginTop: 24,
          position: "relative",
        }}
      >
        <BarChart
          style={{
            height: 400,
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
          data={[
            { value: roomStatistic.toDo, title: "Chưa làm" },
            { value: roomStatistic.doing, title: "Đang làm" },
            { value: roomStatistic.reviewing, title: "Chờ duyệt" },
            { value: roomStatistic.done, title: "Hoàn thành" },
          ]}
        />
      </Box>
    </LeftSideBar>
  );
};

export default MembersPage;
