import { useEffect } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";
import PostCard from "../../../../modules/post/components/PostCard/PostCard";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { usePosts } from "../../../../lib/provider/PostsProvider";
import EditPostDialog from "../../../../modules/post/components/EditPostDialog/EditPostDialog";
import CreatePostCard from "../../../../modules/post/components/CreatePostCard/CreatePostCard";

const NewsfeedPage = () => {
  const { getCurrentRoom } = useRooms();
  const { roomId } = useParams();

  const {
    posts,
    getPosts,
    currentPost,
    setCurrentPost,
    loadingPosts,
    loadedAllPosts,
    loadingMorePosts,
  } = usePosts();

  useEffect(() => {
    getCurrentRoom(roomId || "");
    getPosts({ room_id: roomId || "", getStart: 0 });
  }, [roomId]);

  return (
    <LeftSideBar>
      <Box
        style={{
          width: "100%",
          paddingTop: 16,
          paddingBottom: 32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CreatePostCard />

        {loadingPosts && <CircularProgress />}
        {!loadingPosts && posts.map((post) => <PostCard post={post} />)}

        {loadingMorePosts && <CircularProgress />}
        {!loadedAllPosts && !loadingMorePosts && (
          <Box
            style={{ minWidth: 620, display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="text"
              onClick={async () => await getPosts({ room_id: roomId || "" })}
            >
              <Typography>Xem thêm</Typography>
            </Button>
          </Box>
        )}

        <EditPostDialog
          post={currentPost}
          open={!!currentPost}
          onClose={() => setCurrentPost(undefined)}
        />
      </Box>
    </LeftSideBar>
  );
};

export default NewsfeedPage;
