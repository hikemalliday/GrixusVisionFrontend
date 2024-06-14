// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import { useRefreshToken } from "./useRefreshToken";
// import useAuth from "./useAuth";
// // Hook is for attacking interceptors to axios instance
// // intersting to note that we are calling another custom hook within a custom hook
// // I suppose we do that at work too
// const useAxiosPrivate = () => {
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();

//   useEffect(() => {
//     const requestIntercept = axiosPrivate.interceptors.request.use(
//       (config) => {
//         // If header doesnt exist, we know this will be first attempt,
//         // aka NOT a retry
//         if (!config.headers["Authorization"]) {
//           config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = axiosPrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         // Probably an axios error object property
//         const prevRequest = error?.config;
//         // 403 is forbidden (expired access token)
//         // sent property to avoid endless loop
//         if (error?.response?.status === 403 && !prevRequest.sent) {
//           prevRequest.send = true;
//           const newAccessToken = await refresh();
//           prevRequest.header["Authorization"] = `Bearer ${newAccessToken}`;
//           return axiosPrivate(prevRequest);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       // Remove intercept when cleanup function runs
//       axiosPrivate.interceptors.request.eject(requestIntercept);
//       axiosPrivate.interceptors.response.eject(responseIntercept);
//     };
//   }, [auth, refresh]);

//   return axiosPrivate;
// };

// export default useAxiosPrivate;

// TODO: Need to make hook 'useRefresh'

import axios, { AxiosInstance } from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRefreshToken } from "./useRefreshToken";

interface IGetAxiosArgs {
  baseURL: string;
  onException: CallableFunction;
  enableInterceptors: boolean;
}

export const getAxios = ({
  baseURL,
  onException,
  enableInterceptors,
}: IGetAxiosArgs): AxiosInstance => {
  const refresh = useRefreshToken();
  const axiosInstance = axios.create({ baseURL });
  const { accessToken, setAccessToken } = useAuthContext();
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
      // Probably an axios error object property
      const prevRequest = error?.config;
      // 403 is forbidden (expired access token)
      // sent property to avoid endless loop
      if (error?.response?.status === 403 && !prevRequest.sent) {
        prevRequest.send = true;
        // TODO: Need to make useRefresh() hook;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(prevRequest);
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

// We may not need to use this
export const useAxios = (
  baseUrl: string,
  enableInterceptors = true
): { axiosInstance: AxiosInstance } => {
  const navigate = useNavigate();
};
