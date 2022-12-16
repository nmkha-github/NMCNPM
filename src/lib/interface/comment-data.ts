import { Timestamp } from "firebase/firestore";
import FileData from "./file-data";

interface CommentData {
  id: string;
  content: string;
  attach_files?: FileData[];
  created_at: Timestamp | Date | string;
}

export default CommentData;
