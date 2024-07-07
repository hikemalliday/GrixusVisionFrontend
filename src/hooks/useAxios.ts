import axios, { AxiosError, AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const useAxiosInstance = (
  baseURL: string,
  enableInterceptors: boolean = true
): AxiosInstance => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, refreshToken } = useLocalStorage();
  const axiosInstance = axios.create({ baseURL, withCredentials: true });

  if (!enableInterceptors) {
    return axiosInstance;
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      // If we dont include second condition after &&,
      // we send up the wrong token after /refresh
      if (accessToken !== null && !config.headers.Authorization) {
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
      if (error.code === "ERR_NETWORK" && originalRequest.retry !== true) {
        originalRequest.retry = true;
        try {
          const { data } = await axiosInstance.post("/refresh", {
            refresh_token: refreshToken,
          });
          setAccessToken(data.access_token as string);
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          // Clear params, else it appends duplicate query params
          originalRequest.params = {};
          return await axiosInstance(originalRequest);
        } catch (error) {
          // Annoying linter workaround
          const err = error as AxiosError;
          if (err.code === "ERR_NETWORK") {
            console.log("401 received, axios interceptor");
            navigate("/login");
          }
        }
      }
      await Promise.reject(error as Error);
    }
  );
  return axiosInstance;
};
