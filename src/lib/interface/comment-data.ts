import { Timestamp } from "firebase/firestore";
import FileData from "./file-data";

interface CommentData {
  id: string;
  content: string;
  image?: string;
  attach_files?: FileData[];
  created_at: Timestamp | Date | string;
  last_edit: Timestamp | Date | string;
}

export default CommentData;
