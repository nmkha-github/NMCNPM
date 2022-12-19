import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Box, Button, TextField, Container,Menu,MenuItem } from "@mui/material";
import TaskData from "../../../task/interface/task-data";
import { Typography } from "@material-ui/core";
import UserHelper from "../../../user/util/user-helper";
import UserData from "../../../user/interface/user-data";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import USER_AVATAR_DEFAULT from "../../../user/contants/user-avatar-default";
import { useNavigate, useParams } from "react-router-dom";
import TaskCardMenu from "./TaskCardMenu";

interface TaskCardProps {
  task: TaskData;
  mode: "card" | "item";
}
const TaskCard = ({ task, mode }: TaskCardProps) => {
  const { showSnackbarError } = useAppSnackbar();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [user, setUser] = useState<undefined | UserData>(undefined);
  useEffect(() => {
    async function getUserData() {
      try {
        setUser(await UserHelper.getUserById(task.assignee_id || ""));
      } catch (error) {
        showSnackbarError(error);
      }
    }
    getUserData();
  }, []);
  if (mode === "card") {
    return (
      <Box
        style={{ width: 260, padding: 12, border: "1px solid black" }}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onDoubleClick={() => {
            navigate(`/room/${roomId}/task/${task.id}`);
        }}
      >
        <Box
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            align="center"
            style={{ textDecoration: "underline", fontSize: 18 }}
          >
            {task.title}
          </Typography>
          <Box sx={{marginLeft:"auto"}}>
          <TaskCardMenu roomId={roomId ? roomId : ""} taskData={task}/>
          </Box>
        </Box>
        <Typography style={{ fontSize: 14 }}>{task.content}</Typography>
        <Box style={{ display: "flex", justifyContent: "right" }}>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
              borderRadius: "50%",
            }}
            src={user ? user.avatar : USER_AVATAR_DEFAULT}
          />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        style={{
          height: 35,
          float: "none",
          overflow: "hidden",
          padding: 10,
          border: "0.1px solid black",
          display: "flex",
          alignItems: "center",
        }}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onDoubleClick={() => {
          navigate(`/room/${roomId}/task/${task.id}`);
        }}
      >
        <Box
          component="img"
          sx={{
            height: 24,
            width: 24,
            borderRadius: "50%",
          }}
          src={user ? user.avatar : USER_AVATAR_DEFAULT}
        />
        <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:'100%'}}>
        <Typography align="center" style={{ fontSize: 14, marginLeft: 10 }}>
          {task.title}
        </Typography>
        <TaskCardMenu roomId={roomId ? roomId : ""} taskData={task}/>
        </Box>
      </Box>
    );
  }
};

export default TaskCard;
