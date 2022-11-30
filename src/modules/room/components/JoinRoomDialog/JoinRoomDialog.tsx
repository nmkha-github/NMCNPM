import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../../../lib/provider/AuthProvider";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import SendIcon from "@mui/icons-material/Send";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  image: {
    width: "40px",
    height: "40px",
    borderRadius: "100%",
    marginRight: "8px",
    padding: "2px",
    border: "solid 1px #1876f2",
  },
  userName: {
    flexGrow: 2,
  },
  helpTitle: {
    marginTop: "16px",
  },
  helpText: {
    color: "#999",
    fontSize: "12px",
  },
}));

const JoinRoomDialog = (dialogProps: DialogProps) => {
  const [collapse, setCollapse] = useState(false);
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");

  const { joinRoom, joiningRoom } = useRooms();
  const { logOut } = useAuth();

  const classes = useStyle();

  return (
    <Box>
      <Dialog {...dialogProps}>
        <DialogTitle>Tham gia phòng</DialogTitle>

        <form
          onSubmit={async (event) => {
            await joinRoom({ id: id });
            event.preventDefault();
          }}
        >
          <DialogContent>
            <DialogContentText>
              Bạn đang đăng nhập bằng tài khoản:
            </DialogContentText>

            <Box className={classes.container}>
              <img
                src="https://img6.thuthuatphanmem.vn/uploads/2022/02/13/hinh-anh-lop-hoc-dep-nhat_011959587.jpg"
                alt="avatar"
                className={classes.image}
              />
              <Box className={classes.userName}>User name</Box>

              <Button variant="outlined" onClick={async () => await logOut()}>
                Chuyển tài khoản
              </Button>
            </Box>

            <TextField
              autoFocus
              margin="dense"
              label="Mã phòng:"
              type="text"
              required
              helperText="Mã phòng gồm 6-8 kí tự 0-9, a-z, A-Z"
              variant="standard"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <TextField
              label="Lời nhắn:"
              multiline
              maxRows={5}
              rows={2}
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setMsg(event.target.value);
              }}
            />

            <Typography
              onClick={() => setCollapse(!collapse)}
              className={classes.helpTitle}
            >
              Hướng dẫn
            </Typography>

            <Collapse in={collapse}>
              <Typography className={classes.helpText}>
                Nếu chưa có mã phòng, hãy liên hệ trưởng phòng của bạn
              </Typography>

              <Typography className={classes.helpText}>
                Hãy dùng tài khoản hợp lệ để tham gia vào phòng
              </Typography>

              <Typography className={classes.helpText}>
                Hãy để lại lời nhắn để người duyệt có thể dễ dàng nhận ra bạn
              </Typography>

              <Typography className={classes.helpText}>
                Sau khi bạn điền đầy đủ thông tin và nhấn nút <b>Tham gia</b>,
                bạn sẽ được đưa vào danh sách chờ và sẽ được vào phòng sau khi
                trưởng phòng kiểm duyệt và đồng ý.
              </Typography>
            </Collapse>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                dialogProps.onClose?.({}, "backdropClick");
              }}
            >
              <Typography>HỦY</Typography>
            </Button>

            <Button
              type="submit"
              variant={id === "" || joiningRoom ? "outlined" : "contained"}
            >
              <Typography>THAM GIA</Typography>
              {joiningRoom ? <CircularProgress /> : <SendIcon />}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default JoinRoomDialog;
