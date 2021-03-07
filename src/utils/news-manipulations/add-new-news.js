import { URLS } from '../../constants';

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
  multiplePhotoUploadHandler(filesForUpload, token).then((res) => {
    res.forEach((el) => formattedObj.photos.push(el));
    request(`${URLS.SERVER_URL}${path}`, 'POST', { ...formattedObj }, token);
  });
};
