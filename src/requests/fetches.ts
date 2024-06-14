import axios, { AxiosResponse } from "axios";
import { BACKEND_URL_DEV, BACKEND_URL_PROD } from "../../config.ts";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL_DEV,
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_URL_DEV,
  headers: { "Content-Type": "application/json" },
});

export const loginFetch = async (
  payload: object
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/login", payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response !== undefined) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (
  payload: object
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/create_user",
      payload
    );
    if (response !== undefined) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

axiosPrivate.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  (error) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

export const getItems = async (token: string) => {
  console.log("TOKEN:");
  console.log(token);
  try {
    const response = await axiosPrivate({
      method: "get",
      url: `${BACKEND_URL_DEV}get_items`,
      headers: {
        "x-custom": `Bearer ${token}`,
      },
    });
    if (response !== null) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
