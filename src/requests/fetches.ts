import { AxiosResponse } from "axios";
import { BACKEND_URL_DEV } from "../../config.ts";
import { useAxiosInstance } from "../hooks/useAxios.ts";
import { useRequest } from "../hooks/useRequest.ts";
import { type IUseRequestHook } from "../hooks/useRequest.ts";
import { IItem } from "../context/ItemAndCharacterContext.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

export const useLogin = (): IUseRequestHook<unknown> => {
  const axiosInstance = useAxiosInstance(BACKEND_URL_DEV, false, true);
  const requestHandler = async (payload: object) => {
    return await axiosInstance.post("/login", payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  return useRequest(requestHandler, false);
};

export const useCreateUser = (): IUseRequestHook<unknown> => {
  const axiosInstance = useAxiosInstance(BACKEND_URL_DEV);
  const requestHandler = async (payload: object) => {
    return await axiosInstance.post("/create_user", payload);
  };
  return useRequest(requestHandler, false);
};

export const useItems = (): IUseRequestHook<IItem[]> => {
  const axiosInstance = useAxiosInstance(BACKEND_URL_DEV);
  const requestHandler = async () => {
    return await axiosInstance.get("/get_items");
  };
  return useRequest(requestHandler, true);
};

export const useRefresh = (): IUseRequestHook<AxiosResponse> => {
  const { refreshToken } = useLocalStorage();
  const axiosInstance = useAxiosInstance(BACKEND_URL_DEV, true, true);
  const requestHandler = async () => {
    return await axiosInstance.post("/refresh", {
      refresh_token: refreshToken,
    });
  };
  return useRequest(requestHandler, false);
};
