import { useState, useCallback } from 'react';
import {useMessage} from './error-popup'

export const useHttp = () => {
  const message = useMessage()

  const request = useCallback(async (url, method = 'GET', body, token) => {
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
          'Authorization': `Bearer ${token ? token : null }`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так ');
      }
      message(data.message, data.reload ? true : false)
      return data;
    } catch (e) {
      message(e.message)
      throw e;
    }
  }, []);


  return { request };
};
