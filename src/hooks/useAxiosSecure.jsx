import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // Logout user and navigate to login page
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    const logOut = async () => {
      try {
        await authContext.logOut();
      } catch (error) {
        console.error("Error occurred during logout:", error);
      }
    };

    return () => {
      // Clean up the interceptors when the component unmounts
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
      source.cancel("Request canceled");
    };
  }, [navigate, axiosSecure, authContext]);

  return [axiosSecure];
};

export default useAxiosSecure;
