import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  TextField,
  Button,
  InputBase,
  ListItem,
  Typography,
} from "@mui/material";
import { usePosts } from "../../../../lib/provider/PostsProvider";
import { useUser } from "../../../../lib/provider/UserProvider";
import LoadingButton from "../../../../lib/components/LoadingButton/LoadingButton";
import UploadFile from "../../../../lib/components/UploadFile/UploadFile";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";
import PostData from "../../interface/post-data";
import CommentData from "../../../../lib/interface/comment-data";
import UserData from "../../../user/interface/user-data";
import UserHelper from "../../../user/util/user-helper";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import USER_AVATAR_DEFAULT from "../../../user/contants/user-avatar-default";
import convertTimeToString from "../../../../lib/util/convert-time-to-string";
import CommentMenu from "./CommentMenu";
import { usePostComments } from "../../../../lib/provider/PostCommentsProvider";

const Comment = ({
  comment,
  post,
}: {
  comment: CommentData;
  post: PostData;
}) => {
  const { user } = useUser();
  const [commentUser, setCommentUser] = useState<undefined | UserData>(
    undefined
  );
  const { roomId } = useParams();
  const { showSnackbarError } = useAppSnackbar();
  const { createPostComment, creatingPostComment } = usePostComments();
  const getUserData = async (id?: string) => {
    try {
      setCommentUser(await UserHelper.getUserById(id || ""));
    } catch (error) {
      showSnackbarError(error);
    }
  };

  useEffect(() => {
    getUserData(comment.creator_id);
  }, [comment]);
  if (!user) return null;
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 8,
        marginLeft: 8,
      }}
    >
      <Avatar
        alt="avatar"
        src={commentUser ? commentUser.avatar : USER_AVATAR_DEFAULT}
        style={{ marginRight: 8, width: 36, height: 36 }}
      />
      <Box
        style={{
          display: "flex",
          padding: 12,
          flexDirection: "column",
          margin: 4,
          width: "fit-content",
          maxWidth: "calc(100% - 96px)",
          background: "rgb(239, 239, 245)",
        }}
      >
        <Box style={{ display: "flex", width: "fit-content" }}>
          <Typography
            style={{ fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.43 }}
          >
            {commentUser ? commentUser.name + " -" : ""}
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              lineHeight: 1.43,
              marginLeft: 4,
              color: "rgb(101, 105, 123)",
            }}
          >
            {convertTimeToString(comment.created_at).replace("trước", "")}
          </Typography>
        </Box>
        <Typography
          style={{
            width: "fit-content",
            fontSize: "1rem",
            fontWeight: 400,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {comment.content}
        </Typography>
      </Box>
      {user.id !== comment.creator_id ? (
        <></>
      ) : (
        <CommentMenu comment={comment} post={post} />
      )}
    </Box>
  );
};
export default Comment;
