// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../API/axios";

export const Login = async (username, password) => {
  // const axiosPrivate = useAxiosPrivate();
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  const result = axios.post(`/auth/token`, formData);
  return result;
};

export const Signup = async (
  username,
  fullName,
  email,
  password,
  gender,
  age,
  role
) => {
  // const axiosPrivate = useAxiosPrivate();
  const data = {
    username: username,
    email: email,
    full_name: fullName,
    gender: gender,
    age: age,
    phone_number: "",
    password: password,
    user_role: role,
  };

  const result = await axios.post(`/auth/create/user`, data);

  return result;
};
