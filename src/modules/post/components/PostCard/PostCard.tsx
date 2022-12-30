import React, { useState, useEffect } from "react";
import {
  Box,
  BoxProps,
  IconButton,
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
import ClearIcon from "@mui/icons-material/Clear";
import convertTimeToString from "../../../../lib/util/convert-time-to-string";
import { useParams } from "react-router-dom";
import PostData from "../../interface/post-data";
import PostCardMenu from "./PostCardMenu";
interface PostCardProps {
  post: PostData;
}
const PostCard = ({ post }: PostCardProps) => {
  const [user, setUser] = useState<undefined | UserData>(undefined);
  const { showSnackbarError } = useAppSnackbar();
  const { roomId } = useParams();
  const getUserData = async (id?: string) => {
    try {
      setUser(await UserHelper.getUserById(id || ""));
    } catch (error) {
      showSnackbarError(error);
    }
  };
  useEffect(() => {
    getUserData(post.creator_id);
  }, [getUserData]);
  if (!roomId) return null;
  return (
    <Box
      style={{
        padding: 8,
        border: "1px solid #D8DCF0",
        borderRadius: 8,
        marginTop: 16,
        display: "flex",
        maxWidth: 620,
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
          justifyContent:"space-between"
        }}
      >
        <Box style={{ display: "inline-flex", alignItems: "center" }}>
          <Avatar
            alt="avatar"
            src={user ? user.avatar : USER_AVATAR_DEFAULT}
            style={{ marginLeft: 8, marginRight: 8 }}
          />
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography style={{ fontWeight: 600 }}>
              {user ? user.name : ""}
            </Typography>
            <Typography
              style={{ fontWeight: 400, fontSize: "0.75rem", lineHeight: 1.66 }}
            >
              {convertTimeToString(post.created_at)}
            </Typography>
          </Box>
        </Box>
        <PostCardMenu post={post}/>
      </Box>
      <Typography style={{ margin: "4px 0px 4px 16px" }}>
        {post.content}
      </Typography>
      {post.image === "" ? (
        <></>
      ) : (
        <Box style={{ padding: 16, position: "relative" }}>
          <img
            src={post.image}
            style={{
              marginTop: 8,
              maxHeight: 320,
              minHeight: 120,
              width: "100%",
              objectFit: "cover",
              height: "auto",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostCard;
