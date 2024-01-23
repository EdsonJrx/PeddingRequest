import { useState } from 'react';
import { api } from './config';

interface LoginProps {
    userName: string;
    password: string;
}

function useLogin<T = unknown>() {
  const [data, setData] = useState< T | any >([])
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState(false);

  const login = async ({userName,password}: LoginProps) => {
    setLoading(true);
    let data = JSON.stringify({
      "userName": userName,
      "password": password
    });

    try {
      const response = await api.post('connect/token/', data, {
        headers: { 
          'Content-type': 'application/json', 
          'Accept': 'application/json'
        }
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, login, loading };
}

export default useLogin;
