import { useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

/**
 * Solution #1: Simple => Initialize axiosSecure outside the useAxiosSecure hook
 * so that it doesn't get called repeatedly
 */
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  // The following naked call will trigger useEffect
  // in CheckoutForm repeatedly.
  /* const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });
 */
  // WHY?

  /**
   * The axiosSecure instance is created inside the hook, and it will have a new reference on every render. As a result, the useEffect in CheckoutForm will see a different axiosSecure reference on every render and trigger the effect repeatedly.
   *
   * Solution #2: Memoization => To fix the infinite API call issue, you can modify the useAxiosSecure hook to use useMemo to memoize the axiosSecure instance and prevent unnecessary re-creation.
   */
  /* const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000",
    });
  }, []); */

  useEffect(() => {
    const source = axios.CancelToken.source();

    // injects token by intercepting request to server
    // token must be generated and stored prior to intercepting
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

    // intercepts response from server to examine if there is any error
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
  }, [navigate, /* axiosSecure, */ authContext]);

  return [axiosSecure];
};

export default useAxiosSecure;
