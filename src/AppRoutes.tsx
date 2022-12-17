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
import StatisticPage from "./pages/RoomPage/[roomId]Page/StatisticPage/StatisticPage";
import WorkPage from "./pages/RoomPage/[roomId]Page/WorkPage/WorkPage";

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
      <Route path="room/:roomId/statistic" element={<StatisticPage />} />
      <Route path="room/:roomId/member" element={<MembersPage />} />
      <Route path="room/:roomId/member/:memberId" element={<MembersPage />} />
      <Route path="room/:roomId/work" element={<WorkPage />} />
      <Route path="room/:roomId/setting-room" element={<SettingRoomPage />} />
    </Routes>
  );
};

export default AppRoutes;
