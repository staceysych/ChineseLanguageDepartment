import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body, headers) => {
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
          ...headers,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так ');
      }
      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { request, error, clearError };
};
