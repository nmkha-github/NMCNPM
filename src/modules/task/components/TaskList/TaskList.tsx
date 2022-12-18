import TaskListData from "../../interface/task-list";
import TaskData from "../../interface/task-data";
import { Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
interface TaskListProps {
  taskList: TaskListData;
}
const TaskList = ({ taskList }: TaskListProps) => {
  const [curTaskList, setCurTaskList] = useState<TaskData[]>();
  useEffect(() => {
    setCurTaskList(taskList.taskList);
  }, [taskList]);
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (!curTaskList) return;
    const items = Array.from(curTaskList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCurTaskList(items);
  }
  return (
    <div>
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
                        {<TaskCard mode="item" task={task} />}
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
    </div>
  );
};

export default TaskList;
