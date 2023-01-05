import React, { useEffect, useState } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";
import TaskData from "../../../../modules/task/interface/task-data";
import TaskDetailDialog from "../../../../modules/task/components/TaskDetailDialog/TaskDetailDialog";
import TaskList from "../../../../modules/task/components/TaskList/TaskList";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useTasks } from "../../../../lib/provider/TasksProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import CreateTaskDialog from "../../../../modules/task/components/CreateTaskDialog/CreateTaskDialog";
import TaskHelper from "../../../../modules/task/util/task-helper";
const WorkPage = () => {
  const [tasksToDo, setTasksToDo] = useState<TaskData[]>([]);
  const [tasksDoing, setTasksDoing] = useState<TaskData[]>([]);
  const [tasksDone, setTasksDone] = useState<TaskData[]>([]);
  const [tasksReviewing, setTasksReviewing] = useState<TaskData[]>([]);

  const { getCurrentRoom, currentRoom } = useRooms();
  const { roomId } = useParams();
  const {
    tasks,
    getTasks,
    updateTask,
    updatingTask,
    currentTask,
    setCurrentTask,
  } = useTasks();
  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);
  const [isDraggingId, setIsDraggingId] = useState("-1");
  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  useEffect(() => {
    if (currentRoom) {
      getTasks({ room_id: roomId || "" });
    }
  }, [currentRoom]);

  const compareTasks = (TaskA: TaskData, TaskB: TaskData) => {
    if (TaskA.order_value >= TaskB.order_value) {
      return 1;
    }
    return -1;
  };

  useEffect(() => {
    console.log(TaskHelper.getOrderString("a", ""));
    setTasksDoing(
      tasks.filter((task) => task.status === "doing").sort(compareTasks)
    );
    setTasksToDo(
      tasks.filter((task) => task.status === "toDo").sort(compareTasks)
    );
    setTasksDone(
      tasks.filter((task) => task.status === "done").sort(compareTasks)
    );
    setTasksReviewing(
      tasks.filter((task) => task.status === "reviewing").sort(compareTasks)
    );
  }, [tasks]);

  function handleOnDragStart(result: DragStart) {
    if (result.source.droppableId === "doing") {
      setIsDraggingId(tasksDoing[result.source.index].id);
    } else if (result.source.droppableId === "toDo") {
      setIsDraggingId(tasksToDo[result.source.index].id);
    } else if (result.source.droppableId === "done") {
      setIsDraggingId(tasksDone[result.source.index].id);
    } else {
      setIsDraggingId(tasksReviewing[result.source.index].id);
    }
  }

  const handleOnDragEnd = async (result: DropResult) => {
    setIsDraggingId("-1");
    if (updatingTask) {
      return;
    }
    if (!result.destination) return;
    if (result.source.droppableId === "toDo") {
      await updateTask({
        room_id: roomId ? roomId : "",
        id: tasksToDo[result.source.index].id,
        updateData: {
          status: result.destination.droppableId as
            | "toDo"
            | "doing"
            | "reviewing"
            | "done",
          order_value: TaskHelper.getOrderString(
            tasksToDo[result.destination.index - 1]?.order_value ?? "",
            tasksToDo[result.destination.index]?.order_value ?? ""
          ),
        },
      });
    } else if (result.source.droppableId === "doing") {
      await updateTask({
        room_id: roomId ? roomId : "",
        id: tasksDoing[result.source.index].id,
        updateData: {
          status: result.destination.droppableId as
            | "toDo"
            | "doing"
            | "reviewing"
            | "done",
          order_value: TaskHelper.getOrderString(
            tasksDoing[result.destination.index - 1]?.order_value ?? "",
            tasksDoing[result.destination.index]?.order_value ?? ""
          ),
        },
      });
    } else if (result.source.droppableId === "reviewing") {
      await updateTask({
        room_id: roomId ? roomId : "",
        id: tasksReviewing[result.source.index].id,
        updateData: {
          status: result.destination.droppableId as
            | "toDo"
            | "doing"
            | "reviewing"
            | "done",
          order_value: TaskHelper.getOrderString(
            tasksReviewing[result.destination.index - 1]?.order_value ?? "",
            tasksReviewing[result.destination.index]?.order_value ?? ""
          ),
        },
      });
    } else if (result.source.droppableId === "done") {
      await updateTask({
        room_id: roomId ? roomId : "",
        id: tasksDone[result.source.index].id,
        updateData: {
          status: result.destination.droppableId as
            | "toDo"
            | "doing"
            | "reviewing"
            | "done",
          order_value: TaskHelper.getOrderString(
            tasksDone[result.destination.index - 1]?.order_value ?? "",
            tasksDone[result.destination.index]?.order_value ?? ""
          ),
        },
      });
    }
  };

  return (
    <>
      <LeftSideBar>
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              margin: "0.625rem",
              width: "200px",
              textTransform: "none",
            }}
            onClick={() => {
              setOpenCreateTaskDialog(true);
            }}
          >
            <Typography style={{ fontWeight: 600 }}>Tạo công việc</Typography>
          </Button>
          <CreateTaskDialog
            open={openCreateTaskDialog}
            onClose={() => {
              setOpenCreateTaskDialog(false);
            }}
          />
          <Box
            style={{
              marginTop: 16,
              marginLeft: 8,
              maxHeight: 700,
            }}
          >
            <DragDropContext
              onDragEnd={handleOnDragEnd}
              onDragStart={handleOnDragStart}
            >
              <Box style={{ display: "inline-block" }}>
                <PerfectScrollbar
                  style={{
                    background: "#f1f3f9",
                    marginRight: 12,
                    width: 300,
                    maxHeight: 700,
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
                    Chưa làm
                  </Typography>
                  <TaskList
                    curTaskList={tasksToDo}
                    status={"toDo"}
                    type={"card"}
                    isDragging={isDraggingId}
                  />
                </PerfectScrollbar>
              </Box>
              <Box style={{ display: "inline-block" }}>
                <PerfectScrollbar
                  style={{
                    background: "#f1f3f9",
                    width: 300,
                    maxHeight: 700,
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
                    Đang làm
                  </Typography>
                  <TaskList
                    curTaskList={tasksDoing}
                    status={"doing"}
                    type={"card"}
                    isDragging={isDraggingId}
                  />
                </PerfectScrollbar>
              </Box>
              <Box style={{ display: "inline-block" }}>
                <PerfectScrollbar
                  style={{
                    width: 300,
                    background: "#f1f3f9",
                    maxHeight: 700,
                    marginRight: 12,
                    display: "flex",
                    overflowY: "scroll",
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
                    Chờ duyệt
                  </Typography>
                  <TaskList
                    curTaskList={tasksReviewing}
                    status={"reviewing"}
                    type={"card"}
                    isDragging={isDraggingId}
                  />
                </PerfectScrollbar>
              </Box>
              <Box style={{ display: "inline-block" }}>
                <PerfectScrollbar
                  style={{
                    width: 300,
                    background: "#f1f3f9",
                    maxHeight: 700,
                    display: "flex",
                    overflowY: "scroll",
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
                    Hoàn thành
                  </Typography>
                  <TaskList
                    curTaskList={tasksDone}
                    status={"done"}
                    type={"card"}
                    isDragging={isDraggingId}
                  />
                </PerfectScrollbar>
              </Box>
            </DragDropContext>
          </Box>
        </Box>
      </LeftSideBar>

      <TaskDetailDialog
        task={currentTask}
        open={!!currentTask}
        onClose={() => setCurrentTask(undefined)}
      />
    </>
  );
};

export default WorkPage;
