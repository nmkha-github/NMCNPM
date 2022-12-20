import TaskListData from "../../interface/task-list";
import TaskData from "../../interface/task-data";
import { Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TasksProvider, {
  useTasks,
} from "../../../../lib/provider/TasksProvider";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
interface TaskListProps {
  type: String;
  status?: String;
  setTaskShow(data: TaskData): void;
}
const TaskList = ({ type, status, setTaskShow }: TaskListProps) => {
  const [curTaskList, setCurTaskList] = useState<TaskData[]>();
  const { roomId } = useParams();
  const { tasks, getTasks, updateTask, updatingTask } = useTasks();
  useEffect(() => {
    getTasks({ room_id: roomId || "" });
  }, []);
  useEffect(() => {
    if (status) {
      setCurTaskList(
        tasks.filter((task) => {
          return task.status === status;
        })
      );
    } else {
      setCurTaskList(tasks);
    }
  }, [tasks]);
  function handleOnDragEnd(result: DropResult) {
    if (updatingTask) {
      return;
    }
    if (!result.destination) return;
    if (!curTaskList) return;
    const items = Array.from(curTaskList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCurTaskList(items);
  }
  return (
    <Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="tasks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {curTaskList?.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {type === "card" ? (
                          <Box style={{ marginBottom: 8 }}>
                            <TaskCard
                              mode="card"
                              task={task}
                              onClick={() => {
                                setTaskShow({ ...task });
                              }}
                            />
                          </Box>
                        ) : (
                          <TaskCard
                            mode="item"
                            task={task}
                            onClick={() => {
                              setTaskShow({ ...task });
                            }}
                          />
                        )}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default TaskList;
