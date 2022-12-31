import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useCallback, useContext, useState } from "react";
import { db } from "../config/firebase-config";
import useAppSnackbar from "../hook/useAppSnackBar";
import CommentData from "../interface/comment-data";
import FileData from "../interface/file-data";

interface PostCommentsContextProps {
  postComments: { [postId: string]: CommentData[] };
  getPostComments: (payload: {
    room_id: string;
    post_id: string;
  }) => Promise<void>;
  loadingPostComments: boolean;

  createPostComment: (payload: {
    room_id: string;
    post_id: string;
    new_post: { content: string; image?: string; attach_files?: FileData[] };
  }) => Promise<void>;
  creatingPostComment: boolean;
}

const PostCommentsContext = createContext<PostCommentsContextProps>({
  postComments: {},
  getPostComments: async () => {},
  loadingPostComments: false,

  createPostComment: async () => {},
  creatingPostComment: false,
});

interface PostCommentsContextProviderProps {
  children: React.ReactNode;
}

const PostCommentsProvider = ({
  children,
}: PostCommentsContextProviderProps) => {
  const [postComments, setPostComments] = useState<{
    [postId: string]: CommentData[];
  }>({});
  const [loadingPostComments, setLoadingPostComments] = useState(false);
  const [creatingPostComment, setCreatingPostComment] = useState(false);

  const { showSnackbarError } = useAppSnackbar();

  const getPostComments = useCallback(
    async ({ room_id, post_id }: { room_id: string; post_id: string }) => {
      try {
        setLoadingPostComments(true);

        onSnapshot(
          collection(db, "room", room_id, "post", post_id, "comment"),
          (postCommentDocs) => {
            setPostComments({
              ...postComments,
              post_id: postCommentDocs.docs.map(
                (postCommentDoc) => postCommentDoc.data() as CommentData
              ),
            });
            setLoadingPostComments(false);
          }
        );
      } catch (error) {
        showSnackbarError(error);
      }
    },
    [postComments, showSnackbarError]
  );

  const createPostComment = useCallback(
    async ({
      room_id,
      post_id,
      new_post,
    }: {
      room_id: string;
      post_id: string;
      new_post: { content: string; image?: string; attach_files?: FileData[] };
    }) => {
      try {
        setCreatingPostComment(true);
        const time = Timestamp.now();

        const commentDocResponse = await addDoc(
          collection(db, "room", room_id, "post", post_id, "comment"),
          {
            last_edit: time,
            created_at: time,
            ...new_post,
          }
        );

        await updateDoc(
          doc(
            db,
            "room",
            room_id,
            "post",
            post_id,
            "comment",
            commentDocResponse.id
          ),
          { id: commentDocResponse.id }
        );

        setPostComments({
          ...postComments,
          [post_id]: [
            {
              id: commentDocResponse.id,
              last_edit: time,
              created_at: time,
              ...new_post,
            },
            ...postComments[post_id],
          ],
        });
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setCreatingPostComment(false);
      }
    },
    [postComments, showSnackbarError]
  );

  return (
    <PostCommentsContext.Provider
      value={{
        postComments,

        getPostComments,
        loadingPostComments,

        createPostComment,
        creatingPostComment,
      }}
    >
      {children}
    </PostCommentsContext.Provider>
  );
};

export const usePostComments = () => {
  const store = useContext(PostCommentsContext);
  return store;
};

export default PostCommentsProvider;
