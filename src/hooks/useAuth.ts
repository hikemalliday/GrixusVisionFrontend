import { BACKEND_URL_DEV, restUrls } from "../../config";
import { useRequest } from "./useRequest";
import { type AxiosResponse } from "axios";
import { useAxios } from "./useAxios";

export const useAuth = () => {
  console.log("useAuth");
};

// Add interface here
const useApiToken = (): Promise<undefined> => {
  const { apiClient } = useAxios(BACKEND_URL_DEV, false);
  const requestMethod = async (
    payload: Record<string, string>
  ): Promise<AxiosResponse> => await apiClient.post(restUrls.TOKEN, payload);
  return useRequest(requestMethod, false);
};
