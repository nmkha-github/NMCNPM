interface MemberData{
  id: string;
  name: string;
  avatar: string;
  taskToDoCount?: number;
  taskDoingCount?: number;
  taskReviewingCount?: number;
  taskDoneCount?: number;
  joinedDate: string | Date;
}

export default MemberData