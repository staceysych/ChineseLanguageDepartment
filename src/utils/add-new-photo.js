import { uploadPhoto } from './upload-photo';

import { URLS } from '../constants';

export const addNewPhoto = async (
  filesForUpload,
  obj,
  path,
  token,
  request,
) => {
  const imgLocation = await uploadPhoto(filesForUpload[0], token );
  await request(
    `${URLS.SERVER_URL}${path}`,
    'POST',
    { photo: imgLocation, ...obj },
    token
  )
};
