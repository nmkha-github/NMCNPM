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
  import { useUser } from "../../../../lib/provider/UserProvider";
  import { useTasks } from "../../../../lib/provider/TasksProvider";
import { useParams } from "react-router-dom";
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
  
  const CreateTaskDialog = ({ ...dialogProps }: DialogProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {roomId}=useParams();
    const {createTask,creatingTask}=useTasks();
    const { logOut } = useAuth();
    const { user } = useUser();
  
    const classes = useStyle();
  
    if (!user) return null;
  
    return (
      <Dialog {...dialogProps}>
        <DialogTitle>Tạo công việc mới</DialogTitle>
  
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
            label="Tên công việc:"
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
            fullWidth
            variant="standard"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
  
        </DialogContent>
  
        <DialogActions>
          <Button
            onClick={() => {
              dialogProps.onClose?.({}, "backdropClick");
              setName("");
              setDescription("");
            }}
            style={{ padding: 8 }}
          >
            HỦY
          </Button>
  
          <LoadingButton
            onClick={async () => {
                await createTask({room_id:roomId?roomId:"",new_task:{title:name,content:description,assignee_id:user.id}});
                dialogProps.onClose?.({}, "backdropClick");
                setName("");
                setDescription("");
            }}
            variant="contained"
            color="primary"
            loading={creatingTask}
            style={{ padding: 8 }}
            disabled={name === "" || creatingTask}
          >
            TẠO
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CreateTaskDialog;
  