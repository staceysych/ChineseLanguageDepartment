import { uploadPhoto } from './upload-photo';

import { URLS } from '../constants';

export const addNewPhoto = async (
  fileForUpload,
  obj,
  path,
  token,
  request,
) => {
  const imgLocation = await uploadPhoto(fileForUpload, token );
  await request(
    `${URLS.SERVER_URL}${path}`,
    'POST',
    { photo: imgLocation, ...obj },
    token
  )
};
