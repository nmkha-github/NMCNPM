import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./SettingRoomPage.css";
import { Container, Switch } from "@mui/material";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import AddIcon from "@mui/icons-material/Add";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import RoomData from "../../../../modules/room/interface/room-data";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { CircularProgress } from "@material-ui/core";
import LoadingButton from "../../../../lib/components/LoadingButton/LoadingButton";

const SettingRoomPage = () => {
  const navigate = useNavigate();
  const [roomEditData, setRoomEditData] = useState<RoomData>({
    id: "",
    name: "",
    avatar: "",
    created_at: "",
  });
  const { roomId } = useParams();
  const { showSnackbarError } = useAppSnackbar();
  const {
    currentRoom,
    getCurrentRoom,
    updateRoom,
    loadingCurrentRoom,
    updatingRoom,
  } = useRooms();

  useEffect(() => {
    getCurrentRoom(roomId || "");
  }, [getCurrentRoom, roomId]);

  useEffect(() => {
    if (currentRoom) {
      setRoomEditData({ ...currentRoom });
    }
  }, [currentRoom]);

  return (
    <Box>
      <button
        onClick={() => {
          navigate("/room/" + roomId + "/newsfeed");
        }}
        className="back_to_workspace"
      >
        <ArrowBackSharpIcon /> Back to workspace
      </button>
      {loadingCurrentRoom && (
        <CircularProgress
          style={{ bottom: "50%", right: "50%", position: "absolute" }}
          size="60px"
          color="inherit"
        />
      )}

      {!loadingCurrentRoom && (
        <Container
          maxWidth="sm"
          style={{
            border: "1px solid",
            marginTop: "1.25rem",
            marginBottom: "3rem",
            paddingBottom: "2.25rem",
            borderRadius: 8,
          }}
        >
          <h2>Cài đặt</h2>
          <Box className="setting_row">
            <Box className="setting_name">
              <AddIcon fontSize="medium" />
              <Box className="setting_description">
                <h3>Tên phòng ban</h3>
              </Box>
            </Box>
          </Box>

          <TextField
            className="room_name"
            type="text"
            onChange={(event) => {
              setRoomEditData({
                ...roomEditData,
                name: event.target.value,
              });
            }}
            fullWidth
            value={roomEditData.name}
          />
          <Box className="setting_row">
            <Box className="setting_name">
              <AddIcon fontSize="medium" />
              <Box className="setting_description">
                <h3>Mô tả</h3>
              </Box>
            </Box>
          </Box>

          <TextField
            className="room_name"
            type="text"
            onChange={(event) => {
              setRoomEditData({
                ...roomEditData,
                description: event.target.value,
              });
            }}
            fullWidth
            value={roomEditData ? roomEditData.description : ""}
          />
          <Box className="setting_row">
            <Box className="setting_name">
              <AddIcon fontSize="medium" />
              <Box className="setting_description">
                <h3>Khóa phòng ban</h3>
              </Box>
            </Box>
            <Switch
              checked={roomEditData.locked}
              onChange={(event) => {
                setRoomEditData({
                  ...roomEditData,
                  locked: event.target.checked,
                });
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
              checked={roomEditData.auto_accepted}
              onChange={(event) => {
                setRoomEditData({
                  ...roomEditData,
                  auto_accepted: event.target.checked,
                });
              }}
            />
          </Box>

          <h5>
            Tránh tình trạng những nhân viên không có quyền vào phòng tham gia
            vào mà không có sự cho phép của quản lý
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
              checked={roomEditData.disabled_newsfeed}
              onChange={(event) => {
                setRoomEditData({
                  ...roomEditData,
                  disabled_newsfeed: event.target.checked,
                });
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
              checked={roomEditData.exit_locked}
              onChange={(event) => {
                setRoomEditData({
                  ...roomEditData,
                  exit_locked: event.target.checked,
                });
              }}
            />
          </Box>

          <h5>
            Giúp dễ dàng quản lý nhân viên tốt hơn, tránh nhân viên tự ý thoát
            khỏi phòng
          </h5>

          <Button variant="outlined" className="avatar_change">
            <img className="image" />
            <h1 className="change_image">
              <FileUploadSharpIcon sx={{ fontSize: 40 }} />
              Chọn file để đổi ảnh
            </h1>
            <input type="file" hidden />
          </Button>
          <Box
            className="df"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              style={{ margin: "0.625rem" }}
              onClick={() => {
                setRoomEditData({ ...currentRoom });
              }}
            >
              Hủy thay đổi
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              disabled={updatingRoom}
              loading={updatingRoom}
              style={{ margin: "0.625rem" }}
              onClick={async () => {
                try {
                  await updateRoom({
                    id: roomId || "",
                    updateData: roomEditData,
                  });
                } catch (error) {
                  showSnackbarError(error);
                }
              }}
            >
              Lưu lại
            </LoadingButton>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default SettingRoomPage;
