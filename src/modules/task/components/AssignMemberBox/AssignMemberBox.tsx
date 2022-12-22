import { MenuItem, Popper } from "@material-ui/core";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStatistic } from "../../../../lib/provider/StatisticProvider";
import MemberData from "../../../statistic/interface/member-data";
import USER_AVATAR_DEFAULT from "../../../user/contants/user-avatar-default";
import UserData from "../../../user/interface/user-data";
import UserHelper from "../../../user/util/user-helper";
import TaskData from "../../interface/task-data";

interface AssignMemberBoxProps {
  task: TaskData;
  onChoose: (member: MemberData | UserData) => void;
}

const AssignMemberBox = ({ task, onChoose }: AssignMemberBoxProps) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [hintPeopleAnchorEl, setHintPeopleAnchorEl] =
    useState<HTMLElement | null>(null);
  const [assignee, setAssignee] = useState<MemberData | UserData>();

  const { roomId } = useParams();
  const { getMembers, members } = useStatistic();

  useEffect(() => {
    const getAssigneeInfo = async () => {
      const assigneeInfo = await UserHelper.getUserById(task.assignee_id);
      if (assigneeInfo) {
        setAssignee(assigneeInfo);
      }
    };
    getAssigneeInfo();
  }, [task.assignee_id]);

  useEffect(() => {
    const getHintPeople = async () => {
      await getMembers({
        room_id: roomId || "",
        getStart: 0,
        getLimit: 100,
      });
    };

    if (hintPeopleAnchorEl) {
      getHintPeople();
    }
  }, [hintPeopleAnchorEl, roomId]);

  return (
    <Box>
      {showTextField ? (
        <>
          <TextField
            value={textFieldValue}
            placeholder="Nhập @ để gán"
            size="small"
            onChange={(event) => {
              setTextFieldValue(event.target.value);
              if (event.target.value.includes("@")) {
                if (!hintPeopleAnchorEl) {
                  setHintPeopleAnchorEl(event.currentTarget);
                }
              } else {
                setHintPeopleAnchorEl(null);
              }
            }}
          />
          <Popper open={!!hintPeopleAnchorEl} anchorEl={hintPeopleAnchorEl}>
            <Box>
              {members
                .filter((member) =>
                  member.name.includes(
                    textFieldValue.substring(textFieldValue.indexOf("@") + 1)
                  )
                )
                .concat([
                  {
                    id: "",
                    name: "Chưa xác định",
                    avatar: "",
                    toDo: 0,
                    doing: 0,
                    reviewing: 0,
                    done: 0,
                    joined_at: "",
                  },
                ])
                .map((member) => (
                  <MenuItem
                    onClick={() => {
                      onChoose(member);
                      setShowTextField(false);
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar src={member.avatar} style={{ marginRight: 8 }} />
                      <Typography>{member.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
            </Box>
          </Popper>
        </>
      ) : (
        <Box
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setShowTextField(!showTextField)}
        >
          <Avatar
            sizes="small"
            src={assignee?.avatar || USER_AVATAR_DEFAULT}
            style={{ marginRight: 8 }}
          />
          <Typography>{assignee?.name}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default AssignMemberBox;
