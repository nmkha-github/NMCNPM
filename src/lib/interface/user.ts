interface UserData {
  auth_id: string;
  id: string;
  email: string;
  avatar: string;
  name: string;
  created_at?: string | Date;
  rooms_id?: string[];
}

export default UserData;
