import React, { useEffect } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useStatistic } from "../../../../lib/provider/StatisticProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../lib/provider/UserProvider";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import MemberTableRow from "../../../../modules/statistic/components/MemberTableRow/MemberTableRow";

const MembersPage = () => {
  const { roomId } = useParams();
  const { user } = useUser();
  const { currentRoom, getCurrentRoom, loadingCurrentRoom } = useRooms();
  const {
    members,
    getMembers,
    loadingMembers,
    loadingMoreMembers,
    loadedAllMembers,
  } = useStatistic();

  const { showSnackbarError } = useAppSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  useEffect(() => {
    if (currentRoom.manager_id && user) {
      if (user.id !== currentRoom.manager_id) {
        showSnackbarError("Bạn không có quyền xem thông tin này");
        navigate(`/room`);
        return;
      }
      getMembers({ room_id: currentRoom.id, getStart: 0 });
    }
  }, [currentRoom, user]);

  return (
    <LeftSideBar>
      {loadingCurrentRoom || loadingMembers ? (
        <Box
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>STT</Typography>
                </TableCell>
                {/* cell for avatar */}
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                />
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Họ và tên</Typography>
                </TableCell>
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Email</Typography>
                </TableCell>
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Tham gia</Typography>
                </TableCell>
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Chưa làm</Typography>
                </TableCell>
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Đang làm</Typography>
                </TableCell>
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Chờ duyệt</Typography>
                </TableCell>
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                >
                  <Typography style={{ fontWeight: 600 }}>
                    Hoàn thành
                  </Typography>
                </TableCell>
                {/* empty cell for remove button */}
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                />
                {/* empty cell for navigate detail member button */}
                <TableCell
                  style={{ padding: "4px 8px", backgroundColor: "whitesmoke" }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member, index) => (
                <MemberTableRow
                  member={{ ...member, room_index: index + 1 } as any}
                  key={member.id}
                />
              ))}
              {!loadedAllMembers && !loadingMoreMembers && (
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={async () =>
                      await getMembers({ room_id: currentRoom.id })
                    }
                  >
                    Xem thêm
                  </Button>
                </Box>
              )}
              {loadingMoreMembers && (
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </LeftSideBar>
  );
};

export default MembersPage;
