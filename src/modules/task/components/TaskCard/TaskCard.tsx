import React, { useState, useEffect } from "react";
import { Box, BoxProps } from "@mui/material";
import TaskData from "../../../task/interface/task-data";
import { Typography } from "@material-ui/core";
import UserHelper from "../../../user/util/user-helper";
import UserData from "../../../user/interface/user-data";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import USER_AVATAR_DEFAULT from "../../../user/contants/user-avatar-default";
import { useParams } from "react-router-dom";
import TaskCardMenu from "./TaskCardMenu";
import { useTasks } from "../../../../lib/provider/TasksProvider";

interface TaskCardProps {
  task: TaskData;
  mode: "card" | "item";
  isDragging: string;
}

const TaskCard = ({
  task,
  mode,
  isDragging,
  ...boxProps
}: TaskCardProps & BoxProps) => {
  const [user, setUser] = useState<undefined | UserData>(undefined);
  const { showSnackbarError } = useAppSnackbar();
  const { roomId } = useParams();
  const { setCurrentTask } = useTasks();

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
        style={{
          width: 260,
          padding: 12,
          border: "1px solid black",
          background: `${isDragging === task.id ? "#d8f9ff" : "white"}`,
        }}
        {...boxProps}
        onClick={() => setCurrentTask(task)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
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
          <TaskCardMenu roomId={roomId ? roomId : ""} taskData={task} />
        </Box>
        <Typography style={{ fontSize: 14 }}>
          {task.content && task.content.length > 60
            ? task.content.slice(0, 60) + "..."
            : task.content}
        </Typography>
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
          width: 260,
          height: 35,
          padding: 10,
          border: "0.1px solid black",
          display: "flex",
          alignItems: "center",
        }}
        {...boxProps}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => setCurrentTask(task)}
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
        <Typography align="center" style={{ fontSize: 14, marginLeft: 10 }}>
          {task.title}
        </Typography>
        <TaskCardMenu roomId={roomId ? roomId : ""} taskData={task} />
      </Box>
    );
  }
};

export default TaskCard;
