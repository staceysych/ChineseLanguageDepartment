import { uploadFile } from './upload-file';

import { URLS } from '../constants';

export const updateFile = async (
  fileForUpload,
  obj,
  path,
  token,
  request,
  paths,
  formatMaterialsForServer,
  id
) => {
  console.log(obj);
  const fileLocation = await uploadFile(fileForUpload, token);
  const formattedObj = formatMaterialsForServer(obj, path, fileLocation, id);
  console.log(id);
  console.log(fileLocation);
  await request(
    `${URLS.SERVER_URL}${path}/${paths}`,
    'PUT',
    {...formattedObj, path: paths},
    token
  );
};
