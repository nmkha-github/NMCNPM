import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MembersPage from "./pages/RoomPage/[roomId]Page/MembersPage/MembersPage";
import NewsfeedPage from "./pages/RoomPage/[roomId]Page/NewsfeedPage/NewsfeedPage";
import SettingRoomPage from "./pages/RoomPage/[roomId]Page/SettingRoomPage/SettingRoomPage";
import StatisticPage from "./pages/RoomPage/[roomId]Page/StatisticPage/StatisticPage";
import WorkPage from "./pages/RoomPage/[roomId]Page/WorkPage/WorkPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        <Route path="room/:roomId" element={<NewsfeedPage />} />
        <Route path="room/:roomId/newsfeed" element={<NewsfeedPage />} />
        <Route path="room/:roomId/statistic" element={<StatisticPage />} />
        <Route path="room/:roomId/members" element={<MembersPage />} />
        <Route path="room/:roomId/work" element={<WorkPage />} />
        <Route path="room/:roomId/setting-room" element={<SettingRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
