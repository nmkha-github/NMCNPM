/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/provider/AuthProvider";
import { useRooms } from "../../lib/provider/RoomsProvider";
import { useUser } from "../../lib/provider/UserProvider";
import AddRoomButton from "../../modules/room/components/AddRoomButton/AddRoomButton";
import RoomItem from "../../modules/room/components/RoomItem/RoomItem";
import RoomPage from "../RoomPage/RoomPage";
import UploadFile from "../../lib/components/UploadFile/UploadFile";
import TaskCard from "../../modules/task/components/TaskCard/TaskCard";
import TaskData from "../../modules/task/interface/task-data";
import TaskDetailDialog from "../../modules/task/components/TaskDetailDialog/TaskDetailDialog";
import AssignMemberBox from "../../modules/task/components/AssignMemberBox/AssignMemberBox";
import MemberData from "../../modules/statistic/interface/member-data";
import UserData from "../../modules/user/interface/user-data";

const HomePage = () => {
  const dataName = false;

  const { logOut } = useAuth();
  const { rooms, getRooms } = useRooms();
  useEffect(() => {
    getRooms({ getStart: 0 });
  }, []);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  const task = {
    id: "taskid",
    title: "task title",
    status: "todo",
    assignee_id: "undefined",
    creator_id: "a51234",
    created_at: "0000",
  };

  const [taskShow, setTaskShow] = useState<TaskData>();

  return (
    <div>
      <TaskCard
        task={task}
        mode="card"
        onClick={() => {
          setTaskShow({ ...task });
        }}
      />
      <AssignMemberBox
        task={{
          id: "WttA7CdT5Qvbg5XG0xei",
          title: "",
          assignee_id: "ujl8YpvL4ogSzkkroLsH",
          created_at: "",
          status: "",
          creator_id: "",
        }}
        onChoose={(member) => {}}
      />
      <UploadFile
        onSuccess={(file) => {
          console.log(file.url);
          console.log(file.name);
        }}
      >
        <Button>ABC</Button>
      </UploadFile>
      <AddRoomButton />

      <TaskDetailDialog
        task={taskShow}
        open={!!taskShow}
        onClose={() => setTaskShow(undefined)}
      />
    </div>
  );
};

export default HomePage;
