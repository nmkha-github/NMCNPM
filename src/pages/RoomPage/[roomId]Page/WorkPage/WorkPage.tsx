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
    <Box style={{ display: "flex" }}>
      <LeftSideBar />
      <TaskDetailDialog
        task={taskShow}
        open={!!taskShow}
        onClose={() => setTaskShow(undefined)}
      />
      <Box style={{flexGrow:"1",display:"flex",justifyContent:"center"}}>
        <Box
          style={{
            display: "flex",
            marginTop: 16,
            marginLeft: 8,
          }}
        >
          <Box
            style={{
              width: 300,
              background: "#f1f3f9",
              display: "flex",
              flexWrap:"wrap",
              marginRight: 12,
              flexDirection: "column",
              alignItems: "center",
              justifyContent:"flex-start"
            }}
          >
            <Typography
              style={{
                marginTop:8,
                fontSize: 18,
                textDecoration: "underline",
                marginBottom: 12,
              }}
            >
              TO DO
            </Typography>
            <TaskList status={"TODO"} type={"card"} setTaskShow={setTaskShow} />
          </Box>
          <Box
            style={{
              width: 300,
              height:"100%",
              background: "#f1f3f9",
              display: "flex",
              marginRight: 12,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                marginTop:8,
                fontSize: 18,
                textDecoration: "underline",
                marginBottom: 12,
              }}
            >
              DOING
            </Typography>
            <TaskList
              status={"DOING"}
              type={"card"}
              setTaskShow={setTaskShow}
            />
          </Box>
          <Box
            style={{
              width: 300,
              background: "#f1f3f9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                marginTop:8,
                fontSize: 18,
                textDecoration: "underline",
                marginBottom: 12,
              }}
            >
              DONE
            </Typography>
            <TaskList status={"DONE"} type={"card"} setTaskShow={setTaskShow} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkPage;
