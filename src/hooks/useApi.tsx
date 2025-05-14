import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

const useApi = <T,>(id: string) => {
  const [responses, setResponses] = useState<{ [key: string]: T | null }>({});
  const [errors, setErrors] = useState<{ [key: string]: Error | null }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const callApi = useCallback(async (endpoint: string, config: any = {}) => {
    setLoading(prev => ({ ...prev, [id]: true }));
    try {
      const baseUrl = import.meta.env.VITE_BASE_API_URL;
      const token = localStorage.getItem('token');
      const customHeaders = {
        'Access-Control-Allow-Origin': '*',
        ...config.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      if (config.data instanceof FormData) {
        delete customHeaders['Content-Type'];
      }

      const result = await axios({
        ...config,
        url: `${baseUrl}${endpoint}`,
        headers: customHeaders
      });

      setResponses(prev => ({ ...prev, [id]: result?.data }));

      if (config.method && config.method.toUpperCase() !== 'GET') {
        toast.success(result?.data.message);
      }

      return result?.data;

    } catch (err) {
      setErrors(prev => ({ ...prev, [id]: err as Error }));
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  }, [id]);


  return useMemo(() => ({
    response: responses[id] || null,
    error: errors[id] || null,
    loading: loading[id] || false,
    callApi
  }), [responses, id, errors, loading, callApi]);
};

export default useApi;