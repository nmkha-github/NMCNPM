import React, { useEffect } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";
import { Box } from "@material-ui/core";
import TaskList from "../../../../modules/task/components/TaskList/TaskList";
import TaskListData from "../../../../modules/task/interface/task-list";
const testTaskList: TaskListData = {
  id: "1234",
  taskList: [
    {
      id: "sadasczxczx123",
      title: "hello1",
      status: "done",
      assignee_id: "cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123",
    },
    {
      id: "asdasdqwe1234",
      title: "hell2o",
      status: "done",
      assignee_id: "cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123",
    },
    {
      id: "zxczxczczxc23",
      title: "hell3o",
      status: "done",
      assignee_id: "cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123",
    },
    {
      id: "sadasdasd22",
      title: "hell4o",
      status: "done",
      assignee_id: "cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123",
    },
  ],
};
const WorkPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, []);

  return (
    <Box style={{ display: "flex" }}>
      <Box>
        <LeftSideBar />
      </Box>
      <Box sx={{ flexGrow: "1", marginLeft: 8, marginRight: 40 }}>
      </Box>
    </Box>
  );
};

export default WorkPage;
