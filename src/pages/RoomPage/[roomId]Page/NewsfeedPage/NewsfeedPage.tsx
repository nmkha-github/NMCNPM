import { useEffect, useState } from "react";
import LeftSideBar from "../../../../modules/room/components/LeftSideBar/LeftSideBar";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import { useParams } from "react-router-dom";
import PostCard from "../../../../modules/post/components/PostCard/PostCard";
import { Box } from "@mui/material";
import { usePosts } from "../../../../lib/provider/PostsProvider";
import PostData from "../../../../modules/post/interface/post-data";
import EditPostCard from "../../../../modules/post/components/PostCard/EditPostCard";
import CreatePostCard from "../../../../modules/post/components/CreatePostCard/CreatePostCard";
import { usePostComments } from "../../../../lib/provider/PostCommentsProvider";

const NewsfeedPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();
  const { posts, getPosts, currentPost, setCurrentPost } = usePosts();
  const { getPostComments } = usePostComments();

  useEffect(() => {
    getPosts({ room_id: roomId || "" });
  }, []);

  useEffect(() => {
    posts.forEach((post) => {
      getPostComments({ room_id: roomId || "", post_id: post.id });
    });
  }, [posts]);

  return (
    <LeftSideBar>
      <Box
        style={{
          background: "rgb(240, 242, 245)",
          width: "100%",
          height: "100%",
          paddingTop: 16,
          paddingBottom:32,
        }}
      >
        <Box style={{ maxWidth: 620, margin: "auto" }}>
          <CreatePostCard />
          {posts.map((post) => {
            return <PostCard post={post} />;
          })}

          <EditPostCard
            post={currentPost}
            open={!!currentPost}
            onClose={() => setCurrentPost(undefined)}
          />
        </Box>
      </Box>
    </LeftSideBar>
  );
};

export default NewsfeedPage;
