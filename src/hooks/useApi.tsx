import {
  useCallback,
  useState,
} from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

type ApiConfig = {
  method?: string;
  headers?: Record<string, string>;
  data?: unknown;
  params?: Record<string, unknown>;
};

const useApi = <T,>() => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = useCallback(async (endpoint: string, config: ApiConfig = {}) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const baseUrl = import.meta.env.VITE_BASE_API_URL;
      if (!baseUrl) throw new Error('VITE_BASE_API_URL is not defined');

      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...config.headers,
      };

      const result = await axios({
        ...config,
        url: `${baseUrl}${endpoint}`,
        headers,
      });

      setResponse(result.data);

      if ((config.method || '').toUpperCase() !== 'GET') {
        toast.success('Success');
      }

      return result.data;
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    response,
    error,
    loading,
    callApi,
  };
};

export default useApi;
