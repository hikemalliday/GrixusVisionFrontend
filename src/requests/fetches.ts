import { AxiosResponse } from "axios";
import { API_URL } from "../../config.ts";
import { useAxiosInstance } from "../hooks/useAxios.ts";
import { useRequest } from "../hooks/useRequest.ts";
import { type IUseRequestHook } from "../hooks/useRequest.ts";
import { IItem } from "../context/ItemAndCharacterContext.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { useSearchParams, useLocation } from "react-router-dom";

export const useLogin = (): IUseRequestHook<unknown> => {
  const axiosInstance = useAxiosInstance(API_URL, false, true);
  const requestHandler = async (payload: object) => {
    console.log("useLogin test");
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
    console.log("TEST ACTION0");
    console.log("params");
    console.log(params);
    // const query = `/get_items?${params}`;
    // const query =
    //   params.queryParams != ""
    //     ? `/get_items?${params.queryParams}`
    //     : "/get_items";

    return await axiosInstance.get(`/get_items`, {
      params,
    });
  };
  return useRequest(requestHandler, false);
};

export const useRefresh = (): IUseRequestHook<AxiosResponse> => {
  const { refreshToken } = useLocalStorage();
  const axiosInstance = useAxiosInstance(API_URL, true, true);
  const requestHandler = async () => {
    return await axiosInstance.post("/refresh", {
      refresh_token: refreshToken,
    });
  };
  return useRequest(requestHandler, false);
};
