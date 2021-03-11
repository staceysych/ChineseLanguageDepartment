import { uploadPhoto } from './upload-photo';
import { notification } from 'antd';

import { URLS } from '../constants';

export const updatePhoto = async (
  fileForUpload,
  obj,
  path,
  token,
  request,
  teacherIndex
) => {
  await uploadPhoto(fileForUpload, token).then(async (res) => {
    if (res.message) {
      notification.open({
        message: res.message,
        duration: 1,
      });
    } else {
      await request(
        `${URLS.SERVER_URL}${path}/${teacherIndex}`,
        'PUT',
        { photo: res, ...obj, _id: teacherIndex },
        token
      );
    }
  });
};
