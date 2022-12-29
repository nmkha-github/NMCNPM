import React, { useState, useEffect } from "react";
import {
  Box,
  BoxProps,
  Avatar,
  TextField,
  InputBase,
  Button,
} from "@mui/material";
import TaskData from "../../../task/interface/task-data";
import { Typography } from "@material-ui/core";
import UserHelper from "../../../user/util/user-helper";
import UserData from "../../../user/interface/user-data";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import USER_AVATAR_DEFAULT from "../../../user/contants/user-avatar-default";
import { usePosts } from "../../../../lib/provider/PostsProvider";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useUser } from "../../../../lib/provider/UserProvider";
import LoadingButton from "../../../../lib/components/LoadingButton/LoadingButton";
import UploadFile from "../../../../lib/components/UploadFile/UploadFile";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import { useParams } from "react-router-dom";
const CreatePostCard = () => {
  const emptyPost = {
    content: "",
    image: "",
  };
  const { user } = useUser();
  const { showSnackbarError } = useAppSnackbar();
  const [hasImage, setHasImage] = useState(false);
  const { createPost, creatingPost } = usePosts();
  const [currentPost, setCurrentPost] = useState({ ...emptyPost });
  const { roomId } = useParams();
  if (!user || !roomId) return null;
  return (
    <Box
      style={{
        maxWidth: 620,
        padding: 8,
        border: "1px solid #D8DCF0",
        borderRadius: 8,
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Box
        style={{
          display: "flex",
          maxWidth: "true",
          padding: 16,
          maxHeight: 83,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar alt="avatar" src={user.avatar} style={{ marginLeft: 8 }} />
        <TextField
          fullWidth
          multiline
          onChange={(event) => {
            setCurrentPost({ ...currentPost, content: event.target.value });
          }}
          value={currentPost.content}
          InputProps={{ disableUnderline: true }}
          sx={{
            border: "none",
            outline: "none",
            "& fieldset": { border: "none" },
          }}
          maxRows={"3"}
          placeholder={"Nhập nội dung thảo luận..."}
        />
      </Box>
      {currentPost.image === "" ? (
        <></>
      ) : (
        <img
          src={currentPost.image}
          style={{
            marginTop: 8,
            maxHeight: 320,
            minHeight: 120,
            width: "100%",
            padding: 16,
            objectFit: "cover",
            height: "auto",
          }}
        />
      )}
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderTop: "1px solid rgb(216, 220, 240)",
          alignItems: "center",
          padding: 16,
        }}
      >
        <UploadFile
          onSuccess={async (file) => {
            setCurrentPost({ ...currentPost, image: file.url });
          }}
        >
          <Button variant="outlined" style={{ padding: 8 }}>
            <h1>
              <FileUploadSharpIcon />
              Thêm ảnh
            </h1>
            <input type="file" hidden />
          </Button>
        </UploadFile>
        <LoadingButton
          loading={creatingPost}
          disabled={currentPost.content === "" || creatingPost}
          variant="contained"
          style={{
            padding: 8,
            marginLeft: 12,
            paddingRight: 16,
            paddingLeft: 16,
          }}
          onClick={async () => {
            await createPost({
              room_id: roomId,
              new_post: {
                ...currentPost,
              },
            });
            setCurrentPost({...emptyPost});
          }}
        >
          Đăng tin
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CreatePostCard;
