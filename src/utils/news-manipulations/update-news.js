import { URLS } from '../../constants';

export const updateNews = async (
  obj,
  currentObject,
  token,
  request,
  formatNewsForServer,
  filesForDelete,
  filesForUpload,
  multiplePhotoUploadHandler,
  deleteManyPhotos,
  path
) => {
  const formattedObj = {
    ...formatNewsForServer(obj),
    _id: currentObject[0]._id,
  };
  if (filesForDelete) {
    const files = filesForDelete.map((el) => {
      return currentObject[0].photos[el.key].split('/')[
        currentObject[0].photos[el.key].split('/').length - 1
      ];
    });
    deleteManyPhotos(files, token);
  }
  if (filesForUpload.length) {
    multiplePhotoUploadHandler(filesForUpload, token).then((res) => {
      res.forEach((el) => formattedObj.photos.push(el));
      request(
        `${URLS.SERVER_URL}${path}/${formattedObj._id}`,
        'PUT',
        { ...formattedObj },
        token
      );
    });
  } else {
    await request(
      `${URLS.SERVER_URL}${path}/${formattedObj._id}`,
      'PUT',
      { ...formattedObj },
      token
    );
  }
};
