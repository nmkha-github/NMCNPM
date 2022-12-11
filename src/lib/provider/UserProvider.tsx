import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../config/firebase-config";
import useAppSnackbar from "../hook/useAppSnackBar";
import UserData from "../interface/user";
import { useAuth } from "./AuthProvider";

interface UserContextProps {
  user?: UserData;
  loadingUser: boolean;

  editUser: ({
    id,
    fields,
  }: {
    id: string;
    fields: { name?: string; avatar?: string; created_at?: string };
  }) => Promise<void>;
  editingUser: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: undefined,

  loadingUser: false,

  editUser: async () => {},
  editingUser: false,
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserData>();
  const [loadingUser, setLoadingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);

  const { showSnackbarError } = useAppSnackbar();
  const { userInfo } = useAuth();
  const userFromAuth = userInfo?.uid || "";

  const getUser = useCallback(async () => {
    try {
      setLoadingUser(true);
      const userResponse = await getDoc(doc(db, "user", userFromAuth));

      setUser(userResponse.data() as UserData);
    } catch (error) {
      showSnackbarError(error);
    } finally {
      setLoadingUser(false);
    }
  }, [userInfo]);

  const editUser = useCallback(
    async ({
      id,
      fields,
    }: {
      id: string;
      fields: { name?: string; avatar?: string; created_at?: string };
    }) => {
      try {
        setEditingUser(true);
        await updateDoc(doc(db, "user", id), fields);

        setUser({ ...user, ...fields } as UserData);
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setEditingUser(false);
      }
    },
    []
  );

  useEffect(() => {
    if (userInfo) {
      getUser();
    } else {
      setUser(undefined);
    }
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,

        editUser,
        editingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const store = useContext(UserContext);
  return store;
};

export default UserProvider;
