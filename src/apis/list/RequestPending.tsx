import { AxiosRequestConfig } from 'axios';
import { useEffect, useState} from 'react';
import { api } from './config';

export function useFetch<T = unknown>(url:string, page:number, options?:AxiosRequestConfig) {
  const [ data , setData ] = useState< T | any >([]);
  const [ loading , setLoading] = useState(true);
  const [ error , setError] = useState<Error | null>(null);

  console.log(url)
  
  useEffect(() => {
    api.get(url, options)
        .then(response => {
          setData(response.data);
        })
        .catch(err => {
          setError(err);
          console.log(err)
        })
        .finally(() => {
          setLoading(false);
      });
  }, [page]);
  return { data, loading, error };
}