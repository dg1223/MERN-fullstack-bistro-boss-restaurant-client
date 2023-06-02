import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();

  // data parameter is destructured -> renamed as cart
  // and default value is an empty array
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user.email}`);
      console.log("res from axios", res);
      // no need to convert to JSON (res.json) because axios
      // automatically does it
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;

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
