import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../../../lib/provider/AuthProvider";

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
}));

const CreateRoomDialog = (dialogProps: DialogProps) => {
  const [room, setRoom] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState("");
  const [agree, setAgree] = useState(false);

  const { logOut } = useAuth();

  const classes = useStyle();

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Tạo phòng mới</DialogTitle>

      <form
        onSubmit={async (event) => {
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
            label="Tên phòng:"
            type="text"
            required
            fullWidth
            variant="standard"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Tên công ty:"
            type="text"
            required
            fullWidth
            variant="standard"
            onChange={(event) => {
              setCompany(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Chủ đề:"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          />

          <TextField
            label="Mô tả:"
            margin="dense"
            multiline
            maxRows={5}
            rows={2}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <TextField
            autoFocus
            label="Từ khóa"
            type="text"
            required
            helperText="Từ khóa có độ dài không vượt quá 12 kí tự"
            variant="standard"
            inputProps={{ maxLength: 12 }}
            onChange={(event) => {
              setKey(event.target.value);
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                required
                onClick={() => {
                  setAgree(!agree);
                }}
              />
            }
            label="Tôi đồng ý với các điều khoản dịch vụ."
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              dialogProps.onClose?.({}, "backdropClick");
            }}
          >
            HỦY
          </Button>

          <Button
            type="submit"
            onClick={() => {}}
            variant={
              room === "" || company === "" || key === "" || !agree
                ? "outlined"
                : "contained"
            }
          >
            TẠO
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateRoomDialog;
