import React, { useEffect, useState } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";
import TaskData from "../../../../modules/task/interface/task-data";
import TaskCard from "../../../../modules/task/components/TaskCard/TaskCard";
import TaskDetailDialog from "../../../../modules/task/components/TaskDetailDialog/TaskDetailDialog";

const WorkPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();

  const task = {
    id: "WttA7CdT5Qvbg5XG0xei",
    title: "task title",
    status: "TODO",
    assignee_id: "ujl8YpvL4ogSzkkroLsH",
    creator_id: "ujl8YpvL4ogSzkkroLsH",
    created_at: "12:00",
  };

  const [taskShow, setTaskShow] = useState<TaskData>();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  return (
    <div>
      {/* <LeftSideBar /> */}
      <TaskCard
        task={task}
        mode="card"
        onClick={() => {
          setTaskShow({ ...task });
        }}
      />

      <TaskDetailDialog
        task={taskShow}
        open={!!taskShow}
        onClose={() => setTaskShow(undefined)}
      />
    </div>
  );
};

export default WorkPage;
