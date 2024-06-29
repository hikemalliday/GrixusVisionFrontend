import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const useAxiosInstance = (
  baseURL: string,
  enableInterceptors: boolean = true,
  useCookies: boolean = false
): AxiosInstance => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, refreshToken } = useLocalStorage();
  let axiosInstance;
  if (useCookies === false) {
    axiosInstance = axios.create({ baseURL });
  } else {
    axiosInstance = axios.create({ baseURL, withCredentials: true });
  }
  if (!enableInterceptors) {
    return axiosInstance;
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    async (error) => {
      await Promise.reject(error as Error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && originalRequest.retry !== true) {
        try {
          const { data } = await axiosInstance.post("/refresh", {
            refresh_token: refreshToken,
          });
          setAccessToken(data.access_token as string);
          originalRequest.headers.authorization = `Bearer ${data.access_token}`;
          return await axiosInstance(originalRequest);
        } catch (error) {
          // @ts-ignore
          if (error?.response?.status === 401) {
            navigate("/login");
          }
        }
      }
      await Promise.reject(error as Error);
    }
  );
  return axiosInstance;
};
