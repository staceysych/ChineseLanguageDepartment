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
  const imgLocation = await uploadPhoto(fileForUpload, token );
  const response = await request(
    `${URLS.SERVER_URL}${path}`,
    'POST',
    { photo: imgLocation, ...obj },
    { Authorization: `Bearer ${token}` }
  ).then((res) => message(res.message, true)).catch(e => message(e.message));
};
