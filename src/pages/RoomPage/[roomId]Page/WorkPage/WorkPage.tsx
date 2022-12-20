import React, { useEffect, useState } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";
import TaskData from "../../../../modules/task/interface/task-data";
import TaskCard from "../../../../modules/task/components/TaskCard/TaskCard";
import TaskDetailDialog from "../../../../modules/task/components/TaskDetailDialog/TaskDetailDialog";
import { Box, Typography } from "@material-ui/core";
import TaskList from "../../../../modules/task/components/TaskList/TaskList";
import AuthProvider from "../../../../lib/provider/AuthProvider";
import { useTasks } from "../../../../lib/provider/TasksProvider";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
const WorkPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();
  const [tasksToDo, setTasksToDo] = useState<TaskData[]>([]);
  const [tasksDoing, setTasksDoing] = useState<TaskData[]>([]);
  const [tasksDone, setTasksDone] = useState<TaskData[]>([]);
  const [taskShow, setTaskShow] = useState<TaskData>();
  const { tasks, getTasks, updateTask, updatingTask } = useTasks();
  const [isDraggingId, setIsDraggingId] = useState("-1");
  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  useEffect(() => {
    getTasks({ room_id: roomId || "" });
  }, []);
  useEffect(() => {
    tasks.sort((a, b) => {
      if (a.last_edit && b.last_edit) {
        if (a.last_edit.toMillis() < b.last_edit.toMillis()) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    setTasksDoing(
      tasks.filter((task) => {
        return task.status === "DOING";
      })
    );
    setTasksToDo(
      tasks.filter((task) => {
        return task.status === "TODO";
      })
    );
    setTasksDone(
      tasks.filter((task) => {
        return task.status === "DONE";
      })
    );
  }, [tasks]);
  function handleOnDragStart(result: DragStart) {
    if (result.source.droppableId === "DOING") {
      setIsDraggingId(tasksDoing[result.source.index].id);
    } else if (result.source.droppableId === "TODO") {
      setIsDraggingId(tasksToDo[result.source.index].id);
    } else {
      setIsDraggingId(tasksDone[result.source.index].id);
    }
  }
  function handleOnDragEnd(result: DropResult) {
    setIsDraggingId("-1");
    if (updatingTask) {
      return;
    }
    if (!result.destination) return;
    if (result.destination.droppableId !== result.source.droppableId) {
      if (result.source.droppableId === "DOING") {
        updateTask({
          room_id: roomId ? roomId : "",
          id: tasksDoing[result.source.index].id,
          updateData: { status: result.destination.droppableId },
        });
      } else if (result.source.droppableId === "TODO") {
        updateTask({
          room_id: roomId ? roomId : "",
          id: tasksToDo[result.source.index].id,
          updateData: { status: result.destination.droppableId },
        });
      } else {
        updateTask({
          room_id: roomId ? roomId : "",
          id: tasksDone[result.source.index].id,
          updateData: { status: result.destination.droppableId },
        });
      }
      tasks.sort((a, b) => {
        if (a.last_edit && b.last_edit) {
          if (a.last_edit.toMillis() < b.last_edit.toMillis()) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      });
    }
  }

  return (
    <Box style={{ display: "flex" }}>
      <LeftSideBar />
      <TaskDetailDialog
        task={taskShow}
        open={!!taskShow}
        onClose={() => setTaskShow(undefined)}
      />
      <Box style={{ flexGrow: "1", display: "flex", justifyContent: "center" }}>
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
                flexShrink: 0,
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
                status={"TODO"}
                type={"card"}
                isDragging={isDraggingId}
                setTaskShow={setTaskShow}
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
                status={"DOING"}
                type={"card"}
                isDragging={isDraggingId}
                setTaskShow={setTaskShow}
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
                status={"DONE"}
                type={"card"}
                isDragging={isDraggingId}
                setTaskShow={setTaskShow}
              />
            </Box>
          </DragDropContext>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkPage;
