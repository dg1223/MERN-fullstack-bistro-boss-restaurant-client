import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();

  // data parameter is destructured -> renamed as cart
  // and default value is an empty array
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    /* queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/carts?email=${user.email}`,
        // send JWT to server
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    }, */
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
