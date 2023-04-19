import { useContext, useDebugValue } from "react";
import userContext from "../Context/UserContext";

const useAuth = () => {
  const { auth } = useContext(userContext);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useContext(userContext);
};

export default useAuth;
