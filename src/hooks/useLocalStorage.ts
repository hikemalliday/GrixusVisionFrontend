import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface ILocalStorageHook {
  accessToken: string | null;
  clear: () => void;
  isTokenExpired: (key: string) => boolean;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
}

const storageKeys = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const expireKey = storageKeys.refreshToken;

export function useLocalStorage(): ILocalStorageHook {
  const [storage, setStorage] = useState({
    ...(localStorage as Record<string, string>),
  });

  const get = (key: string): string | null =>
    key in storage ? storage[key] : null;
  const set = (key: string, token: string): void => {
    localStorage.setItem(key, token);
    setStorage({
      ...storage,
      [key]: token,
    });
  };

  const clear = (): void => {
    localStorage.clear();
    setStorage({});
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

  useEffect(() => {
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }, []);

  return {
    accessToken,
    clear,
    isTokenExpired,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  };
}
