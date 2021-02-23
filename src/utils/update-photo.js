import { uploadPhoto } from './upload-photo';

import { URLS } from '../constants';

export const updatePhoto = async (
  fileForUpload,
  obj,
  path,
  token,
  request,
  teacherIndex
) => {
  const imgLocation = await uploadPhoto(fileForUpload, token);
  await request(
    `${URLS.SERVER_URL}${path}/${teacherIndex}`,
    'PUT',
    { photo: imgLocation, ...obj, _id: teacherIndex },
    token
  )
};
