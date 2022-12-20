import React, { useEffect, useState } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";
import TaskData from "../../../../modules/task/interface/task-data";
import TaskCard from "../../../../modules/task/components/TaskCard/TaskCard";
import TaskDetailDialog from "../../../../modules/task/components/TaskDetailDialog/TaskDetailDialog";
import TaskList from "../../../../modules/task/components/TaskList/TaskList";
import AuthProvider from "../../../../lib/provider/AuthProvider";
import { useTasks } from "../../../../lib/provider/TasksProvider";
import { Box, Button, TextField,Typography } from "@mui/material";

import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import CreateTaskDialog from "../../../../modules/task/components/CreateTaskDialog/CreateTaskDialog";
const WorkPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();
  const [tasksToDo, setTasksToDo] = useState<TaskData[]>([]);
  const [tasksDoing, setTasksDoing] = useState<TaskData[]>([]);
  const [tasksDone, setTasksDone] = useState<TaskData[]>([]);
  const [taskReviewing,setTaskReviewing]=useState<TaskData[]>([]);
  const { tasks, getTasks, updateTask, updatingTask,currentTask,setCurrentTask,createTask } = useTasks();
  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);
  const [isDraggingId, setIsDraggingId] = useState("-1");
  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  useEffect(() => {
    getTasks({ room_id: roomId || "" });
  }, []);

  function compareTasks(a: TaskData, b: TaskData) {
    if (a.last_edit && b.last_edit) {
      if (a.last_edit.toMillis() < b.last_edit.toMillis()) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }

  useEffect(() => {
    setTasksDoing(
      tasks.filter((task) => task.status === "doing").sort(compareTasks)
    );
    setTasksToDo(
      tasks.filter((task) => task.status === "toDo").sort(compareTasks)
    );
    setTasksDone(
      tasks.filter((task) => task.status === "done").sort(compareTasks)
    );
    setTaskReviewing(
      tasks.filter((task) => task.status === "reviewing").sort(compareTasks)
    );
  }, [tasks]);

  function handleOnDragStart(result: DragStart) {
    if (result.source.droppableId === "doing") {
      setIsDraggingId(tasksDoing[result.source.index].id);
    } else if (result.source.droppableId === "toDo") {
      setIsDraggingId(tasksToDo[result.source.index].id);
    } else if (result.source.droppableId === "done"){
      setIsDraggingId(tasksDone[result.source.index].id);
    }
    else{
      setIsDraggingId(taskReviewing[result.source.index].id);
    }
  }

  function handleOnDragEnd(result: DropResult) {
    setIsDraggingId("-1");
    if (updatingTask) {
      return;
    }
    if (!result.destination) return;
    if (result.destination.droppableId !== result.source.droppableId) {
      if (result.source.droppableId === "doing") {
        updateTask({
          room_id: roomId ? roomId : "",
          id: tasksDoing[result.source.index].id,
          updateData: { status: result.destination.droppableId },
        });
      } else if (result.source.droppableId === "toDo") {
        updateTask({
          room_id: roomId ? roomId : "",
          id: tasksToDo[result.source.index].id,
          updateData: { status: result.destination.droppableId },
        });
      } else if(result.source.droppableId === "done"){
        updateTask({
          room_id: roomId ? roomId : "",
          id: tasksDone[result.source.index].id,
          updateData: { status: result.destination.droppableId },
        });
      }
      else{
        updateTask({
          room_id: roomId ? roomId : "",
          id: taskReviewing[result.source.index].id,
          updateData: { status: result.destination.droppableId },
        });
      }
    }
  }

  return (
    <Box style={{ display: "flex" }}>
      <LeftSideBar />
      <TaskDetailDialog
        task={currentTask}
        open={!!currentTask}
        onClose={() => setCurrentTask(undefined)}
      />
      <Box style={{ flexGrow: "1", display: "flex",flexDirection:"column" }}>
        <Button
              variant="contained"
              color="primary"
              style={{ margin: "0.625rem",width:"200px" }}
              onClick={() => {
                setOpenCreateTaskDialog(true);
              }}
            >
              Tạo công việc
            </Button>
          <CreateTaskDialog
          open={openCreateTaskDialog}
          onClose={()=>{setOpenCreateTaskDialog(false);}}
          />
        <Box
          style={{
            display: "flex",
            marginTop: 16,
            marginLeft: 8,
            height: "auto",
          }}
        >
          <DragDropContext
            onDragEnd={handleOnDragEnd}
            onDragStart={handleOnDragStart}
          >
            <Box
              style={{
                width: 300,
                background: "#f1f3f9",
                height: "auto",
                minHeight: 0,
                display: "flex",
                flexWrap: "wrap",
                marginRight: 12,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  textDecoration: "underline",
                  marginBottom: 12,
                }}
              >
                TO DO
              </Typography>
              <TaskList
                curTaskList={tasksToDo}
                status={"toDo"}
                type={"card"}
                isDragging={isDraggingId}
              />
            </Box>
            <Box
              style={{
                width: 300,
                height: "auto",
                background: "#f1f3f9",
                display: "flex",
                marginRight: 12,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  textDecoration: "underline",
                  marginBottom: 12,
                }}
              >
                DOING
              </Typography>
              <TaskList
                curTaskList={tasksDoing}
                status={"doing"}
                type={"card"}
                isDragging={isDraggingId}
              />
            </Box>
            <Box
              style={{
                width: 300,
                background: "#f1f3f9",
                height: "auto",
                marginRight: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  textDecoration: "underline",
                  marginBottom: 12,
                }}
              >
                REVIEWING
              </Typography>
              <TaskList
                curTaskList={taskReviewing}
                status={"reviewing"}
                type={"card"}
                isDragging={isDraggingId}
              />
            </Box>
            <Box
              style={{
                width: 300,
                background: "#f1f3f9",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  textDecoration: "underline",
                  marginBottom: 12,
                }}
              >
                DONE
              </Typography>
              <TaskList
                curTaskList={tasksDone}
                status={"done"}
                type={"card"}
                isDragging={isDraggingId}
              />
            </Box>
          </DragDropContext>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkPage;
