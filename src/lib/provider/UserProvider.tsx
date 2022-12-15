import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

  const getUser = useCallback(async () => {
    try {
      setLoadingUser(true);

      const usersResponse = await getDocs(
        query(collection(db, "user"), where("auth_id", "==", userInfo?.uid))
      );
      usersResponse.forEach((userResponse) => {
        setUser(userResponse.data() as UserData);
      });
    } catch (error) {
      showSnackbarError(error);
    } finally {
      setLoadingUser(false);
    }
  }, [showSnackbarError, userInfo?.uid]);

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

        const docsResponse = await getDocs(
          query(collection(db, "user"), where("id", "==", id))
        );
        docsResponse.forEach(async (doc) => {
          await updateDoc(doc.ref, fields);
        });

        setUser({ ...user, ...fields } as UserData);
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setEditingUser(false);
      }
    },
    [user]
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
