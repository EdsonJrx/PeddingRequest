import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { api } from './config';

export function useApi<T = unknown>(initialUrl: string, initialData: T | null = null)  {
  const [data, setData] = useState< T | [] >([]);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>(initialUrl);
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    console.log(api)
    try {
      const response: AxiosResponse<T> = await api.get(url);
      
      setData([...data, ...response.data]);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [url, page]);

  return { data, error, loading, setUrl, loadMore } as const;
};
