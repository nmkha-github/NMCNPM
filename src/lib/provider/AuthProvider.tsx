import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "../config/firebase-config";
import useAppSnackbar from "../hook/useAppSnackBar";

interface AuthContextProps {
  checkingAuth: boolean;

  userId: string;
  register: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  checkingAuth: true,

  userId: "",
  register: async () => {},
  logIn: async () => {},
  logOut: async () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

initializeApp(FirebaseConfig);

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const { showSnackbarError } = useAppSnackbar();

  const needAuth = !["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );

  const register = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (String(error).includes("email-already-in-use")) {
          showSnackbarError("Email đã tồn tại");
        } else {
          showSnackbarError(error);
        }
      }
    },
    [auth, showSnackbarError]
  );

  const logIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (String(error).includes("user-not-found")) {
          showSnackbarError("Tài khoản không tồn tại");
        } else {
          showSnackbarError(error);
        }
      }
    },
    [auth, showSnackbarError]
  );

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      showSnackbarError(error);
    }
  }, [auth, showSnackbarError]);

  const authCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/home");
      setUserId(user.uid);
      setCheckingAuth(false);
    } else {
      if (needAuth) {
        navigate("/login");
      }
    }
  });

  useEffect(() => {
    authCheck();

    return authCheck();
  }, [auth]);

  if (checkingAuth && needAuth)
    return (
      <Box className="w100 h100 df aic jcc">
        <Typography>Loading...</Typography>
      </Box>
    );

  return (
    <AuthContext.Provider
      value={{
        checkingAuth,

        userId,
        register,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const store = useContext(AuthContext);
  return store;
};

export default AuthProvider;
