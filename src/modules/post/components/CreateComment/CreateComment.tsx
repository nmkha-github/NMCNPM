import React, { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  TextField,
  Button,
  InputBase,
} from "@mui/material";
import { usePosts } from "../../../../lib/provider/PostsProvider";
import { useUser } from "../../../../lib/provider/UserProvider";
import LoadingButton from "../../../../lib/components/LoadingButton/LoadingButton";
import UploadFile from "../../../../lib/components/UploadFile/UploadFile";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";
import PostData from "../../interface/post-data";
import { usePostComments } from "../../provider/PostCommentsProvider";
import { async } from "@firebase/util";
const CreateComment = ({ post }: { post: PostData }) => {
  const { user } = useUser();
  const { roomId } = useParams();
  const [comment, setComment] = useState("");
  const { createPostComment, creatingPostComment } = usePostComments();
  if (!user) {
    return null;
  }
  return (
    <Box style={{ display: "flex", alignItems: "center", marginLeft: 8 }}>
      <Avatar
        alt="avatar"
        src={user.avatar}
        style={{ marginRight: 8, width: 36, height: 36 }}
      />
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          height: 40,
          fontSize: "1rem",
          fontWeight: 400,
          "*:focus": {
            boxShadow: "none",
            WebkitBoxShadow: "none",
          },
        }}
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
        placeholder={"Nhập bình luận..."}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            if (!creatingPostComment && comment.length > 0) {
              await createPostComment({
                room_id: roomId || "",
                post_id: post.id,
                new_post: { content: comment },
              });
              setComment("");
            }
            event.preventDefault();
          }
        }}
      />
    </Box>
  );
};
export default CreateComment;
