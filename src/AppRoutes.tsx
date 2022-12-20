import { Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "./pages/HomePage/HomePage";
import SettingPage from "./pages/SettingPage/SettingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import MembersPage from "./pages/RoomPage/[roomId]Page/MembersPage/MembersPage";
import NewsfeedPage from "./pages/RoomPage/[roomId]Page/NewsfeedPage/NewsfeedPage";
import SettingRoomPage from "./pages/RoomPage/[roomId]Page/SettingRoomPage/SettingRoomPage";
import WorkPage from "./pages/RoomPage/[roomId]Page/WorkPage/WorkPage";
import MemberPage from "./pages/RoomPage/[roomId]Page/MembersPage/[memberId]Page/MemberPage";
import TaskListData from "./modules/task/interface/task-list";
import TaskList from "./modules/task/components/TaskList/TaskList";

const testTaskList: TaskListData={
  id:"1234",
  taskList:[
    {
      id:"sadasczxczx123",
      title:"hello1",
      status:"done",
      assignee_id:"cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123"
    },
    {
      id:"asdasdqwe1234",
      title:"hell2o",
      status:"done",
      assignee_id:"cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123"
    },
    {
      id:"zxczxczczxc23",
      title:"hell3o",
      status:"done",
      assignee_id:"cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123"
    },
    {
      id:"sadasdasd22",
      title:"hell4o",
      status:"done",
      assignee_id:"cOKYlFxtfScaugwh0h34",
      creator_id: "cOKYlFxtfScaugwh0h34",
      created_at: "123"
    }
  ]
}
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="setting" element={<SettingPage />} />

      <Route path="room" element={<RoomPage />} />
      <Route path="room/:roomId" element={<NewsfeedPage />} />
      <Route path="room/:roomId/newsfeed" element={<NewsfeedPage />} />
      <Route path="room/:roomId/statistic" element={<MembersPage />} />
      <Route path="room/:roomId/member" element={<MembersPage />} />
      <Route path="room/:roomId/member/:memberId" element={<MemberPage />} />
      <Route path="room/:roomId/work" element={<WorkPage />} />
      <Route path="room/:roomId/setting-room" element={<SettingRoomPage />} />
    </Routes>
  );
};

export default AppRoutes;
