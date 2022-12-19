/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/provider/AuthProvider";
import { useRooms } from "../../lib/provider/RoomsProvider";
import AddRoomButton from "../../modules/room/components/AddRoomButton/AddRoomButton";
import UploadFile from "../../lib/components/UploadFile/UploadFile";
<<<<<<< HEAD
import TaskCard from "../../modules/task/components/TaskCard/TaskCard";
import TaskData from "../../modules/task/interface/task-data";
import TaskDetailDialog from "../../modules/task/components/TaskDetailDialog/TaskDetailDialog";
import AssignMemberBox from "../../modules/task/components/AssignMemberBox/AssignMemberBox";
import MemberData from "../../modules/statistic/interface/member-data";
import UserData from "../../modules/user/interface/user-data";
=======
>>>>>>> 97325c5ae24af2c02894049b2c769bce15a2936b

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

  return (
    <div>
<<<<<<< HEAD
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
=======
>>>>>>> 97325c5ae24af2c02894049b2c769bce15a2936b
      <UploadFile
        onSuccess={(file) => {
          console.log(file.url);
          console.log(file.name);
        }}
      >
        <Button>ABC</Button>
      </UploadFile>
      <AddRoomButton />
    </div>
  );
};

export default HomePage;
