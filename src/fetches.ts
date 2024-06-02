import axios from "axios";
import { BACKEND_URL_DEV, BACKEND_URL_PROD } from "../config.ts";

export const getItems = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL_DEV}get_items`);
    if (response !== null) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
