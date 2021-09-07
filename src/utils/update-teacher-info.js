import { URLS } from '../../constants';

export const updateTeacherInfo = async (
  newObj,
  currentObject,
  token,
  request,
  path,
  teacherIndex,
  fileForUpload,
  formatTeachersInfoForServer,
  updatePhoto,
  deletePhoto,
  closeModal
) => {
  closeModal();
  const formattedObj = formatTeachersInfoForServer(newObj);

  if (fileForUpload) {
    await deletePhoto(currentObject, token, request);
    await updatePhoto(
      fileForUpload,
      formattedObj,
      path,
      token,
      request,
      teacherIndex
    );
  } else {
    await request(
      `${URLS.SERVER_URL}${path}/${teacherIndex}`,
      'PUT',
      { ...formattedObj, _id: teacherIndex },
      token
    );
  }
};
