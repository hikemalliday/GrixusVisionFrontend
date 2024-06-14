import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

export interface IAuthUser {
  username: string;
  password: string;
  access_token: string;
}

export interface IAuthContextType {
  authUser: IAuthUser | null;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  login: CallableFunction;
  logout: CallableFunction;
}

export const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): ReactElement | null => {
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null);
  const [accessToken, setAccessToken] = useState("");

  const login = (userData: IAuthUser): void => {
    setAccessToken(userData.access_token);
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
        accessToken,
        setAccessToken,
        login,
        logout,
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
