import axios from "../API/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.post(
        "/auth/logout",
        { data: "Some Data" },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
