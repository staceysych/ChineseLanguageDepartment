export const addNewTeacher = (
  newObj,
  closeModal,
  addNewPhoto,
  filesForUpload,
  formatTeachersInfoForServer,
  path,
  token,
  request
) => {
  closeModal();
  const formattedObj = formatTeachersInfoForServer(newObj);
  addNewPhoto(filesForUpload, formattedObj, path, token, request);
};
