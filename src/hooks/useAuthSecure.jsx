import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // console.log(config);
      // const token = user?.accessToken;  //ata firebase token use korle...
      
      // নতুন (JWT token) use korle ai line..karon jwt token ame localstorage store rakhbo...
const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => {
        // console.log(err);
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          // console.log("log out the user for the bad request");
          logOut().then(() => {
            // navigate("/hr-register");  //age ata cilo
            navigate("/");   //ata ame add korlam akhn..mane logout hole home aa chole jabe
          });
        }
        return Promise.reject(err); // forward the error ----->to calling code........
      }
    );

    // interceptors  deactivate hobe kaj ses hole
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return instance;
};

export default useAxiosSecure;
