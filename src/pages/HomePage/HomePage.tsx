/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/provider/AuthProvider";
import { useRooms } from "../../lib/provider/RoomsProvider";
import AddRoomButton from "../../modules/room/components/AddRoomButton/AddRoomButton";
import UploadFile from "../../lib/components/UploadFile/UploadFile";
import TaskCard from "../../modules/task/components/TaskCard/TaskCard";
import TaskData from "../../modules/task/interface/task-data";
import TaskDetailDialog from "../../modules/task/components/TaskDetailDialog/TaskDetailDialog";
import AssignMemberBox from "../../modules/task/components/AssignMemberBox/AssignMemberBox";
import MemberData from "../../modules/statistic/interface/member-data";
import UserData from "../../modules/user/interface/user-data";
import BarChart from "../../lib/components/BarChart/BarChart";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dataName = false;

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/room");
  }, []);

  return (
    <div>
      <BarChart
        data={[
          { value: 10, title: "abc" },
          { value: 20, title: "cd" },
          { value: 17, title: "nưu asdfnkjasd ádfsad" },
        ]}
      />
      <AssignMemberBox
        task={{
          id: "WttA7CdT5Qvbg5XG0xei",
          order_value: "",
          title: "",
          assignee_id: "ujl8YpvL4ogSzkkroLsH",
          created_at: "",
          status: "toDo",
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
    </div>
  );
};

export default HomePage;
