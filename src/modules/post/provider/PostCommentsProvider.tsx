import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useCallback, useContext, useState } from "react";
import { db } from "../../../lib/config/firebase-config";
import useAppSnackbar from "../../../lib/hook/useAppSnackBar";
import CommentData from "../../../lib/interface/comment-data";
import FileData from "../../../lib/interface/file-data";
import { useUser } from "../../../lib/provider/UserProvider";

interface PostCommentsContextProps {
  PostComments: CommentData[];
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

  deleteComment: (payload: { room_id: string; post_id: string;id:string }) => Promise<void>;
  deletingComment: boolean;
}

const PostCommentsContext = createContext<PostCommentsContextProps>({
  PostComments: [],
  getPostComments: async () => {},
  loadingPostComments: false,

  createPostComment: async () => {},
  creatingPostComment: false,

  deleteComment: async ()=>{},
  deletingComment:false,
});

interface PostCommentsContextProviderProps {
  children: React.ReactNode;
}

const PostCommentsProvider = ({
  children,
}: PostCommentsContextProviderProps) => {
  const [PostComments, setPostComments] = useState<CommentData[]>([]);
  const [loadingPostComments, setLoadingPostComments] = useState(false);
  const [creatingPostComment, setCreatingPostComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  const { user } = useUser();

  //
  const { showSnackbarError } = useAppSnackbar();
  //function
  const getPostComments = useCallback(
    async ({ room_id, post_id }: { room_id: string; post_id: string }) => {
      try {
        setLoadingPostComments(true);

        onSnapshot(
          collection(db, "room", room_id, "post", post_id, "comment"),
          (postCommentDocs) => {
            setPostComments(
              postCommentDocs.docs.map(
                (postCommentDoc) => postCommentDoc.data() as CommentData
              )
            );
            setLoadingPostComments(false);
          }
        );
      } catch (error) {
        showSnackbarError(error);
      }
    },
    [showSnackbarError]
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
      if(!user) return;
      try {
        setCreatingPostComment(true);
        const time = Timestamp.now();

        const commentDocResponse = await addDoc(
          collection(db, "room", room_id, "post", post_id, "comment"),
          {
            last_edit: time,
            created_at: time,
            creator_id:user.id,
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

        setPostComments([
          {
            id: commentDocResponse.id,
            last_edit: time,
            created_at: time,
            creator_id:user.id,
            ...new_post,
          },
          ...PostComments,
        ]);
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setCreatingPostComment(false);
      }
    },
    [PostComments, showSnackbarError]
  );

  const deleteComment = useCallback(
    async ({ room_id, post_id,id }: { room_id: string; post_id: string,id:string }) => {
      try {
        setDeletingComment(true);
        await deleteDoc(doc(db, "room", room_id, "post", post_id,"comment",id));
        setPostComments(PostComments.filter((comment) => comment.id !== id));
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setDeletingComment(false);
      }
    },
    [PostComments, showSnackbarError]
  );
  return (
    <PostCommentsContext.Provider
      value={{
        PostComments,

        getPostComments,
        loadingPostComments,

        createPostComment,
        creatingPostComment,

        deleteComment,
        deletingComment,
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
