import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// import { expireKey, useLocalStorage } from "../hooks/useLocalStorage";
import { useLocalStorageContext } from "./LocalStorageContext";

export interface IAuthUser {
  username?: string;
  password?: string;
  access_token: string;
  refresh_token: string | null;
}

export interface IAuthContextType {
  authUser: IAuthUser | null;
  login: CallableFunction;
  logout: CallableFunction;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): ReactElement | null => {
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    accessToken,
    clear,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isTokenExpired,
    expireKey,
  } = useLocalStorageContext();

  useEffect(() => {
    if (isTokenExpired(expireKey)) {
      console.log("isTokenExpired useEffect");
      clear();
      setAuthUser(null);
      setIsLoading(false);
      return;
    }
    if (accessToken && refreshToken) {
      console.log("AuthContext: access token + refresh token useEffect");
      const userData: IAuthUser = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
      setAuthUser(userData);
      setIsLoading(false);
      return;
    }
    console.log("AuthContext: useEffect");
  }, []);

  const login = (userData: IAuthUser): void => {
    setAccessToken(userData.access_token ?? "");
    setRefreshToken(userData.refresh_token ?? "");
    setAuthUser(userData);
  };

  const logout = (): void => {
    setAuthUser(null);
    setAccessToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }
  return context;
};
