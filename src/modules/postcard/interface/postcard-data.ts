import { Timestamp } from "firebase/firestore";
import CommentData from "../../../lib/interface/comment-data";
import FileData from "../../../lib/interface/file-data";

interface TaskData {
  id: string;
  title: string;
  content?: string;
  attach_files?: FileData[];
  creator_id: string;
  created_at: Timestamp | Date | string;
  last_edit?: Timestamp | Date | string;
  comments?: CommentData[];
}

export default TaskData;