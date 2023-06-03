import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  // without the loading props, client doesn't wait for the
  // server to check if the logged in user is an admin which
  // results in an error on the client side
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  // Use Axios secure with React query
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    // enable fetching data if admin check has finished (loading)
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      // console.log("is admin response: ", res);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
