// import { AxiosInstance } from "axios";
// import { axiosInstance } from "../fetches";
// import { useAuth } from "./useAuth";

// export const useRefreshToken = () => {
//   const { setAuth } = useAuth();
//   const refresh = async () => {
//     const response = await axiosInstance.get("/refresh", {
//       // Allows us to send cookie with request
//       withCredentials: true,
//     });
//     setAuth((prev) => {
//       console.log(JSON.stringify(prev));
//       console.log(response.data.accessToken);
//       // Interesting:
//       // This syntax will `override` the accessToken property
//       return { ...prev, accessToken: response.data.accessToken };
//     });
//     return response.data.accessToken;
//   };
//   return refresh;
// };
// // Example useage (dont have to destructure because we are just returning one var):
// // const refresh = useRefreshToken();
