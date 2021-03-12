import { URLS } from '../../constants';
import { notification } from 'antd';

export const addNewNews = (
  obj,
  token,
  request,
  formatNewsForServer,
  filesForUpload,
  multiplePhotoUploadHandler,
  path
) => {
  const formattedObj = {
    ...formatNewsForServer(obj),
  };
  multiplePhotoUploadHandler(filesForUpload, token, request).then((res) => {
    if (res.message) {
      notification.open({
        message: res.message,
        duration: 1,
      });
    } else {
      res.forEach((el) => formattedObj.photos.push(el));
      request(`${URLS.SERVER_URL}${path}`, 'POST', { ...formattedObj }, token);
    }
  });
};
