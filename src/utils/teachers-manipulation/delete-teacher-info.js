import { URLS } from '../../constants';

export const deleteTeacherInfo = async (
  currentObject,
  path,
  teacherIndex,
  token,
  deletePhoto,
  request
) => {
  await deletePhoto(currentObject, token);

  await request(
    `${URLS.SERVER_URL}${path}/${teacherIndex}`,
    'DELETE',
    {},
    token
  );
};
