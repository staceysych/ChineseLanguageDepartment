import { useCallback } from 'react';
import { notification } from 'antd';

export const useMessage = () => {
  return useCallback((text, reload = false) => {
    if (text) {
      notification.open({
        message: text,
        duration: 1,
        onClose: () => {
          if (reload) {
            /* location.reload(); */
          }
        },
      }); 
    }
  }, []);
};
