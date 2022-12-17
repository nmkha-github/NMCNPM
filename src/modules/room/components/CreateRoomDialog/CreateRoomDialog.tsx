import {
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
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "../../../../lib/components/LoadingButton/LoadingButton";
import { useAuth } from "../../../../lib/provider/AuthProvider";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useUser } from "../../../../lib/provider/UserProvider";
import ROOM_AVATAR_DEFAULT from "../../constants/room-avatar-default";

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

const CreateRoomDialog = ({ ...dialogProps }: DialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [agree, setAgree] = useState(false);

  const { createRoom, creatingRoom } = useRooms();
  const { logOut } = useAuth();
  const { user } = useUser();

  const classes = useStyle();

  if (!user) return null;

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Tạo phòng mới</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Bạn đang đăng nhập bằng tài khoản:
        </DialogContentText>

        <Box className={classes.container}>
          <img src={user.avatar} alt="avatar" className={classes.image} />

          <Box className={classes.userName}>{user.name}</Box>

          <Button variant="outlined" onClick={async () => await logOut()}>
            Chuyển tài khoản
          </Button>
        </Box>

        <TextField
          autoFocus
          label="Tên phòng:"
          required
          fullWidth
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <TextField
          label="Mô tả:"
          margin="dense"
          multiline
          maxRows={5}
          rows={2}
          fullWidth
          variant="standard"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <TextField
          autoFocus
          label="URL hình ảnh"
          type="text"
          variant="standard"
          fullWidth
          inputProps={{ maxLength: 12 }}
          onChange={(event) => {
            setImageURL(event.target.value);
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
          style={{ padding: 8 }}
        >
          HỦY
        </Button>

        <LoadingButton
          onClick={async () => {
            await createRoom({
              avatar: imageURL || ROOM_AVATAR_DEFAULT,
              name: name,
              description: description,
            });
            dialogProps.onClose?.({}, "backdropClick");
          }}
          variant="contained"
          color="primary"
          loading={creatingRoom}
          style={{ padding: 8 }}
          disabled={name === "" || !agree || creatingRoom}
        >
          TẠO
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomDialog;
