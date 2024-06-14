// We just followed the tutorial and typed this out, not sure if we will need

// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const axiosPrivate = useAxiosPrivate();
// const navigate = useNavigate();
// const location = useLocation();

// useEffect(() => {
//   let isMounted = true;
//   const controller = new AbortController();
//   const getUsers = async () => {
//     try {
//       const response = await axiosPrivate.get("/users", {
//         signal: controller.signal,
//       });
//       console.log(response.data);
//       isMounted && setUsers(response.data);
//     } catch (err) {
//       console.error(err);
//       // This code to restore state to where the user was,
//       // is in a previous tutorial we havent watched yet
//       navigate("/login", { state: { from: location }, replace: true });
//     }
//   };
//   getUsers();
//   return () => {
//     isMounted = false;
//     controller.abort();
//   };
// }, []);
