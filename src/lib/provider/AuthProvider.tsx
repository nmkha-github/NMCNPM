import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "../config/firebase-config";

interface AuthContextProps {}

const AuthContext = createContext<AuthContextProps>({});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

initializeApp(FirebaseConfig);

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [checkingAuth, setCheckingAuth] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const needAuth = !["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );

  const authCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("SUCCESS LOGIN");
      setCheckingAuth(false);
    } else {
      console.log(location.pathname);
      if (needAuth) {
        navigate("/login");
      }
    }
  });

  useEffect(() => {
    authCheck();

    return () => authCheck();
  }, [auth]);

  if (checkingAuth && needAuth)
    return (
      <Box className="w100 h100 df aic jcc">
        <Typography>Loading...</Typography>
      </Box>
    );

  return (
    <AuthContext.Provider value={{ checkingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const store = useContext(AuthContext);
  return store;
};

export default AuthProvider;
