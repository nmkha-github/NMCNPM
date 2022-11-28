import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, ButtonBase } from "@mui/material";
import "./SettingRoomPage.css";
import { Container, Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import RoomData from "../../../../modules/room/interface/room-data";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
const backToWorkspace = () => {
  var newPath = window.location.pathname.split("/").slice(0, 3).join("/");
  window.location.pathname = newPath;
};
const SettingRoomPage = () => {
  const { currentRoom, setCurrentRoom } = useRooms();
  const [roomEditData, setRoomEditData] = useState<RoomData>({
    id: "",
    name: "",
    avatar: "",
    created_at: "",
  });
  useEffect(() => {
    setCurrentRoom({
      id: "abc",
      name: "room name",
      avatar: "hello",
      created_at: "ok",
      auto_accepted: true,
      locked: false,
      disabled_newsfeed: true,
      exit_locked: false,
    });
  }, []);
  useEffect(() => {
    if (currentRoom != undefined) {
      setRoomEditData(currentRoom);
    }
  }, [currentRoom]);
  return (
    <Box>
      <button onClick={backToWorkspace} id="back_to_workspace">
        <ArrowBackSharpIcon /> Back to workspace
      </button>
      <Container maxWidth="sm">
        <h2 id="setting_main">Cài đặt</h2>
        <Box className="setting_row">
          <Box className="setting_name">
            <AddIcon fontSize="medium" />
            <Box className="setting_description">
              <h3>Tên phòng ban</h3>
            </Box>
          </Box>
        </Box>
        <TextField
          id="room_name"
          type="text"
          onChange={(event) => {
            var updatedName = { name: event.target.value };
            setRoomEditData((roomEditData) => ({
              ...roomEditData,
              ...updatedName,
            }));
          }}
          fullWidth
          value={roomEditData == null ? "Undefined" : roomEditData.name}
        />
        <Box className="setting_row">
          <Box className="setting_name">
            <AddIcon fontSize="medium" />
            <Box className="setting_description">
              <h3>Khóa phòng ban</h3>
            </Box>
          </Box>
          <Switch
            checked={roomEditData == null ? false : roomEditData.locked}
            onChange={(event) => {
              var updated_value = { locked: event.target.checked };
              setRoomEditData((roomEditData) => ({
                ...roomEditData,
                ...updated_value,
              }));
            }}
          />
        </Box>
        <Box className="setting_row">
          <Box className="setting_name">
            <AddIcon fontSize="medium" className="add_icon" />
            <Box className="setting_description">
              <h3>Phê duyệt nhân viên</h3>
            </Box>
          </Box>
          <Switch
            checked={roomEditData == null ? false : roomEditData.auto_accepted}
            onChange={(event) => {
              var updated_value = { auto_accepted: event.target.checked };
              setRoomEditData((roomEditData) => ({
                ...roomEditData,
                ...updated_value,
              }));
            }}
          />
        </Box>
        <h5>
          Tránh tình trạng những nhân viên không có quyền vào phòng tham gia vào
          mà không có sự cho phép của quản lý
        </h5>
        <Box className="setting_row">
          <Box className="setting_name">
            <AddIcon fontSize="medium" />
            <Box className="setting_description">
              <h3>Tắt hoạt động bảng tin</h3>
            </Box>
          </Box>
          <Switch
            size="medium"
            checked={
              roomEditData == null ? false : roomEditData.disabled_newsfeed
            }
            onChange={(event) => {
              var updated_value = { disabled_newsfeed: event.target.checked };
              setRoomEditData((roomEditData) => ({
                ...roomEditData,
                ...updated_value,
              }));
            }}
          />
        </Box>
        <h5>Tắt mọi hoạt động đăng bài và bình luận</h5>
        <Box className="setting_row">
          <Box className="setting_name">
            <AddIcon fontSize="medium" />
            <Box className="setting_description">
              <h3>Chặn nhân viên tự ý rời phòng ban</h3>
            </Box>
          </Box>
          <Switch
            size="medium"
            checked={roomEditData == null ? false : roomEditData.exit_locked}
            onChange={(event) => {
              var updated_value = { exit_locked: event.target.checked };
              setRoomEditData((roomEditData) => ({
                ...roomEditData,
                ...updated_value,
              }));
            }}
          />
        </Box>
        <h5>
          Giúp dễ dàng quản lý nhân viên tốt hơn, tránh nhân viên tự ý thoát
          khỏi phòng
        </h5>
        <Button variant="outlined" id="avatar_change">
          <img className="image" src="" />
          <h1 id="change_image">
            <FileUploadSharpIcon sx={{ fontSize: 40 }} />
            Chọn file để đổi ảnh
          </h1>
          <input type="file" hidden />
        </Button>
      </Container>
    </Box>
  );
};

export default SettingRoomPage;
