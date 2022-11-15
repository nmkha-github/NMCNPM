interface RoomData{
  id: string;
  avatar: string;
  name: string;
  description?: string;
  manager_id?: number;
  auto_accepted?: boolean;
  disabled_newsfeed?: boolean;
}

export default RoomData;