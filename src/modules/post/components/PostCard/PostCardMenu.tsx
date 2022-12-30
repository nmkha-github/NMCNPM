import React from "react";
import { Box, IconButton, Typography, ListItemIcon, Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { BiEdit, BiTrash } from "react-icons/bi";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTasks } from "../../../../lib/provider/TasksProvider";
import PostData from "../../interface/post-data";
import { usePosts } from "../../../../lib/provider/PostsProvider";

const PostCardMenu = ({ post }: { post: PostData}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { roomId } = useParams();
  const { deletePost, deletingPost,setCurrentPost} = usePosts();
  return (
    <Box >
      <IconButton
        type="button"
        onClick={(event) => {
          if (event.target !== event.currentTarget) {
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
          }
        }}
        style={{
          color: "black",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <MenuItem
          style={{ display: "flex", padding: 8 }}
          onClick={() => {
            setCurrentPost({...post});
          }}
        >
          <ListItemIcon>
            <BiEdit fontSize="large" />{" "}
          </ListItemIcon>
          <Typography variant="inherit" noWrap width="18ch">
            Chỉnh sửa bài đăng
          </Typography>
        </MenuItem>

        {deletingPost ? (
          <CircularProgress />
        ) : (
          <MenuItem
            style={{ display: "flex", padding: 8 }}
            onClick={async () => {
              await deletePost({
                room_id: roomId ? roomId : "",
                id: post.id,
              });
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              {" "}
              <BiTrash fontSize="large" />{" "}
            </ListItemIcon>
            <Typography variant="inherit" noWrap width="18ch">
              Xóa bài đăng
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default PostCardMenu;
