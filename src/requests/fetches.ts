import { AxiosResponse } from "axios";
import { API_URL } from "../../config.ts";
import { useAxiosInstance } from "../hooks/useAxios.ts";
import { useRequest } from "../hooks/useRequest.ts";
import { type IUseRequestHook } from "../hooks/useRequest.ts";
import { IItem } from "../context/ItemAndCharacterContext.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

export const useLogin = (): IUseRequestHook<unknown> => {
  const axiosInstance = useAxiosInstance(API_URL, false);
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
  const axiosInstance = useAxiosInstance(API_URL);
  const requestHandler = async (payload: object) => {
    return await axiosInstance.post("/create_user", payload);
  };
  return useRequest(requestHandler, false);
};

export const useItems = (): IUseRequestHook<IItem[]> => {
  const axiosInstance = useAxiosInstance(API_URL);
  const requestHandler = async (params: object) => {
    return await axiosInstance.get(`/get_items`, {
      params,
    });
  };
  return useRequest(requestHandler, false);
};

export const useRefresh = (): IUseRequestHook<AxiosResponse> => {
  const { refreshToken } = useLocalStorage();
  const axiosInstance = useAxiosInstance(API_URL, true);
  const requestHandler = async () => {
    return await axiosInstance.post("/refresh", {
      refresh_token: refreshToken,
    });
  };
  return useRequest(requestHandler, false);
};

export const useCharNames = (): IUseRequestHook<AxiosResponse> => {
  const axiosInstance = useAxiosInstance(API_URL);
  const requestHandler = async () => {
    return await axiosInstance.get("/get_char_names");
  };
  return useRequest(requestHandler, true);
};
