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
import { useState } from "react";
import CommentData from "../../../../lib/interface/comment-data";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { usePostComments } from "../../../../lib/provider/PostCommentsProvider";

const CommentMenu = ({
  comment,
  post,
}: {
  comment: CommentData;
  post: PostData;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const { roomId } = useParams();
  const {} = usePostComments();
  return (
    <Box
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ width: 36, height: 36 }}
    >
      {isHovering && (
        <Box>
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
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
          >
            {/* {deletingComment ? ( */}
            {false ? (
              <CircularProgress />
            ) : (
              <MenuItem
                style={{ display: "flex", padding: 8 }}
                onClick={async () => {
                  // await deleteComment({
                  //   room_id: roomId ? roomId : "",
                  //   post_id: post.id,
                  //   id: comment.id,
                  // });
                  setAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  {" "}
                  <BiTrash fontSize="large" />{" "}
                </ListItemIcon>
                <Typography variant="inherit" noWrap width="18ch">
                  Xóa bình luận
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default CommentMenu;
