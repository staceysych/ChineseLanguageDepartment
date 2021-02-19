import { uploadPhoto } from './upload-photo';

import { URLS } from '../constants';

export const addNewPhoto = async (
  fileForUpload,
  obj,
  path,
  token,
  request,
  message
) => {
  const imgLocation = await uploadPhoto(fileForUpload);
  const response = await request(
    `${URLS.SERVER_URL}${path}`,
    'POST',
    { photo: imgLocation, ...obj },
    { Authorization: `Bearer ${token}` }
  );

  message(response.message);
};
