import { uploadPhoto } from './upload-photo';

import { URLS } from '../constants';

export const updatePhoto = async (
  fileForUpload,
  obj,
  path,
  token,
  request,
  message,
  teacherIndex
) => {
  const imgLocation = await uploadPhoto(fileForUpload, token);
  await request(
    `${URLS.SERVER_URL}${path}/${teacherIndex}`,
    'PUT',
    { photo: imgLocation, ...obj, _id: teacherIndex },
    { Authorization: `Bearer ${token}` }
  ).then((res) => message(res.message, true)).catch(e => message(e.message));
};
