import axios from '../API/axios';
import useAuth from './useAuth';

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      '/auth/refresh',
      { data: 'some data' },
      {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return {
        ...prev,
        role: response.data.role,
        token: response.data.token,
        fullname: response.data.fullname,
        email: response.data.email,
      };
    });
    return response.data.token;
  };
  return refresh;
}

export default useRefreshToken;
