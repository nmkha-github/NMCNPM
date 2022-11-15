import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorkPage from "./pages/WorkPage/WorkPage";
import RoomPage from "./pages/RoomPage/RoomPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="room" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
