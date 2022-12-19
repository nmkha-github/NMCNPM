import { Timestamp } from "firebase/firestore";
import CommentData from "../../../lib/interface/comment-data";
import FileData from "../../../lib/interface/file-data";

interface TaskData {
  id: string;
  title: string;
  content?: string;
  attach_files?: FileData[];
  status: string;
  assignee_id: string;
  creator_id: string;
  created_at: Timestamp | Date | string;
  deadline?: Timestamp | Date | string;
  last_edit?: Timestamp | Date | string;
  order?: number;
  comments?: CommentData[];
}

export default TaskData;
