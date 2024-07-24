import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

export interface ILocalStorageContextType {
  accessToken: string | null;
  clear: () => void;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  isTokenExpired: (token: string) => boolean;
  expireKey: string;
}

export const LocalStorageContext =
  createContext<ILocalStorageContextType | null>(null);

export const LocalStorageProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): ReactElement | null => {
  const [storage, setStorage] = useState({
    ...(localStorage as Record<string, string>),
  });

  const storageKeys = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };

  const clear = (): void => {
    localStorage.clear();
    setStorage({});
  };

  const expireKey = storageKeys.refreshToken;

  const get = (key: string): string | null =>
    key in storage ? storage[key] : null;

  const set = (key: string, token: string): void => {
    localStorage.setItem(key, token);
    setStorage({
      ...storage,
      [key]: token,
    });
  };
  const isTokenExpired = (key: string): boolean => {
    try {
      const token = get(key);
      if (token == null) {
        return true;
      }

      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const { exp } = decoded as { exp: number };
      return exp < currentTime;
    } catch (err) {
      return true;
    }
  };

  const accessToken = get(storageKeys.accessToken);
  const setAccessToken = (newVal: string): void => {
    set(storageKeys.accessToken, newVal);
  };
  const refreshToken = get(storageKeys.refreshToken);
  const setRefreshToken = (newVal: string): void => {
    set(storageKeys.refreshToken, newVal);
  };
  // Unsure if the deps are needed here
  useEffect(() => {
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }, [accessToken, refreshToken]);

  return (
    <LocalStorageContext.Provider
      value={{
        accessToken,
        clear,
        isTokenExpired,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        expireKey,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageContext = (): ILocalStorageContextType => {
  const context = useContext(LocalStorageContext);
  if (context == null) {
    throw new Error(
      "AuthContext must be used within a LocalStorageContextProvider"
    );
  }
  return context;
};
