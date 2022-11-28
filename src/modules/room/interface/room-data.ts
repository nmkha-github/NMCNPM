interface RoomData{
  id: string;
  avatar: string;
  name: string;
  created_at: string | Date;
  description?: string;
  manager_id?: number;
  auto_accepted?: boolean;
  disabled_newsfeed?: boolean;
  locked?: boolean;
  exit_locked?: boolean;
}

export default RoomData;