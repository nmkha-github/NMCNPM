import TaskListData from "../../interface/task-list";
import TaskData from "../../interface/task-data";
import { Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
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
  type: string;
  curTaskList: TaskData[];
  status?: string;
  isDragging:string;
  setTaskShow(data: TaskData): void;
}
const TaskList = ({ type, status, setTaskShow,curTaskList,isDragging }: TaskListProps) => {
  const [isDraggingOver,setIsDraggingOver]=useState(false);
  return (
    <Box style={{ height: "auto" }}>
        <Droppable droppableId={status?status:"tasks"}>
          {(provided,snapshot) => (
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
                              isDragging={isDragging}
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
                            isDragging={isDragging}
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
    </Box>
  );
};

export default TaskList;
