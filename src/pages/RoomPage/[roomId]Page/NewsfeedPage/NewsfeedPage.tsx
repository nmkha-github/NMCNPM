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

const NewsfeedPage = () => {
  const { currentRoom, getCurrentRoom } = useRooms();
  const { roomId } = useParams();
  const { posts, getPosts, currentPost, setCurrentPost } = usePosts();
  const [curPost, setCurPost] = useState<PostData | undefined>(undefined);
  useEffect(() => {
    getPosts({ room_id: roomId || "" });
  }, []);
  useEffect(() => {
    setCurPost(posts[0]);
  }, [posts]);

  return (
    <LeftSideBar>
      <Box
        style={{
          background: "rgb(240, 242, 245)",
          width: "100%",
          height: "100%",
          paddingTop: 16,
        }}
      >
        <Box style={{ maxWidth: 620, margin: "auto" }}>
          <CreatePostCard />
          {posts.map((post) => {
            return (
              <PostCard
                post={post}
              />
            );
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
