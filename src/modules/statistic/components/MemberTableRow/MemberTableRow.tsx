import {
  Box,
  Avatar,
  Typography,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MEMBER_AVATAR_DEFAULT from "../../constants/member-avatar-default";
import MemberData from "../../interface/member-data";
import UserData from "../../../user/interface/user-data";
import convertTimeToString from "../../../../lib/util/convert-time-to-string";
import { useEffect, useState } from "react";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import UserHelper from "../../../user/util/user-helper";
import { BiArrowFromLeft, BiCrown, BiTrashAlt } from "react-icons/bi";
import { useStatistic } from "../../../../lib/provider/StatisticProvider";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useConfirmDialog } from "../../../../lib/provider/ConfirmDialogProvider";

interface MemberTableRowProps {
  memberData: MemberData & UserData;
}

const MemberTableRow = ({ memberData }: MemberTableRowProps) => {
  const [member, setMember] = useState<MemberData & UserData>();

  const { showConfirmDialog } = useConfirmDialog();
  const { showSnackbarError } = useAppSnackbar();
  const { roomId } = useParams();
  let navigate = useNavigate();

  const { removeMember } = useStatistic();
  const { currentRoom } = useRooms();

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const userInfo = await UserHelper.getUserById(memberData.id);
        setMember({ ...userInfo, ...memberData });
      } catch (error) {
        showSnackbarError(error);
      }
    };
    getMemberInfo();
  }, [memberData]);

  return (
    <TableRow>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{member?.room_index}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Avatar src={member?.avatar} />
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{member?.name}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{member?.email}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{convertTimeToString(member?.joined_at || "")}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{member?.toDo}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{member?.doing}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{member?.reviewing}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        <Typography>{member?.done}</Typography>
      </TableCell>
      <TableCell style={{ padding: "4px 8px" }}>
        {currentRoom.manager_id !== member?.id ? (
          <IconButton
            onClick={() =>
              showConfirmDialog({
                title: (
                  <Typography variant="h6">
                    "Xóa thành viên khỏi phòng ban"
                  </Typography>
                ),
                content: (
                  <Typography>
                    Bạn có chắc xóa <strong>{member?.name}</strong> ra khỏi
                    phòng ban?
                  </Typography>
                ),
                onConfirm: async () =>
                  await removeMember({
                    room_id: roomId || "",
                    member_id: member?.id || "",
                  }),
              })
            }
          >
            <BiTrashAlt />
          </IconButton>
        ) : (
          <Tooltip title="Quản lí">
            <BiCrown size={28} style={{ color: "orange" }} />
          </Tooltip>
        )}
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() => navigate(`/room/${roomId}/member/${member?.id}`)}
        >
          <BiArrowFromLeft />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default MemberTableRow;
