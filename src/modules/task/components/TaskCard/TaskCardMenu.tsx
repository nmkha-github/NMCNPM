import React from "react";
import { Box, IconButton, Typography, ListItemIcon, Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { BiLogIn, BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import TaskData from "../../interface/task-data";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTasks } from "../../../../lib/provider/TasksProvider";
const ITEM_HEIGHT = 48;

const TaskCardMenu = ({ taskData }: { taskData: TaskData }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { roomId } = useParams();
  const { deleteTask, deletingTask,setCurrentTask } = useTasks();
  let navigate = useNavigate();
  return (
    <Box style={{ position: "absolute", right: 0 }}>
      <IconButton
        type="button"
        onClick={(event) => {
          if(event.target!==event.currentTarget){
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
          }
        }}
        style={{
          color: "black",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >

        <MenuItem
          style={{ display: "flex", padding: 8 }}
          onClick={() => {
            setCurrentTask(taskData);
          }}
        >
          <ListItemIcon>
            <BiEdit fontSize="large" />{" "}
          </ListItemIcon>
          <Typography variant="inherit" noWrap width="18ch">
            Chỉnh sửa công việc
          </Typography>
        </MenuItem>

        {deletingTask ? (
          <CircularProgress />
        ) : (
          <MenuItem
            style={{ display: "flex", padding: 8 }}
            onClick={async () => {
              await deleteTask({ room_id:roomId?roomId:"",id: taskData.id });
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              {" "}
              <BiTrash fontSize="large" />{" "}
            </ListItemIcon>
            <Typography variant="inherit" noWrap width="18ch">
              Xóa công việc
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default TaskCardMenu;
